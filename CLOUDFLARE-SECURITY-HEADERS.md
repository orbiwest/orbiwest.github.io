# Cloudflare response-header hardening

GitHub Pages does not apply the `_headers` file. If `orbiwest.com` is proxied through Cloudflare, configure a Response Header Transform Rule.

Recommended headers:
- `Strict-Transport-Security: max-age=31536000`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=(), usb=(), browsing-topics=()`
- `X-Frame-Options: DENY`
- `Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-qX5U/MX23QrXaYTF6rLPwxAH6Vm3Vc8F7KRm3E5rWNw='; script-src-attr 'none'; style-src 'self'; style-src-attr 'none'; img-src 'self' data:; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; frame-src 'none'; worker-src 'none'; base-uri 'none'; form-action 'self'; manifest-src 'self'; upgrade-insecure-requests; frame-ancestors 'none'`

The HTML meta CSP is a fallback. `frame-ancestors` only works in an HTTP CSP response header, so enforce the response header at Cloudflare when proxied.

Cache guidance:
- HTML: revalidate (`max-age=0, must-revalidate`).
- Versioned `/assets/`: long-lived immutable cache.

Test actual response headers after deployment before assuming the rules are active.
