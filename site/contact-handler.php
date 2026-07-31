<?php
header('Content-Type: application/json; charset=utf-8');

$recipient = 'info@hbotchambertech.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'method_not_allowed']);
    exit;
}

function clean_header_field($value) {
    $value = trim((string) $value);
    return preg_replace('/[\r\n]+/', ' ', $value);
}

// Honeypot: real visitors never fill this hidden field, bots often do.
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

$name = clean_header_field($_POST['name'] ?? '');
$email = clean_header_field($_POST['email'] ?? '');
$phone = clean_header_field($_POST['phone'] ?? '');
$company = clean_header_field($_POST['company'] ?? '');
$configSummary = trim((string) ($_POST['config_summary'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'invalid_input']);
    exit;
}

$isQuote = $configSummary !== '';
$subject = $isQuote
    ? 'HBOT Chamber Tech - Yeni Konfigurator Teklif Talebi'
    : 'HBOT Chamber Tech - Yeni Iletisim Formu Mesaji';

$body = $isQuote ? "Yeni bir konfigurator teklif talebi alindi:\n\n" : "Yeni bir iletisim formu mesaji alindi:\n\n";
$body .= "Ad Soyad: {$name}\n";
$body .= "E-posta: {$email}\n";
if ($phone !== '') $body .= "Telefon: {$phone}\n";
if ($company !== '') $body .= "Kurum / Klinik: {$company}\n";
if ($isQuote) {
    $body .= "\nYapilandirma:\n{$configSummary}\n";
}
if ($message !== '') {
    $body .= "\nMesaj:\n{$message}\n";
}

$headers = "From: HBOT Chamber Tech Web Sitesi <no-reply@hbotchambertech.com>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($recipient, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'mail_failed']);
}
