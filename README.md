# Layal Aburadi — Personal Portfolio

A buildless HTML, CSS, and JavaScript portfolio. No framework, package installation, or build step is required.

## Preview

Open `index.html` in Chrome. Refresh with Ctrl+Shift+R after editing to load the latest CSS and JavaScript.

## Publish with GitHub Pages

1. Upload `index.html`, `style.css`, `script.js`, `layal_aburadi_cv.pdf`, and the complete `Images` folder to the root of your GitHub repository. Preserve spelling and letter case.
2. In the repository, open Settings → Pages.
3. Under Build and deployment, choose Deploy from a branch.
4. Select the branch containing the files (usually `main`) and `/(root)`, then Save.
5. Wait for the Pages deployment to finish and use the site URL shown in Settings → Pages.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Content and interactions

- Seven original certificates and all their image/verification paths are preserved.
- The updated CV is served from `layal_aburadi_cv.pdf`.
- Existing LinkedIn and GitHub URLs are retained.
- No project repositories, demos, achievements, or email addresses have been invented. The projects section links to the supplied GitHub profile until individual project details are available.
- The withdrawn competition has been removed.
- Skill filters, theme preference, mobile navigation, typing, active navigation, back-to-top, and native certificate previews use plain JavaScript.
- Reduced motion is supported. Certificate links still open the original images if dialog support is unavailable.

## Verification

JavaScript syntax checked with `node --check script.js`. Local asset paths, anchor targets, unique IDs, and preservation of all seven certificates were checked. Automated visual/interaction QA on desktop and mobile could not be completed because the browser automation connection was unavailable. External destinations were preserved; their availability was not independently verified.
