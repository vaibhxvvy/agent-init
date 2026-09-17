# AGENTS.md — Handbook for AI Agents Working on {{PROJECT_NAME}}

> Read this fully before writing any code. Pair it with `AGENTRULES.md` (behavior, commit policy, mandatory session logging). `README.md` is the human deep reference. Lost? Start at `docs/NAVIGATION.md`.
> Source: extracted from incruit AGENTS.md + chopsticks AGENTS.md (single-source-of-truth pattern).

## What This Project Is

{{ONE_PARAGRAPH_OUTCOME}} — filled by `/init` after ideas discussion (see `docs/ideas.md`).
Personas: {{PERSONAS}}. Private/public: {{VISIBILITY}}.

## Tech Stack (fill during /init)

| Layer | Choice |
| ----- | ------ |
| Framework | {{FRAMEWORK}} |
| Language | {{LANGUAGE}} |
| Styling/UI | {{UI}} |
| Data/Auth | {{DATA_AUTH}} |
| Payments/External | {{EXTERNAL}} |

## Commands

```bash
{{DEV}}        # dev server
{{BUILD}}      # build (NEVER bypass — document why each step exists)
{{TEST}}       # tests live next to code: *.test.ts / cargo test
{{LINT}}       # lint (if slow, run at session end only — note it here)
{{TYPECHECK}}  # typecheck
{{FORMAT}}     # formatting
```

Env setup: copy `.env.example` → `.env` (agents: never edit — see AGENTRULES.md).

## Repository Map

```text
{{REPO_TREE}}
# Keep one line per dir: what lives where + which file is the entry point.
# Chopsticks pattern: comment each file's role (atomics/channel/guard/threads).
```

## Conventions You Must Follow

1. **Boundary sacred.** (incruit: `*.server.ts` never imported client-side; chopsticks: no `unsafe` at call sites, Win32 behind safe wrappers). Name YOUR boundary here.
2. **Privileged clients separated.** user-scoped vs service-role/admin — never mix, never leak secrets client-side.
3. **Layering:** `domain` (pure) → `repositories` → `services` → wiring. Respect it.
4. **Money/time/units:** integers + UTC ISO (or your domain invariant). Never float money math.
5. **Async & idempotent:** business flows publish events and return; duplicate ticks/retries safe by design.
6. **Routes/entry:** add file under canonical dir; generated files (`routeTree.gen.ts` etc.) never hand-edited.
7. **Generated/vendor files:** minimal headers by design — don't deepen docs after regen.
8. **Migrations:** append-only timestamped; never edit applied; RLS/policy required for user-readable tables.
9. **Naming:** match neighbors first (PascalCase components, camelCase fns, kebab-case libs).
10. **Comments/JSDoc:** every export documented; WHY + invariants. English, no emojis.
11. **Provider pattern (chopsticks):** new capability = new provider implementing `SearchProvider`-like trait (`id/should_run/search/activate/refresh/revision`), registered in ONE registry, isolated by `catch_unwind`-equivalent. Score bands documented here when you add one.
12. **Future stages gated (chopsticks):** do NOT build plugins/daemon/multi-crate/event-bus until trigger met — record trigger in `future.md`.

## Environment Variables

Full table in `README.md` §Env + `.env.example`. Agent policy: read-only awareness. Secrets stay server-side. Nothing secret in `VITE_*`/logs/commits. Rotation deferred to pre-prod hardening (admin-owned).

## Testing

{{TEST_POLICY}} — colocated tests for pure logic. Run before commits.

## Deployment Notes (why things look weird)

- {{DEPLOY_QUIRK_1}} (e.g. Nitro writes `.vercel/output`, never override to `dist`)
- {{DEPLOY_QUIRK_2}} (e.g. WebSockets can't run on edge → dedicated host, single instance)

## Known Pre-existing Issues (canonical: `docs/agent-logs/KNOWN_ISSUES.md`)

- Check it before debugging red — do not own accepted-broken states.

## Before You Finish Every Session

1. Checks green (AGENTRULES.md §4). 2. Branch pushed + PR opened (only admin merges). 3. Session log created. 4. Follow-ups written.
