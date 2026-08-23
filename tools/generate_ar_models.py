#!/usr/bin/env python3
"""Generates to-scale capsule-shaped placeholder 3D models (GLB for
Android Scene Viewer / inline 3D view, USDZ for iOS AR Quick Look) for
each HBOT City Tech model, used by the configurator's "View in Your Space (AR)"
button.

IMPORTANT — what this is and isn't:
This is NOT a photorealistic scan/render of the real product. We do not
have a real 3D mesh (no .glb/.usdz/.blend/.fbx source exists anywhere in
the repo — only flat photos and a 24-frame turntable image sequence,
neither of which can be turned into a true 3D model). This script builds
a simple, correctly real-world-scaled capsule (cylinder + two
hemispherical caps) per model, tinted in the site's material colors, so
customers can at least answer "does it fit / how big does it feel in my
room" via AR — the geometric footprint is accurate (where we have real
spec dimensions) or a reasoned estimate from the real photos (where we
don't), but the surface detail (windows, doors, seats, panel controls) is
NOT modeled. Swap in a real photorealistic GLB/USDZ (exported from
whoever holds the CAD source of the physical product) by dropping
replacement files at the same paths — everything downstream (the AR
button, the viewer page, the QR flow) is asset-agnostic.

Dimensions:
  solo-lounge and solo use the REAL exterior dimensions from the site's
  own spec sheet (assets/js/translations.js -> modelSoloLounge / modelSolo
  "Dış Ölçüler"). duo / quad-cube / nexus have no exterior-dimension entry
  in the spec data at all (a pre-existing content gap, worth filling in
  separately) — their sizes below are reasoned estimates from the real
  product photos (assets/img/models/real/*.webp) and relative seat count,
  clearly flagged as such in AR_MODELS below and in the on-page copy.
"""
import json
import math
import os
import struct

import numpy as np
from pygltflib import (
    GLTF2, Asset, Scene, Node, Mesh, Primitive, Attributes, Buffer,
    BufferView, Accessor, Material, PbrMetallicRoughness,
    ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER, FLOAT, UNSIGNED_INT,
    SCALAR, VEC3,
)
from pxr import Usd, UsdGeom, UsdShade, Sdf, Gf

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(REPO_ROOT, "site", "assets", "ar")

# id -> (length_m, diameter_m, orientation, color_hex, dimension_source)
# orientation: "horizontal" (long axis = X, lying down) or "vertical" (long axis = Y, standing)
AR_MODELS = {
    "solo-lounge": {"length": 2.40, "diameter": 1.15, "orientation": "horizontal",
                     "color": (0.55, 0.52, 0.48), "source": "real"},   # 240x110x120 cm spec
    "solo":        {"length": 1.80, "diameter": 1.15, "orientation": "vertical",
                     "color": (0.55, 0.52, 0.48), "source": "real"},   # 120x110x180 cm spec
    "duo":         {"length": 3.00, "diameter": 1.30, "orientation": "horizontal",
                     "color": (0.55, 0.52, 0.48), "source": "estimate"},
    "quad-cube":   {"length": 2.60, "diameter": 1.80, "orientation": "horizontal",
                     "color": (0.60, 0.55, 0.42), "source": "estimate"},
    "nexus":       {"length": 4.60, "diameter": 2.00, "orientation": "horizontal",
                     "color": (0.85, 0.85, 0.88), "source": "estimate"},
}


