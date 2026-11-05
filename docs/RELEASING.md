# Website beta release

Candidate: `v2.1.0-beta.1` — Cave UI Plex documentation beta. This versions the website snapshot; the bundled evaluation packages retain `0.1.0-alpha.1`. npm and pub.dev publication remain paused.

1. Use a clean checkout of the exact tested main commit. Read `docs/VALIDATION.md` and `docs/STATUS.md`.
2. Run `npm ci`, `npm test`, `npm run test:types`, `npm run build`, `npm run test:browser:all`, `npm run test:navigation` and `npm run test:templates`.
3. With Flutter 3.47.6 in PATH, run `flutter pub get`, `flutter analyze` and `flutter test` in `packages/flutter`. Run `npm run build:flutter` and `npm run test:flutter:browser` at the repository root, then `npm run build` to refresh the hosted package archives.
4. Run `node scripts/prepare-release.mjs`. Review the website ZIP and SHA-256 manifest in `.artifacts/releases/v2.1.0-beta.1/`. The website includes the compiled Flutter gallery, bilingual pages, fonts/licences and evaluation downloads. Source is separately captured by the eventual GitHub tag.
5. Record the exact main SHA and artifact hashes and inform the owner before any deployment or public release. A saved GitHub draft is preparation, not publication; verify its target commit before publishing. Do not create or move a public tag while the hold is in effect.
6. Once advance notice is confirmed, deploy only Hosting to the existing `cave-design-system` project/site using the reviewed `dist/`. Verify both languages, fonts, menu, downloads, canonical routes and the real Flutter preview on the live custom domain. Record the returned Hosting version. Do not change IAM, billing, security settings or ownership and do not enable CI.
7. Publish the GitHub prerelease against the exact tested commit with the reviewed ZIP and checksum file. Never move an existing release tag. Re-read the release assets and remote main SHA after publication.

Human screen-reader and physical-device sessions remain outstanding. Automated axe and browser-engine checks do not certify accessibility or every Safari/device version. The declared minimum Flutter SDK has not received a separate compatibility run.
