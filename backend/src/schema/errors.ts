// Zod 4 replaced `required_error` / `invalid_type_error` with a single `error` map.
// These helpers keep the Zod 3 behavior: each message only applies to its own case,
// otherwise Zod falls back to its default message.

export const required = (message: string) => ({
    error: (issue: { input: unknown }) => (issue.input === undefined ? message : undefined),
});

export const invalidType = (message: string) => ({
    error: (issue: { input: unknown }) => (issue.input !== undefined ? message : undefined),
});
