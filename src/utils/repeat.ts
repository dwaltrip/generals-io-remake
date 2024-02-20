/**
 * Repeat a function n times
 * @param n
 * @param fn 
 */
function repeat(n: number, fn: () => void): void {
  Array.from({ length: n }).forEach(() => fn());
}

function rangeMap<T>(n: number, fn: (i?: number) => T): T[] {
  return Array.from({ length: n }).map((_, i) => fn(i));
}

export { repeat, rangeMap };
