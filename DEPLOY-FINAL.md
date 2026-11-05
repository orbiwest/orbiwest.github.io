# Deploy the final Orbiwest website

Repository: `orbiwest/orbiwest.github.io`

1. Extract `Orbiwest_Technologies_FINAL_Production_2026.zip`.
2. Open `https://github.dev/orbiwest/orbiwest.github.io`.
3. Confirm branch `main`.
4. Delete the old website files/folders.
5. Do NOT commit the deletion separately.
6. In Windows File Explorer, open the extracted package until `index.html`, `assets`, `CNAME`, `services`, `industries`, etc. are directly visible.
7. Select EVERYTHING INSIDE the package and drag it into the empty repository root.
8. Source Control → commit message:
   `Deploy final Orbiwest production website`
9. Commit & Push.
10. On GitHub.com → Actions, confirm the Pages deployment succeeds.
11. If Cloudflare proxies `orbiwest.com`, purge its cache once.
12. Open `https://orbiwest.com/?final=20261105-production`.
13. Then open `https://orbiwest.com/` and press `Ctrl + Shift + R`.

Do not mix files from older Orbiwest packages.
Do not upload the outer package folder itself.
