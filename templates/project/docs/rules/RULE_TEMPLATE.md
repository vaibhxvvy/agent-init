# Rule: <name> — contributors & agents

> Applies to every human + AI agent. Enforced at PR review; violation blocks merge.

## 1. When it applies

- Trigger: {{TRIGGER}} (e.g. route imports >50kb client code; personas must not cross-ship).

## 2. How to comply

1. {{STEP}} (e.g. `lazy(() => import(...))` + `<Suspense fallback>`; `// ── Section: ──` headers; no cross-persona imports).

## 3. Contract (already enforced — do not remove)

```text
{{CONTRACT_SNIPPET}}
```

## 4. Verification (before PR)

```bash
{{VERIFY_COMMANDS}}
```
