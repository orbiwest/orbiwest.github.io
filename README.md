# Orbiwest Technologies Production Website

This is a full static, multi-page production website for **Orbiwest Technologies**.

## Included

- 28 HTML pages
- Premium navy/gold enterprise design
- Animated global network hero
- Cybersecurity dashboard graphic
- Cloud architecture graphic
- Interactive service cards and filters
- Responsive mobile navigation
- SEO metadata and social cards
- Cloudflare Pages `_headers` and `_redirects`
- `robots.txt`, `sitemap.xml`, and web manifest
- Email-only contact flow using `orbiwest@gmail.com`

## File Structure

```text
.
├── index.html
├── about.html
├── services.html
├── managed-it-services.html
├── network-engineering.html
├── cybersecurity.html
├── cloud-solutions.html
├── server-administration.html
├── it-consulting.html
├── import-export.html
├── global-sourcing.html
├── industries.html
├── education-it.html
├── healthcare-it.html
├── retail-it.html
├── manufacturing-it.html
├── logistics-it.html
├── finance-it.html
├── small-business-it.html
├── professional-services-it.html
├── case-studies.html
├── secure-school-network.html
├── cloud-readiness-case-study.html
├── trade-operations-case-study.html
├── insights.html
├── cybersecurity-playbook.html
├── cloud-readiness-guide.html
├── network-resilience-guide.html
├── global-sourcing-checklist.html
├── managed-it-maturity.html
├── firewall-policy-hygiene.html
├── contact.html
├── privacy.html
├── terms.html
├── _headers
├── _redirects
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── assets
    ├── css/style.css
    ├── js/main.js
    └── img/
```

## Local Preview

Use a local server. Do not just double-click `index.html`, because root-relative paths begin with `/`.

```bash
python -m http.server 8080
```

Open:

```text
http://localhost:8080
```

## GitHub Upload

1. Unzip this package.
2. Open your GitHub repository: `orbiwest/orbiwest.github.io`.
3. Upload all files and folders to the repository root.
4. Commit to the `main` branch.

## Cloudflare Pages Settings

Use these settings:

```text
Framework preset: None
Build command: exit 0
Build output directory: .
Production branch: main
```

## Domain Notes

- This package is ready for `https://orbiwest.com/`.
- It also works on `https://orbiwest.pages.dev/`.
- The `_headers` file marks the pages.dev preview as `noindex` to avoid SEO duplication.

## Editing Contact Email

Search for:

```text
orbiwest@gmail.com
```

Replace it with your preferred business email later.

## No Phone Number

The website intentionally has no phone number.
