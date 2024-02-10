
/**
  * A list of abilities this Pokémon could potentially have.
*/
export type PokemonAbility = {
  ability: {
    name: string,
    url: string,
  },
  is_hidden: boolean,
  slot: number,
};

/**
  * A list of base stat values for this Pokémon.
*/
export type PokemonStat = {
  base_stat: number,
  effort: number,
  stat: {
      name: string,
      url: string,
  }
};

/**
  *	A list of details showing types this Pokémon has.
*/
export type PokemonType = {
  slot: number,
  type: {
    name: string,
    url: string,
  }
};

/**
  * The species this Pokémon belongs to.
*/
export type PokemonSpecies = {
  name: string,
  url: string,
}

/**
  * Partial Pokemon instance returned from GET /pokemon endpoint
*/
export type PokemonPartial = {
  name: string,
  url: string,
}

/**
  * Pokemon details returned from GET /pokemon/id endpoint
*/
export type PokemonDetails = {
  id: number,
  name: string,
  height: number,
  weight: number,
  sprites: {
    other: {
      'official-artwork': {
        front_default: string,
      }
    }
  },
  types: PokemonType[],
  species: PokemonSpecies,
  abilities: PokemonAbility[],
  stats: PokemonStat[],
}

/**
  * Complete Pokemon instance
*/
export type Pokemon = PokemonPartial & PokemonDetails;
