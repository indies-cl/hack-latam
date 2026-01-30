**In all interaction and commit messages, be extremely concise and sacrifice grammar for the sake of concision.**

## CODE STANDARDS

- Make minimal, surgical changes
- **Never compromise type safety**: No `any`, no non-null assertion operator (`!`), no type assertions (`as Type`)
- **Make illegal states unrepresentable**: Model domain with ADTs/discriminated unions; parse inputs at boundaries into typed structures; if state can't exist, code can't mishandle it
- **Abstractions**: Consciously constrained, pragmatically parameterised, doggedly documented

### **ENTROPY REMINDER**

This codebase will outlive you. Every shortcut you take becomes
someone else's burden. Every hack compounds into technical debt
that slows the whole team down.

You are not just writing code. You are shaping the future of this
project. The patterns you establish will be copied. The corners
you cut will be cut again.

**Fight entropy. Leave the codebase better than you found it.**

## DESIGN SYSTEM

indies.la is for people tired of corporate BS. we keep it simple: lowercase everything, casual as hell. for spanish text, avoid inverted punctuation marks (¡ ¿)

### SPACING

- USE `-4` for spacing (p-4, gap-4, etc.).
- USE `text-xl` or `text-2xl` for text sizes, no other values allowed.

### FONTS

- USE font-serif (BIZ UDPMincho) as default with `text-xl`. Both properities inheritet from `text-xl`. body text is lowercase (`lowercase` class) unlike headings.
- USE font-sans (DINdong) for titles and headings with `text-2xl`
- USE font-mono (Victor Mono) for anything engineering or AI related, snippets and terminals.

CONSIDER: these fonts have no weights other than 400. therefore `font-bold` is usable; differenctiate text via colors.

### COLORS

USE ONLY the following colors:

- `bg`: main background
- `bg-2`: secondary background
- `ui`: borders
- `ui-2`: hovered borders
- `ui-3`: active borders
- `tx-2`: faint text
- `tx-2`: muted text
- `tx`: primary text
- `og`: primary color, signals brand, is bright and attention grabbing
