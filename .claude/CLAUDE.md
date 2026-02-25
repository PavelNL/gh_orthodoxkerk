# Project Guidelines

## Directories/files conventions

- ./html/ - the current project work HTML tree. Unless requested otherwise, only this folder should be modified
- ./_webarc_Jimdo_alike_v1/ - a reference Read-Only location for Jimdo_alike site in WebArchive form. Should be used when requested
- ./_webarc_orig_v0/ - current Production version website https://www.ruskerk.nl in WebArchive form, should be IGNORED for now
- ./_webarc_orig_v1/ - planned CMS Jimdo SPA framework version website https://www.orthodoxkerk.nl in WebArchive form, which could be used as the Read-Only reference when implicitely asked
- ./html.prev/ - previous manual backup, should be IGNORED and never be used for any purpose
- ../ - NO parent folder(s) should be acessed at all, independent of any requests!

## Agent automation and commands

- Any commands could be executed on ./html/ tree without a confirmation
- This project imply acceptEdits mode ACTIVATED to minimise delays due to confirmation

## Code Style

- static Website with exception of "Raspisanije"
- Prefer PicoCSS framework with local storage of all used assets
- When there is an option, a smallest OpenSource resources/assets to be used
- Git commands should NOT be used by the agent, because the programmer reserves these commands for himself

