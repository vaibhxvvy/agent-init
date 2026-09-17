# Rules

Merge-blocking contributor rules live here — one file per rule. Violation blocks merge.

- Each rule: what triggers, how to comply, how reviewer verifies, history (which issue deferred/decided it).
- Example pattern: `docs/rules/code-splitting.md` (lazy-load contract) — keep single-file until split explicitly kicked off, but every heavy route lazily importable.
- Agents: check this folder before editing routes/components; humans: reviewer requests changes on violation.
