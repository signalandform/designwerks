export function mergeDeep<T extends Record<string, unknown>>(
  base: T,
  patch: unknown,
): T {
  if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
    return base;
  }
  const patchRecord = patch as Record<string, unknown>;
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(patchRecord)) {
    if (value === undefined) continue;
    const baseVal = base[key as keyof T];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      baseVal &&
      typeof baseVal === "object" &&
      !Array.isArray(baseVal)
    ) {
      out[key] = mergeDeep(baseVal as Record<string, unknown>, value);
    } else {
      out[key] = value;
    }
  }
  return out as T;
}
