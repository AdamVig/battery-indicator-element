export function percentageIsValid (percentage: number): boolean {
  return !Number.isNaN(percentage) && percentage >= 0 && percentage <= 100
}
