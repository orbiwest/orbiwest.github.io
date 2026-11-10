# Orbiwest website security hardening

## Important hosting note
The `_headers` file in this package is useful on platforms that support that convention (for example Cloudflare Pages), but **GitHub Pages does not apply arbitrary custom response headers from `_headers`**.

This build therefore also carries a per-page Content Security Policy meta fallback. The meta policy restricts scripts, styles and assets to the Orbiwest origin and removes inline executable JavaScript. `frame-ancestors` and HSTS still need HTTP response headers.

## If orbiwest.com is proxied through Cloudflare
Create Response Header Transform Rules for HTML responses with:

- `Strict-Transport-Security: max-age=31536000`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=(), usb=(), browsing-topics=()`
- `X-Frame-Options: DENY`
- `Content-Security-Policy: frame-ancestors 'none'`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`

Do not enable HSTS `includeSubDomains` or preload until every subdomain is confirmed HTTPS-only and you intentionally want that commitment.

## Attack-surface notes
- Static site; no login, database or server-side application code.
- No public form endpoint in this build.
- No third-party JavaScript, ad trackers or analytics by default.
- No secrets/API keys detected in source during static audit.
- Support/contact use mailto links only.
- `/.well-known/security.txt` provides responsible-disclosure contact and expiry.

## Operational security
The biggest practical risks are therefore outside the HTML itself: GitHub account takeover, DNS/registrar compromise, Cloudflare compromise, email-account compromise, and unsafe future third-party scripts. Protect those administrative accounts with phishing-resistant MFA/passkeys where available and least privilege.
