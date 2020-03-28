export function fromCenter(
  width: number,
  height: number,
  transform: string,
): string {
  return `
    translate(${width / 2}px, ${height / 2}px)
    ${transform}
    translate(${-width / 2}px, ${-height / 2}px)
  `;
}
