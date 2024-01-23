export function parseCommandList(str) {
  return str.split(/(?<!\\)\s/).map((v) => v.replace(/\\ /g, " "));
}
