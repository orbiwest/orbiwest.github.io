# Browser-only GitHub deployment

Repository:
orbiwest/orbiwest.github.io

1. Download and extract the final ZIP.
2. Open https://github.dev/orbiwest/orbiwest.github.io
3. Verify the bottom-left branch is `main`.
4. Select all old website files/folders and delete them.
5. DO NOT commit the deletion separately.
6. Open the extracted final website folder in Windows.
7. Make sure you directly see:
   - index.html
   - CNAME
   - assets/
   - services/
   - industries/
   - solutions/
   - resources/
8. Select everything INSIDE this folder.
9. Drag all of it into the empty github.dev Explorer.
10. Open Source Control.
11. Commit message:
    `Deploy final rich Orbiwest website`
12. Click Commit & Push.
13. Open GitHub.com > repository > Actions.
14. Wait for Pages deployment to show a green check.
15. Open:
    https://orbiwest.com/?final=20261105
16. Then open:
    https://orbiwest.com/
17. Press Ctrl + Shift + R.

If Cloudflare still shows an older version, purge the Cloudflare cache once after confirming GitHub Pages has the new files.

Do not upload the outer package folder itself.
