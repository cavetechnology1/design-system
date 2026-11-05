# Migration notes — unreleased

Existing createCave / CaveController locale, theme and direction methods remain.

- Add `numberingSystem: 'latn' | 'arab' | 'auto'` (Web) or CaveNumberingSystem
  (Flutter) when your product needs an explicit digit preference. The default auto
  policy is now consistent between platforms: Arabic-Indic for ar, Latin for en.
  Web callers needing another locale convention can override Intl formatter options.
- `setNumberingSystem` is independent of `setLocale`; Web persists the preference
  only when an application supplies a storageKey. Existing saved settings without
  it use auto. Flutter persistence remains application-owned.
- Flutter adds `number`, `digits` and SDK-backed `date(context, value)`. See the
  compatibility limits before using them in financial/reporting applications.
- CaveButton adds size. Existing calls use medium. Native touch target padding is
  preserved for small buttons. Text fields allow multi-line helper/error text.
- CaveTheme.fromColors accepts controlRadius and spacingScale. No application
  layout is silently rewritten. Custom palettes need their own contrast checks.
- The settings, dashboard and sign-in templates have no backend. Adapt their
  application translations and service integration explicitly.
- Shared preview URLs encode locale/theme/direction/numerals and applicable
  component props. Documentation language stays independent of preview language.

The version remains 0.1.0-alpha.1 for local evaluation. The website beta snapshots these evaluation packages; registry publication remains paused.

- `openDialog(dialog, trigger)` accepts an explicit return-focus element so pointer
  activation restores focus consistently in WebKit. Keyboard callers may omit it
  when the trigger is already focused.

## Plex website beta

The default family tokens now use `Cave UI Latin` (IBM Plex Sans) and `Cave UI Arabic` (IBM Plex Sans Arabic), with system fallbacks. Bundle the local WOFF2 files and OFL notices to match the documentation; Flutter examples bundle the original IBM TTFs under the same family aliases. Existing font overrides remain supported. Text metrics change: review wrapping and fixed-height controls in consuming applications. Regular is 400; Medium, SemiBold and Bold are 500/600/700. Legacy source fonts are retained for history and are no longer served.
