export function safeParse<T>(str: string): T | null {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}
