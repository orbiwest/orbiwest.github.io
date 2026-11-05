# Final deployment — GitHub browser

1. Extract `Orbiwest_Technologies_FINAL_LOCKED_Production_2026.zip`.
2. Open `https://github.dev/orbiwest/orbiwest.github.io`.
3. Confirm branch `main`.
4. Delete the old repository website files/folders.
5. Do NOT commit the deletion separately.
6. Open the extracted final package in Windows File Explorer.
7. Make sure `index.html`, `assets`, `CNAME`, `services`, `industries`, etc. are directly visible.
8. Select EVERYTHING INSIDE the package folder and drag it into the GitHub Explorer.
9. Source Control → commit message:
   `Deploy final locked Orbiwest production website`
10. Commit & Push.
11. On GitHub.com, open Actions and confirm Pages deployment is successful.
12. If Cloudflare proxies the domain, purge its cache once.
13. Open `https://orbiwest.com/?final=20261105-locked`.
14. Then open `https://orbiwest.com/` and press `Ctrl + Shift + R`.

Do not upload the outer folder itself.
Do not mix files from older Orbiwest ZIP packages.
