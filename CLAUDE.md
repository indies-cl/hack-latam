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

### FONTS

- USE font-serif (ManifontGrotesk) as default with `text-xl`. Both properities inheritet from `text-xl`. body text is lowercase (`lowercase` class) unlike headings.
- USE font-sans (FlorDeRuina) for titles and headings with `text-2xl`
- USE font-mono (Victor Mono) for anything engineering or AI related, snippets and terminals.

CONSIDER: these fonts have no weights other than 400. therefore `font-bold` is usable; differenctiate text via colors.

### COLORS

**Custom tokens** (semantic, prefer these for layout):

- `bg`: main background
- `bg-2`: secondary background
- `ui`: borders
- `ui-2`: hovered borders
- `ui-3`: active borders
- `tx-3`: faint text
- `tx-2`: muted text
- `tx`: primary text

**Radix Colors** (all scales available via `tailwindcss-radix-colors`):

- atomic: `bg-red-9`, `text-slate-12`, `border-blue-7` (scale 1–12)
- alpha: `bg-reda-5`, `text-bluea-11`
- semantic (auto dark mode + hover/active):
  - `bg-{color}-app` (step 1), `bg-{color}-subtle` (step 2)
  - `bg-{color}-ui` (step 3 + hover/active), `bg-{color}-ghost` (transparent + hover/active)
  - `bg-{color}-solid` (step 9 + hover)
  - `border-{color}-dim` (step 6), `border-{color}-normal` (step 7 + hover)
  - `text-{color}-dim` (step 11), `text-{color}-normal` (step 12)

Available colors: gray, mauve, slate, sage, olive, sand, tomato, red, ruby, crimson, pink, plum, purple, violet, iris, indigo, blue, cyan, teal, jade, green, grass, bronze, gold, brown, orange, amber, yellow, lime, mint, sky
