# Cloudflare Pages Deployment Guide

## 1. Connect Repository

Cloudflare Dashboard:
- Workers & Pages
- Create application
- Pages
- Connect to Git
- Select `orbiwest.github.io`

## 2. Build Settings

Use:

```text
Framework preset: None
Build command: exit 0
Build output directory: .
Root directory: /
```

## 3. Deploy

Click **Save and Deploy**.

## 4. Test

Open:

```text
https://orbiwest.pages.dev
```

Check:
- Home page
- Navigation
- Service pages
- Mobile menu
- Contact email link
- Cybersecurity dashboard
- Cloud architecture image
- World map animation

## 5. Custom Domain Later

For `www.orbiwest.com`, add the custom domain in Cloudflare Pages and create the required CNAME at your DNS provider.

For apex/root `orbiwest.com`, Cloudflare normally requires the domain to be in Cloudflare DNS.

## 6. Rollback

Cloudflare Dashboard:
- Workers & Pages
- orbiwest project
- Deployments
- Select a previous successful deployment
- Rollback
