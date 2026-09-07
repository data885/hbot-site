"""Python port of the HTML-generating render functions in
site/assets/js/main.js. Mirrors each renderXxx(dict) function's markup
1:1 so the language subfolder pages ship with real, crawlable HTML instead
of the empty containers main.js normally fills in client-side.

Kept in sync manually with main.js — if a render function's markup changes
there, update the matching function here.
"""
import re


def format_price_eur(amount):
    return "€" + f"{round(amount):,}"


def esc_attr(s):
    return str(s).replace('"', "&quot;")


class Renderers:
    def __init__(self, consts):
        self.icons = consts["ICONS"]
        self.model_icon = consts["MODEL_ICON"]
        self.pillar_icon = consts["PILLAR_ICON"]
        self.model_order = consts["MODEL_ORDER"]
        self.model_key_map = consts["MODEL_KEY_MAP"]
        self.model_pages = consts["MODEL_PAGES"]
        self.model_pricing = consts["MODEL_PRICING"]
        self.pressure_range = consts["PRESSURE_RANGE"]
        self.seat_tiers = consts["SEAT_TIERS"]
        self.model_card_img = consts["MODEL_CARD_IMG"]

    def icon(self, key):
        return self.icons.get(key, "")

    # ---------------- nav dropdown + footer models menu ----------------
    def models_menu(self, dict_, is_nav_panel):
        menu = dict_["common"]["models_menu"]
        parts = []
        for key in self.model_order:
            label = menu[self.model_key_map[key]]
            if is_nav_panel:
                img = self.model_card_img.get(key, "real/oslo-real")
                media = f'<img class="nav-model-thumb" src="/assets/img/models/{img}.webp" alt="" loading="lazy">'
            else:
                media = f'<span class="dropdown-link-icon">{self.icon(self.model_icon[key])}</span>'
            parts.append(
                f'<a href="{self.model_pages[key]}" class="dropdown-link" data-model-key="{key}">\n'
                f'          {media}\n'
                f'          <span>{label}</span>\n'
                f'        </a>'
            )
        return "".join(parts)

    # ---------------- home ----------------
    def stats(self, dict_):
        home = dict_.get("home")
        if not home:
            return ""
        return "".join(
            f'<div class="hero-stat"><strong>{s["value"]}</strong><span>{s["label"]}</span></div>'
            for s in home["stats"]
        )

    def models_grid(self, dict_):
        short = dict_["modelShort"]
        parts = []
        for key in self.model_order:
            m_key = self.model_key_map[key]
            s = short[m_key]
            img = self.model_card_img.get(key, "real/oslo-real")
            parts.append(f'''
        <article class="sector-card">
          <img class="sector-card-img" src="/assets/img/models/{img}.webp" alt="{esc_attr(s["title"])}" loading="lazy">
          <h3>{s["title"]}</h3>
          <span class="sector-tagline">{s["tagline"]}</span>
          <p>{s["desc"]}</p>
          <a href="{self.model_pages[key]}" class="sector-link">
            <span>{dict_["common"]["learn_more"]}</span>
            {self.icon("arrow")}
          </a>
        </article>
      ''')
        return "".join(parts)

    def why_grid(self, dict_):
        home = dict_.get("home")
        if not home:
            return ""
        icon_keys = ["connect", "ai", "sync", "guard"]
        parts = []
        for i, item in enumerate(home["why"]["items"]):
            parts.append(f'''
      <div class="value-card">
        <div class="value-icon">{self.icon(icon_keys[i % len(icon_keys)])}</div>
        <h3>{item["title"]}</h3>
        <p>{item["desc"]}</p>
      </div>
    ''')
        return "".join(parts)

    def celebs_grid(self, dict_):
        home = dict_.get("home")
        if not home or "celebs" not in home:
            return ""
        celebs = home["celebs"]
        parts = []
        for item in celebs["items"]:
            source_link = ""
            if item.get("source"):
                source_link = f'<a class="celeb-source" href="{item["source"]}" target="_blank" rel="noopener">{celebs["source_label"]} →</a>'
            parts.append(f'''
      <article class="sector-card">
        <h3>{item["name"]}</h3>
        <span class="sector-tagline">{item["role"]}</span>
        <p>{item["text"]}</p>
        {source_link}
      </article>
    ''')
        return "".join(parts)

    def target_markets(self, dict_):
        home = dict_.get("home")
        if not home or "targetMarkets" not in home:
            return ""
        tm = home["targetMarkets"]
        parts = []
        for item in tm["items"]:
            parts.append(f'''
      <div class="market-card">
        <span class="market-flag">{item["flag"]}</span>
        <span class="market-name">{item["name"]}</span>
        <span class="market-badge">{tm["badge"]}</span>
      </div>
    ''')
        return "".join(parts)

    def styles_teaser(self, dict_):
        home = dict_.get("home")
        if not home or "styles_teaser" not in home:
            return ""
        parts = []
        for item in home["styles_teaser"]["items"]:
            badge = f'<span class="style-banner-badge">{item["badge"]}</span>' if item.get("badge") else ""
            parts.append(f'''
      <a href="konfigurator.html" class="style-banner style-banner--{item["icon"]}">
        {badge}
        <div class="style-banner-icon">{self.icon(item["icon"])}</div>
        <h3>{item["title"]}</h3>
        <p>{item["desc"]}</p>
      </a>
    ''')
        return "".join(parts)

    def series_grid(self, dict_):
        home = dict_.get("home") or {}
        series = home.get("series")
        if not series:
            return ""
        parts = []
        for item in series["items"]:
            parts.append(f'''
      <div class="indication-card">
        <div class="indication-icon">{self.icon(item["icon"])}</div>
        <span>{item["label"]}</span>
      </div>
    ''')
        return "".join(parts)

    def indications_grid(self, dict_, limit=None):
        hbot_info = dict_.get("hbotInfo")
        if not hbot_info:
            return ""
        items = hbot_info["indications"]["items"]
        if limit:
            items = items[:limit]
        parts = []
        for item in items:
            parts.append(f'''
      <div class="indication-card">
        <div class="indication-icon">{self.icon(item["icon"])}</div>
        <span>{item["label"]}</span>
      </div>
    ''')
        return "".join(parts)

    # ---------------- technology ----------------
    def pillars(self, dict_):
        tech = dict_.get("technology")
        if not tech:
            return ""
        order = ["connect", "os", "ai", "sync", "guard"]
        parts = []
        for key in order:
            p = tech["pillars"][key]
            features = "".join(
                f'<div class="pillar-feature"><span class="check-icon">{self.icon("check")}</span><span>{f}</span></div>'
                for f in p["features"]
            )
            parts.append(f'''
        <div class="pillar-block">
          <div>
            <div class="pillar-icon-lg">{self.icon(self.pillar_icon[key])}</div>
            <h3>{p["title"]}</h3>
            <div class="pillar-subtitle">{p["subtitle"]}</div>
            <p class="pillar-desc">{p["desc"]}</p>
          </div>
          <div class="pillar-features">
            {features}
          </div>
        </div>
      ''')
        return "".join(parts)

    def extra_badges(self, dict_):
        tech = dict_.get("technology")
        if not tech:
            return ""
        extra = tech["extra"]
        parts = []
        for key in ["silent", "care"]:
            e = extra[key]
            parts.append(f'''
      <div class="extra-badge">
        <div class="extra-badge-icon">{self.icon(key)}</div>
        <div><h4>{e["title"]}</h4><p>{e["desc"]}</p></div>
      </div>
    ''')
        return "".join(parts)

    def comparison_table(self, dict_):
        tech = dict_.get("technology")
        if not tech:
            return "", ""
        cmp_ = tech["comparison"]
        head = f'<tr><th>{cmp_["col_feature"]}</th><th>{cmp_["col_competitor"]}</th><th>{cmp_["col_city"]}</th></tr>'
        body_parts = []
        for row in cmp_["rows"]:
            body_parts.append(f'''
      <tr>
        <td>{row["feature"]}</td>
        <td><span class="compare-cell-no">{row["competitor"]}</span></td>
        <td><span class="compare-cell-yes">{row["city"]}</span></td>
      </tr>
    ''')
        return head, "".join(body_parts)

    def roadmap(self, dict_):
        tech = dict_.get("technology")
        if not tech or "roadmap" not in tech:
            return ""
        roadmap = tech["roadmap"]
        parts = []
        for item in roadmap["items"]:
            parts.append(f'''
      <div class="roadmap-card">
        <span class="roadmap-badge">{roadmap["badge"]}</span>
        <div class="roadmap-icon">{self.icon(item.get("icon", ""))}</div>
        <h4>{item["title"]}</h4>
        <p>{item["desc"]}</p>
      </div>
    ''')
        return "".join(parts)

    def certifications(self, dict_):
        tech = dict_.get("technology")
        if not tech or "certifications" not in tech:
            return ""
        parts = []
        for item in tech["certifications"]["items"]:
            parts.append(f'''
      <div class="cert-card">
        <div class="cert-code">{item["code"]}</div>
        <p>{item["name"]}</p>
      </div>
    ''')
        return "".join(parts)

    # ---------------- models overview ----------------
    def model_compare_table(self, dict_):
        mo = dict_.get("modelsOverview")
        if not mo or "compareTable" not in mo:
            return ""
        t = mo["compareTable"]
        cfg_models = {m["id"]: m for m in dict_["configurator"]["models"]}
        parts = []
        for key in self.model_order:
            m = cfg_models.get(key)
            tagline = m["tagline"] if m else ""
            bits = tagline.split(" · ")
            capacity = bits[0] if len(bits) > 0 else ""
            position = bits[1] if len(bits) > 1 else ""
            base = self.model_pricing[key]["base"]
            price_label = format_price_eur(base) + ("+" if key in self.seat_tiers else "")
            parts.append(f'''
        <div class="compare-card">
          <div class="compare-card-icon">{self.icon(self.model_icon[key])}</div>
          <h3>{m["name"] if m else ""}</h3>
          <div class="compare-row"><span>{t["col_capacity"]}</span><strong>{capacity}</strong></div>
          <div class="compare-row"><span>{t["col_position"]}</span><strong>{position}</strong></div>
          <div class="compare-row"><span>{t["col_pressure"]}</span><strong>{self.pressure_range[key]}</strong></div>
          <div class="compare-row"><span>{t["col_noise"]}</span><strong>&lt;60 dB</strong></div>
          <div class="compare-row compare-row-price"><span>{t["col_price"]}</span><strong>{price_label}</strong></div>
          <a href="konfigurator.html?model={key}" class="btn btn-primary btn-block">{t["action_label"]}</a>
        </div>
      ''')
        return "".join(parts)

    # ---------------- model detail pages ----------------
    def included_grid(self, dict_):
        items = dict_.get("includedItems")
        if not items:
            return ""
        parts = []
        for item in items:
            parts.append(f'''
      <div class="included-card">
        <div class="value-icon">{self.icon(self.pillar_icon[item["icon"]])}</div>
        <h4>{item["title"]}</h4>
        <p>{item["desc"]}</p>
      </div>
    ''')
        return "".join(parts)

    def specs(self, dict_, model_key):
        ns_key = "model" + "".join(p.capitalize() for p in model_key.split("-"))
        ns = dict_.get(ns_key)
        if not ns:
            return ""
        return "".join(
            f'<div class="spec-row"><span class="spec-label">{s["label"]}</span><span class="spec-value">{s["value"]}</span></div>'
            for s in ns["specs"]
        )

    def model_crosslinks(self, dict_, current_key):
        short = dict_["modelShort"]
        others = [k for k in self.model_order if k != current_key]
        parts = []
        for key in others:
            parts.append(f'''
      <a href="{self.model_pages[key]}" class="crosslink-card">
        <span class="crosslink-icon">{self.icon(self.model_icon[key])}</span>
        <span>{short[self.model_key_map[key]]["title"]}</span>
        {self.icon("arrow")}
      </a>
    ''')
        return "".join(parts)

    # ---------------- blog ----------------
    def blog_posts(self, dict_):
        blog = dict_.get("blog")
        if not blog:
            return ""
        parts = []
        for post in blog["posts"]:
            words = len(" ".join(post.get("paragraphs", [])).split())
            mins = max(1, -(-words // 200))
            readtime = f'<span class="blog-post-readtime">~{mins} {blog["min_read"]}</span>' if blog.get("min_read") else ""
            author = f'<p class="blog-post-author">{post["author"]}</p>' if post.get("author") else ""
            paragraphs = "".join(f'<p>{p}</p>' for p in post["paragraphs"])
            parts.append(f'''
      <article class="blog-post-card">
        <div class="blog-post-icon">{self.icon(post.get("icon", ""))}</div>
        <div class="blog-post-body">
          <div class="blog-post-meta">
            <span class="blog-post-tag">{post["tag"]}</span>
            <span class="blog-post-date">{post["date"]}</span>
            {readtime}
          </div>
          <h2>{post["title"]}</h2>
          {author}
          {paragraphs}
          <div class="blog-post-source">
            <span>{blog["source_label"]}</span>
            <a href="{post["source_url"]}" target="_blank" rel="noopener noreferrer">{post["source_name"]}</a>
          </div>
        </div>
      </article>
    ''')
        return "".join(parts)

    # ---------------- FAQ ----------------
    def _faq_answer_html(self, item):
        paras = "".join(
            f'<p>{p.replace(chr(10), "<br>")}</p>' for p in item["a"].split("\n\n")
        )
        list_html = ""
        if item.get("list"):
            list_html = "<ul>" + "".join(f"<li>{li}</li>" for li in item["list"]) + "</ul>"
        after = f'<p>{item["aAfter"]}</p>' if item.get("aAfter") else ""
        return paras + list_html + after

    def _faq_item_html(self, item, key):
        return f'''
      <div class="faq-item">
        <button type="button" class="faq-question" data-faq-index="{key}">
          <span>{item["q"]}</span>
          {self.icon("chevronDown")}
        </button>
        <div class="faq-answer">{self._faq_answer_html(item)}</div>
      </div>
    '''

    def faq(self, dict_):
        contact = dict_.get("contact")
        if not contact or "faq" not in contact:
            return ""
        faq = contact["faq"]
        if faq.get("sections"):
            parts = []
            for si, section in enumerate(faq["sections"]):
                items_html = "".join(
                    self._faq_item_html(item, f"{si}-{ii}") for ii, item in enumerate(section["items"])
                )
                parts.append(f'''
      <div class="faq-section">
        <h3 class="faq-section-title">{section["title"]}</h3>
        {items_html}
      </div>
    ''')
            return "".join(parts)
        return "".join(self._faq_item_html(item, i) for i, item in enumerate(faq["items"]))

    def model_faq(self, dict_, model_key):
        items = (dict_.get("modelsFaq") or {}).get(model_key)
        if not items:
            return ""
        return "".join(self._faq_item_html(item, i) for i, item in enumerate(items))
