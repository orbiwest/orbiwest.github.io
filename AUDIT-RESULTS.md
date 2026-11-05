# Orbiwest Website — Final Audit Results

Audit date: 2026-11-05

## Live deployment findings
- Public root currently exposes an older homepage build.
- Its navigation still points to legacy `.html` URLs, and multiple legacy destinations return 404 on the public site.
- This indicates a mixed/incomplete deployment or stale edge cache.

## Corrected production package
- New cache-isolated asset namespace: `/assets/orbiwest-audited-20261105/`
- Transparent approved metallic logo lockup; no rectangular logo canvas.
- Corrected hero benefit layout.
- Removed duplicate Physical/Video Security top-bar label.
- Added Experience to the primary navigation.
- Fixed the lower proof/experience strip.
- Fixed Contact mobile grid overflow.
- Corrected tablet hero layout.
- Retains all expanded MSP, Cameras/NVR/VMS, Door Access, Access Control, Intercom and AI integration content.
- Legacy `.html` compatibility files remain in the package.

## Deployment requirement
Deploy this as a complete repository replacement. After GitHub Pages succeeds, purge Cloudflare cache once because the currently served root is stale/mixed.