def capsule_mesh(length, diameter, segments=28, rings=10):
    """Builds a capsule (cylinder + two hemispherical caps) centered at
    the origin, long axis along +X, resting on the ground (min Z = 0 is
    NOT enforced here — callers position it). Returns (vertices Nx3
    float32, normals Nx3 float32, indices Mx3 uint32)."""
    r = diameter / 2.0
    cyl_len = max(length - diameter, 0.05)  # straight section between the two dome caps
    verts = []
    norms = []

    def add_ring(x, ring_r, ring_dir_x):
        idx0 = len(verts)
        for j in range(segments):
            theta = 2 * math.pi * j / segments
            y = ring_r * math.cos(theta)
            z = ring_r * math.sin(theta)
            verts.append((x, y, z))
            n = np.array([ring_dir_x, math.cos(theta), math.sin(theta)])
            n = n / np.linalg.norm(n)
            norms.append(tuple(n))
        return idx0

    # dome cap rings (rings from pole inward), then the cylinder's two edge rings, then the other dome
    ring_indices = []
    half_cyl = cyl_len / 2.0

    # left pole
    left_pole_idx = len(verts)
    verts.append((-half_cyl - r, 0, 0))
    norms.append((-1, 0, 0))

    for i in range(1, rings + 1):
        phi = (math.pi / 2) * (i / rings)  # 0 (pole) .. pi/2 (equator)
        x = -half_cyl - r * math.cos(phi)
        ring_r = r * math.sin(phi)
        ring_indices.append(("leftdome", i, add_ring(x, ring_r, -math.cos(phi))))

    ring_indices.append(("cyl", 0, add_ring(-half_cyl, r, 0)))
    ring_indices.append(("cyl", 1, add_ring(half_cyl, r, 0)))

    for i in range(rings, 0, -1):
        phi = (math.pi / 2) * (i / rings)
        x = half_cyl + r * math.cos(phi)
        ring_r = r * math.sin(phi)
        ring_indices.append(("rightdome", i, add_ring(x, ring_r, math.cos(phi))))

    right_pole_idx = len(verts)
    verts.append((half_cyl + r, 0, 0))
    norms.append((1, 0, 0))

    faces = []
    # pole -> first ring
    first_ring = ring_indices[0][2]
    for j in range(segments):
        j2 = (j + 1) % segments
        faces.append((left_pole_idx, first_ring + j, first_ring + j2))

    for a, b in zip(ring_indices, ring_indices[1:]):
        r0 = a[2]
        r1 = b[2]
        for j in range(segments):
            j2 = (j + 1) % segments
            faces.append((r0 + j, r1 + j, r1 + j2))
            faces.append((r0 + j, r1 + j2, r0 + j2))

    last_ring = ring_indices[-1][2]
    for j in range(segments):
        j2 = (j + 1) % segments
        faces.append((right_pole_idx, last_ring + j2, last_ring + j))

    return (np.array(verts, dtype=np.float32),
            np.array(norms, dtype=np.float32),
            np.array(faces, dtype=np.uint32))


def orient_and_lift(verts, orientation, diameter, length):
    """Capsule is authored long-axis-on-X, radius in Y/Z. Rotate for
    'vertical' models (long axis -> Y) and lift so the lowest point sits
    on the ground plane (z=0 in glTF's Y-up... we use Y-up per glTF/USDZ
    convention: ground is Y=0, gravity is -Y)."""
    v = verts.copy()
    if orientation == "horizontal":
        # author axis X (length) -> keep as X; author Y/Z (radius) -> glTF Y-up:
        # map internal (x=length, y=radiusA, z=radiusB) to (x=length, y=radiusB(up), z=radiusA)
        v = v[:, [0, 2, 1]]
        lift = diameter / 2.0
    else:  # vertical: internal X (length) becomes the UP axis (Y)
        v = v[:, [1, 0, 2]]
        lift = length / 2.0
    v[:, 1] += lift
    # small clearance off the floor so it doesn't z-fight with real-world floor plane
    v[:, 1] += 0.01
    return v


def write_glb(model_id, verts, faces, color, out_path):
    normals = np.zeros_like(verts)
    for f in faces:
        p0, p1, p2 = verts[f[0]], verts[f[1]], verts[f[2]]
        n = np.cross(p1 - p0, p2 - p0)
        norm = np.linalg.norm(n)
        if norm > 0:
            n = n / norm
        normals[f[0]] += n
        normals[f[1]] += n
        normals[f[2]] += n
    lens = np.linalg.norm(normals, axis=1, keepdims=True)
    lens[lens == 0] = 1
    normals = normals / lens

    verts_f32 = verts.astype(np.float32)
    normals_f32 = normals.astype(np.float32)
    idx_u32 = faces.astype(np.uint32).flatten()

    verts_blob = verts_f32.tobytes()
    normals_blob = normals_f32.tobytes()
    idx_blob = idx_u32.tobytes()
    # pad each section to 4-byte alignment (glTF binary buffer requirement)
    def pad(b):
        rem = len(b) % 4
        return b + b"\x00" * (4 - rem) if rem else b
    verts_blob_p = pad(verts_blob)
    normals_blob_p = pad(normals_blob)
    idx_blob_p = pad(idx_blob)
    full_blob = verts_blob_p + normals_blob_p + idx_blob_p

    gltf = GLTF2(
        asset=Asset(generator="hbotchambertech.com AR placeholder generator"),
        scene=0,
        scenes=[Scene(nodes=[0])],
        nodes=[Node(mesh=0, name=model_id)],
        meshes=[Mesh(primitives=[Primitive(
            attributes=Attributes(POSITION=0, NORMAL=1),
            indices=2, material=0,
        )])],
        materials=[Material(
            name=f"{model_id}-shell",
            pbrMetallicRoughness=PbrMetallicRoughness(
                baseColorFactor=[color[0], color[1], color[2], 1.0],
                metallicFactor=0.75, roughnessFactor=0.35,
            ),
            doubleSided=False,
        )],
        buffers=[Buffer(byteLength=len(full_blob))],
        bufferViews=[
            BufferView(buffer=0, byteOffset=0, byteLength=len(verts_blob), target=ARRAY_BUFFER),
            BufferView(buffer=0, byteOffset=len(verts_blob_p), byteLength=len(normals_blob), target=ARRAY_BUFFER),
            BufferView(buffer=0, byteOffset=len(verts_blob_p) + len(normals_blob_p), byteLength=len(idx_blob), target=ELEMENT_ARRAY_BUFFER),
        ],
        accessors=[
            Accessor(bufferView=0, componentType=FLOAT, count=len(verts_f32), type=VEC3,
                     min=verts_f32.min(axis=0).tolist(), max=verts_f32.max(axis=0).tolist()),
            Accessor(bufferView=1, componentType=FLOAT, count=len(normals_f32), type=VEC3),
            Accessor(bufferView=2, componentType=UNSIGNED_INT, count=len(idx_u32), type=SCALAR),
        ],
    )
    gltf.set_binary_blob(full_blob)
    gltf.save_binary(out_path)


