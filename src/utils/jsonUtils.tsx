import { jsonrepair } from "jsonrepair";

export const repairJson = (value: string): string => {
  try {
    return jsonrepair(value);
  } catch (error) {
    throw new Error("Invalid JSON. Unable to repair.");
  }
};

export const beautifyJson = (value: string): string => {
  try {
    const repaired = jsonrepair(value);
    const parsed = JSON.parse(repaired);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error("Invalid JSON. Unable to beautify.");
  }
};

export const minifyJson = (value: string): string => {
  try {
    const repaired = jsonrepair(value);
    const parsed = JSON.parse(repaired);
    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error("Invalid JSON. Unable to minify.");
  }
};