export const formatStatName = (statname: string): string => {
  switch (statname) {
    case 'hp':
      return 'HP';
    case 'attack':
      return 'Attack';
    case 'defense':
      return 'Defence';
    case 'special-attack':
      return 'Sp. Atk';
    case 'special-defense':
      return 'Sp. Def';
    case 'speed':
      return 'Speed';
    default:
      return statname;
  }
}

export const formatHeight = (height: number): string => {
  const meters: number = height / 10;
  const feets: number = Math.floor(meters * 3.28084);
  const inches: number = Math.round(((meters * 3.28084) - feets) * 12);
  return `${feets}'${inches}" (${meters} m)`;
}

export const formatWeight = (weight: number): string => {
  const kg: number = weight / 10;
  const lbs: number = kg * 2.205;
  return `${lbs.toFixed(1)} lbs (${kg} kg)`;
}
