export function removeWhitespace(value: string | string[]) {
  if (typeof value === 'string') {
    return value.replace(/\s+/g, '');
  }
  return value.map((str) => str.replace(/\s+/g, '')).join('');
}
