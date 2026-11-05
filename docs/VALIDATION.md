# Website beta validation — 2026-11-05

Released website beta `v2.1.0-beta.1`; UI package versions remain `0.1.0-alpha.1`. The predeployment checks below cover source `0e3b490c71b21c6e08a560aada5dfb6a1cf3e33b`; the postdeployment record follows.

- `npm ci`: locked dependencies installed; audit reported zero vulnerabilities.
- `npm test`: 24 passed, covering source generation, links/assets, semantic colour contrast, packages, locale/theme state, query escaping, templates and Plex font originals/weights/licences.
- `npm run test:types`: passed.
- `npm run build`: 56 indexable bilingual pages, 15 components, three evaluation package archives and six template ZIPs. The final site includes the newly compiled Flutter gallery.
- `npm run test:browser:all`: Chromium, Firefox and WebKit passed. Coverage includes URL/platform/locale/theme state, 320/390/1440px layouts, previews, real native controls, RTL tab keys, modal return focus, templates, reduced motion and 200% CSS zoom. Automated WCAG A/AA axe scans reported no violations on the tested pages; this is not a whole-site certification.
- `npm run test:navigation`: 72 cases across three engines, English/Arabic, 320/390/768/1024/1025/1440px and Light/Dark. Keyboard open/traversal/Escape, outside dismissal, focus leaving the disclosure, page navigation, responsive resize and opaque panel backgrounds passed with zero axe violations in the header/navigation scans. Black menus scroll to the final link at 320 × 320px; both languages navigate without JavaScript in all engines. The closed header is 64px plus its 1px border. Results and visual captures are in `.artifacts/navigation/`.
- `npm run test:templates`: all six extracted template ZIPs run under separate subpaths without external requests or missing assets.
- Flutter 3.47.6 / Dart 3.13.5: `flutter pub get`, `flutter analyze` and `flutter test` passed; 133 tests, no analyzer issues. The default unrelated SDK was older; checks used the existing Homebrew SDK explicitly.
- `npm run build:flutter` and `npm run test:flutter:browser`: compiled the actual gallery and passed on-demand loading, bilingual native actions and local font/rendering-resource checks in all three engines. The SDK emitted a Cupertino icon-family tree-shaking warning; no supported scenario produced a missing resource request. No Cupertino dependency was added.
- Web font subsets match the Brand reference byte-for-byte. All eight native TTF originals match the manifest source SHA-256. README specimens and narrow Black menus received screenshot review. No logo was redrawn or retyped.
- `git diff --check`: passed before commit.

## Brand compatibility

Ran Brand's `scripts/sync-from-design.mjs --check` with `CAVE_DESIGN_DIR` pointing to this checkout. `components.css` matches exactly; `tokens.css` reports drift. A declaration comparison confirms that drift is confined to the four font-family values. The existing Brand stylesheet already overrides those values with the same Plex aliases. No colour, spacing or component value changed.

The original Brand checkout remains untouched. An isolated copy was synchronized; its drift check passes. A Chromium comparison of both copies across English/Arabic, Light/Dark/Black and 320/1440px confirmed identical computed body, heading and brand typography/colours in all 12 states (`.artifacts/brand-compatibility.json`). This does not update or deploy the Brand repository. A future Brand maintenance change can refresh its copied tokens without changing its effective Plex appearance.

## Remaining review and boundaries

Human VoiceOver/NVDA/TalkBack sessions, physical-device checks, broader native Safari coverage and a separate declared-minimum Flutter SDK run remain outstanding. CSS zoom and WebKit automation are distinct from those checks. The standalone template examples have no backend or authentication.

The GitHub workflow remains `disabled_manually`; its file was not modified. No IAM, security setting, billing setting or ownership was changed. No registry publication occurred. Firebase project/site `cave-design-system`, custom domain `design.cave.technology`, now serves the approved beta recorded below.

## Published deployment verification

After advance owner notice, the owner explicitly replied “proceed.” The exact reviewed candidate was deployed with `firebase deploy --only hosting --project cave-design-system`; no source rebuild or Hosting setting change was introduced for rollout.

- Hosting version: `2ba2edcb4f4b4cca`, released **2026-11-05 18:17:53.493 UTC**.
- GitHub prerelease: [v2.1.0-beta.1](https://github.com/Shmaisanymostafa/design-system/releases/tag/v2.1.0-beta.1), published **18:34:16 UTC**; tag and target both resolve to `0e3b490c71b21c6e08a560aada5dfb6a1cf3e33b`.
- Website ZIP SHA-256: `46d82875f1d9689b3d799d95dd2d107dae8e1d00fef324242beea5e5112ace6f`. All three GitHub asset digests match the reviewed local artifacts.
- Fetched and hashed **all 230 served candidate files** at canonical live routes; every decoded response matches the reviewed SHA-256 manifest. The bundle also contains `.last_build_id`, intentionally excluded by the existing `**/.*` Hosting ignore rule. Firebase's version inventory contains the 230 files plus its standard `/__/firebase/init.js` and `/__/firebase/init.json`; no unexpected application file was added. Local evidence: `.artifacts/live-files.json` and `.artifacts/hosting-version-files.json`.
- Live Chromium/Firefox/WebKit: **36** language/viewport/theme combinations passed font loading, reflow and header/navigation axe scans. Keyboard menu opening/Escape, theme persistence, canonical URLs and download links passed. Evidence: `.artifacts/live-navigation/`.
- The actual deployed Flutter gallery completed native Arabic/English button actions and Arabic settings rendering in all three engines. Cold resource transfer was slow during concurrent full-file verification, causing early Firefox timeouts; the traced repeat passed. WebKit completed interactions but logged an access-control-style font-fetch error when an old iframe's pending fallback request was cancelled during a quick language change. A repeat that let each gallery load settle before switching languages passed with no page errors or missing responses. These observations are retained as beta limitations; no security/CORS setting was changed to suppress them.
- Native Safari **26.6.2**: live Arabic menus inspected at 320/390px in Responsive Design Mode; English at 320px. Menu opacity, readable joined text, compact header, Escape focus restoration and language switching were checked. This is emulation and a focused manual spot check, not a physical-device or screen-reader session.

CI remained `disabled_manually`; package publication, IAM, security, billing and ownership were unchanged. Documentation updates after rollout record the result without moving the release tag or replacing its artifacts.
