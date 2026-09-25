# FAILURE-0002 \u2014 High-impact action must not commit without approval

| Field | Value |
|-------|--------|
| **ID** | FAILURE-0002 |
| **Class** | Builder-operated (kernel regression) |
| **Date recorded** | 2026-09-25 |
| **Component** | `src/lib/logon/engine.ts` approval path |
| **Behaviour** | Execution enters `APPROVAL`; no `TOOL_RESULT` evidence until human decision |
| **Tests** | `"high-impact tools propose, then wait for approval before committing"` \u00b7 `"approval commits tool evidence; rejection does not"` |

## Principle under test

Irreversible or high-impact tools **propose**; they do not commit. A human gate is part of the lifecycle, not an afterthought.

## Scenario A \u2014 Wait for approval

1. Agent `proof.auditor` requests `crm.read` + `payments.wire` under `baseline` + `high-impact`.
2. Engine advances until approval stage.
3. Assert execution status is `APPROVAL`.
4. Assert zero `TOOL_RESULT` evidence rows for that execution.
5. Assert a `PENDING` approval record exists.

## Scenario B \u2014 Approve vs reject

1. Same path to `PENDING` approval on `payments.wire`.
2. **Approve** \u2192 tool evidence appears; execution can complete with a committed result.
3. **Reject** \u2192 no tool evidence committed; path does not pretend the wire happened.

## Why this matters for Vertical OS (clinic lead)

Clinical advice, fee exceptions, and public review replies map to the same pattern: agent may draft; human approves before irreversible or regulated action.

## What this is not

- Not a claim that payments are integrated in production.
- Not a client engagement metric.

## Related

- FAILURE-0001 \u2014 permission denial before side effects
- Control plane: `/control-plane`
