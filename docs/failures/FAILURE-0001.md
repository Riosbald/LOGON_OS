# FAILURE-0001 \u2014 Registered tool \u2260 permitted tool

| Field | Value |
|-------|--------|
| **ID** | FAILURE-0001 |
| **Class** | Builder-operated (kernel regression) |
| **Date recorded** | 2026-09-25 |
| **Component** | `src/lib/logon/engine.ts` + permission gate |
| **Failure type** | `PERMISSION_DENIAL` |
| **Test** | `src/lib/logon/engine.test.ts` \u2192 `"a registered tool does not grant permission"` |

## Principle under test

**Can do \u2260 may do.**  
Membership in the tool registry must not imply authorisation to invoke the tool.

## Scenario

1. Agent `demand.scout` starts an execution with objective: *Send unsolicited outreach*.
2. Requested tools include `outreach.email` (assumed registered in the catalog).
3. Policy set: `baseline` only \u2014 no grant for outbound email outreach.
4. Engine advances through the lifecycle (intake \u2192 context \u2192 policy \u2192 plan \u2192 tool permission).

## Observed result

| Check | Expected | Actual |
|-------|----------|--------|
| Execution status | `FAILED` | `FAILED` |
| Failure type | `PERMISSION_DENIAL` | `PERMISSION_DENIAL` |
| Side effects before denial | None | None (gate fires before commit) |

## Root cause

Tool was **available** (registered) but **not authorised** for this agent + policy set. Correct behaviour is denial, not silent proceed or \u201cbest effort\u201d send.

## Fix / permanent control

- Permission check is a hard gate in the execution lifecycle, not advisory.
- Regression test permanently encodes: registered \u2260 permitted.
- Any future tool registration must pair with an explicit allow rule or remain unusable.

## Regression test (must stay green)

```text
startExecution(\u2026 requestedTools: ["outreach.email"], policySet: ["baseline"])
advance until terminal
assert status === "FAILED"
assert failureType === "PERMISSION_DENIAL"
```

## What this is not

- Not a client case study.
- Not a production incident at a customer site.
- Not a performance or model-quality claim.

## What this is

Living proof that the LOG_ON kernel enforces **Can do \u2260 may do** before side effects. Linked from Assurance, Business evidence index, and Insights as **builder-operated** evidence.

## Related

- FAILURE-0002 \u2014 High-impact tool waits for approval (no TOOL_RESULT until decideApproval)
- Control plane: `/control-plane`
- Assurance method: `/systems/assurance`
