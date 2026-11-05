# Website beta candidate

The current authorized work prepares the documentation website beta `v2.1.0-beta.1`, commits tested source to main and prepares a GitHub release. Deployment and public beta publication are held until the exact candidate has been reported to the owner in advance. See [release procedure](RELEASING.md).

The earlier no-push/no-release instruction recorded in this file applied to the October local evaluation work. The current request supersedes it for source improvements and release preparation. No registry publication is authorized: npm packages retain `private: true`, Flutter retains `publish_to: none`, and package versions stay `0.1.0-alpha.1`.

Only the design site and its repository are in scope. The approved brand checkout is a read-only reference. Other products and existing local checkouts remain untouched. CI stays disabled. Hosting configuration, IAM, security settings, billing and ownership are unchanged.

The verified Firebase project and site are `cave-design-system`; custom domain `design.cave.technology`. Before this work the live version was `63bc6098fb26b0cb`, released 2026-10-30 at 05:05:22.593 UTC. Live HTML uses the existing English/Arabic canonical routes. It has not been replaced by this candidate.

The Flutter gallery loads on demand. A normal site build copies `.artifacts/flutter-preview` if present, so build Flutter before packaging the final website. Templates contain sample records and local interactions; no service or authentication is connected.
