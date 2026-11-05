# Plex typography provenance

The reference is the approved Cave Brand Plex R3 website source at brand.cave.technology, beta v0.2.0-beta.1. The original Cave symbol and semantic colours are retained. The design documentation and examples now share the official English IBM Plex Sans and Arabic IBM Plex Sans Arabic families.

`source/fonts/manifest.json` is copied from that brand source. Its eight WOFF2 files are copied byte-for-byte, with retained shaping and 400/500/600/700 weights. The compliant internal family names are `Cave UI Latin` and `Cave UI Arabic`; public typography guidance names the IBM designs. Corresponding OFL licences are included beside them.

`source/fonts/plex-native/` contains the matching original unmodified IBM TTFs, whose source hashes are recorded in that manifest. The gallery generator copies those original TTFs and licences into the Flutter example. Web templates carry the WOFF2s and licences. Font files remain optional for consuming applications; the package controller performs no font-network requests.

Legacy Poppins/Almarai sources remain historical references; active site builds serve Plex only. No proprietary Hero or Blue Ocean font is served or included in a package. Brand marks remain separate from the package MIT licence.
