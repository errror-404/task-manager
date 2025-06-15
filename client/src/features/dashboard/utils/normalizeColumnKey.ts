export const normalizeColumnKey = (name: string): string =>
  name.toLowerCase().trim().replace(/\s+/g, "-");