def write_usdz(model_id, verts, faces, color, out_path):
    usda_path = out_path.replace(".usdz", ".usda")
    stage = Usd.Stage.CreateNew(usda_path)
    UsdGeom.SetStageUpAxis(stage, UsdGeom.Tokens.y)
    stage.SetMetadata("metersPerUnit", 1.0)

    root = UsdGeom.Xform.Define(stage, "/Root")
    stage.SetDefaultPrim(root.GetPrim())

    mesh = UsdGeom.Mesh.Define(stage, "/Root/Shell")
    mesh.CreatePointsAttr([Gf.Vec3f(*v) for v in verts.tolist()])
    mesh.CreateFaceVertexCountsAttr([3] * len(faces))
    mesh.CreateFaceVertexIndicesAttr(faces.flatten().tolist())
    mesh.CreateSubdivisionSchemeAttr("none")
    mesh.CreateDoubleSidedAttr(False)

    mat = UsdShade.Material.Define(stage, "/Root/Material")
    pbr = UsdShade.Shader.Define(stage, "/Root/Material/PBRShader")
    pbr.CreateIdAttr("UsdPreviewSurface")
    pbr.CreateInput("diffuseColor", Sdf.ValueTypeNames.Color3f).Set(Gf.Vec3f(*color))
    pbr.CreateInput("metallic", Sdf.ValueTypeNames.Float).Set(0.75)
    pbr.CreateInput("roughness", Sdf.ValueTypeNames.Float).Set(0.35)
    pbr.CreateOutput("surface", Sdf.ValueTypeNames.Token)
    mat.CreateSurfaceOutput().ConnectToSource(pbr.ConnectableAPI(), "surface")
    UsdShade.MaterialBindingAPI(mesh).Bind(mat)

    stage.GetRootLayer().Save()

    # Package the .usda into a valid .usdz (uncompressed zip, per Apple's spec)
    import zipfile
    with zipfile.ZipFile(out_path, "w") as z:
        z.write(usda_path, arcname=os.path.basename(usda_path), compress_type=zipfile.ZIP_STORED)
    os.remove(usda_path)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    manifest = {}
    for model_id, cfg in AR_MODELS.items():
        verts, _norms, faces = capsule_mesh(cfg["length"], cfg["diameter"])
        verts = orient_and_lift(verts, cfg["orientation"], cfg["diameter"], cfg["length"])

        glb_path = os.path.join(OUT_DIR, f"{model_id}.glb")
        write_glb(model_id, verts, faces, cfg["color"], glb_path)

        usdz_path = os.path.join(OUT_DIR, f"{model_id}.usdz")
        write_usdz(model_id, verts, faces, cfg["color"], usdz_path)

        manifest[model_id] = {
            "length_m": cfg["length"], "diameter_m": cfg["diameter"],
            "orientation": cfg["orientation"], "dimension_source": cfg["source"],
        }
        print(f"{model_id}: glb={os.path.getsize(glb_path)}B usdz={os.path.getsize(usdz_path)}B "
              f"({cfg['source']} dimensions, {cfg['length']}m x {cfg['diameter']}m, {cfg['orientation']})")

    with open(os.path.join(OUT_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
