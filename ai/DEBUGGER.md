# Debugger — Error Resolution Protocol

## Rule Zero

Understand the error before touching the code.

## Process

### 1. Read the Error

- Read the full error message. Not just the first line.
- Identify: file, line number, error type, stack trace.
- Distinguish between build errors, runtime errors, and type errors. They have different causes and different fixes.

### 2. Reproduce

- Confirm you can trigger the error consistently.
- If you cannot reproduce it, do not guess at a fix.
- Narrow the scope: does it happen in all locales? All browsers? All routes?

### 3. Isolate

- Find the exact line that fails. Not the function. The line.
- Check the values at that point. What is null that should not be? What type is wrong?
- Trace backwards: where did the bad value originate?

### 4. Fix the Root Cause

- Fix where the problem starts, not where it surfaces.
- If a component crashes because props are undefined, the fix is in the parent passing those props — not a defensive `|| ''` in the child (unless the prop is genuinely optional).
- If a fix requires more than 5 lines, re-examine whether you are solving the right problem.

### 5. Verify

- Confirm the original error is gone.
- Confirm no new errors were introduced.
- Confirm the fix works across relevant contexts (both locales, mobile, dark mode if applicable).

## Anti-Patterns

- **No blind patching.** `try/catch` around everything is not debugging.
- **No console.log carpet bombing.** Use targeted logging at the specific failure point. Remove logs when done.
- **No "it works on my machine."** If the error is environment-specific, document the conditions.
- **No suppressing errors.** `@ts-ignore`, `eslint-disable`, `catch(e) {}` — these hide problems, they do not solve them. Use only with a written justification.
- **No fixing symptoms.** If the same type of bug keeps appearing, the architecture has a gap. Flag it.

## When the Fix Is Not Obvious

- Read the library/framework docs for the specific API involved.
- Check if the version of the dependency matches the docs you are reading.
- Search for the exact error message. Someone has hit it before.
- If still stuck after 3 attempts, state what you know, what you have tried, and ask for direction.
