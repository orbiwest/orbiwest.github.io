# Deploying the audited master build

The live `orbiwest.com` homepage observed on 2026-11-10 contains newer copy than some earlier local ZIP packages. Before replacing the repository wholesale, compare the current GitHub `main` branch with this staging package so newer live content is not lost.

When the exact current repository source is available, merge the security/responsive changes from this build into it, then deploy in one commit.

After deployment:
1. Confirm GitHub Pages/Actions succeeds.
2. Purge Cloudflare cache once if Cloudflare is proxying the domain.
3. Verify homepage, Services, Contact, Support, Security, robots.txt, sitemap.xml and security.txt.
4. Verify response security headers at the CDN/edge.
5. Test desktop, tablet, 390px and 360px phone widths.
