# GitHub Browser Deployment — Step by Step

Repository:
`orbiwest/orbiwest.github.io`

## Replace the current site
1. Download and extract the website ZIP.
2. Open:
   `https://github.dev/orbiwest/orbiwest.github.io`
3. Confirm the branch shown at the bottom-left is `main`.
4. In the Explorer, select all current repository files and folders.
5. Press Delete and confirm.
6. Do NOT commit yet.
7. In Windows File Explorer, open the extracted website package.
8. Open it until `index.html`, `assets`, `CNAME`, `services`, `industries`, etc. are directly visible.
9. Select EVERYTHING inside this folder.
10. Drag those items into the empty GitHub Explorer.
11. Open Source Control.
12. Commit message:
   `Deploy natural professional Orbiwest website`
13. Click **Commit & Push**.
14. Open the repository on GitHub.com.
15. Open **Actions**.
16. Wait for the Pages deployment to finish successfully.
17. Visit:
   `https://orbiwest.com/?v=20261105`
18. Then visit:
   `https://orbiwest.com/`
19. Press `Ctrl + Shift + R`.

## Important
Do not upload the outer package folder.

Correct repository root:
- index.html
- CNAME
- assets/
- services/
- industries/
- resources/
- about/
- contact/
- ...

Incorrect:
- Orbiwest_Technologies_NATURAL_Professional_Website_2026/
  - index.html
  - assets/

The second layout will break the site because index.html would not be at repository root.
