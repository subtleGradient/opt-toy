export function fromCenter(
  width: number,
  height: number,
  transform: string
): string {
  return `
    translate(${width / 2} ${height / 2})
    ${transform}
    translate(${-width / 2} ${-height / 2})
  `;
}
