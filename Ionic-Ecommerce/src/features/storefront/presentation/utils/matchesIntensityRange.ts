export function matchesIntensityRange(intensity: number, intensityRange: string | null) {
  if (intensityRange === null) {
    return true;
  }

  if (intensityRange === '1-3') {
    return intensity >= 1 && intensity <= 3;
  }

  if (intensityRange === '4-6') {
    return intensity >= 4 && intensity <= 6;
  }

  return intensity >= 7 && intensity <= 10;
}
