export type DataFormat = "json" | "xml" | "yaml" | "text";

export const detectFormat = (value: string): DataFormat => {
  const trimmed = value.trim();

  if (!trimmed) return "text";

  try {
    JSON.parse(trimmed);
    return "json";
  } catch {
    // continue
  }

  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
    trimmed.includes('\\"')
  ) {
    return "json";
  }

  if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
    return "xml";
  }

  if (trimmed.includes(":") && !trimmed.includes("{")) {
    return "yaml";
  }

  return "text";
};