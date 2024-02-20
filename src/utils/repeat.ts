/**
 * Repeat a function n times
 * @param n
 * @param fn 
 */
function repeat(n: number, fn: () => void): void {
  Array.from({ length: n }).forEach(() => fn());
}

export { repeat };
