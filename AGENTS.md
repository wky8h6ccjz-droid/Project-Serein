# Working on Serein

## Context

Read README.md, docs/product-brief.md, docs/decisions.md, and docs/feasibility.md before proposing architecture or implementation. These files preserve project context across local and cloud sessions.

The human is the project manager and approves major decisions. The assistant acts as the CTO and design/engineering collaborator.

## Working style

- Use plain language and ask one focused question at a time when clarification is needed.
- Continue authorized research, documentation, and reversible preparation independently.
- Make major recommendations concrete and reviewable before seeking a decision.
- Get the project manager's decision on hardware/platform selection, major scope changes, budget, purchases, or commercial commitments.
- Budget is parked. Do not reopen it unless the project manager asks or a concrete decision requires it.
- Start with the physical device. Preserve its distinctive form and premium hand feel.
- Keep confirmed preferences, provisional targets, hypotheses, and tested results distinct.
- Do not claim feasibility, compatibility, or battery performance based on concept renders or manufacturer headline figures.
- Verify changeable technical/product information against current primary sources; record source links and dates.
- Follow the user's current instructions when they change a prior preference.
- Do not launch delegated agents or separate chats unless the user asks.

## Technical boundaries

- Spotify is required in the first working version. The initial UI may be the normal official Android Spotify app.
- Direct CDJ connection in place of a flash drive is a core requirement and a platform-selection gate.
- Do not assume a generic Android device can expose USB mass storage merely because it has USB-C or file transfer.
- Keep Spotify listening separate from the exportable DJ library of owned/local audio files. Do not promise export of Spotify downloads.
- Protect storage ownership: do not let Serein and an attached deck modify the same exported filesystem concurrently.
- Do not select a donor, redesign its battery, or promise the target enclosure dimensions without fit and power evidence.
- Research and code can happen in the cloud. Real battery, connector, audio, and deck tests require local hardware evidence.
- Do not commit credentials, copyrighted music files, or account exports.

## Maintaining context

Record approved changes in docs/decisions.md and material research/test findings in docs/feasibility.md. Keep README.md's stage and immediate priorities current. Preserve the latest approved concept direction without treating it as mechanical CAD.

Run checks appropriate to the change. Documentation-only work does not require a fabricated application, package manifest, or test suite.
