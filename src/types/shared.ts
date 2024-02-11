/**
  * Pokemon type data received from GET /type
*/
export type PokemonTypeResponse = {
  count: number,
  results: {
    name: string,
    url: string,
  }[],
}

/**
  * A list of abilities this Pokémon could potentially have.
*/
export type PokemonAbilityFromServer = {
  ability: {
    name: string,
    url: string,
  },
  is_hidden: boolean,
  slot: number,
};

/**
  * A set of sprites used to depict this Pokémon in the game.
*/
export type PokemonSpriteFromServer = {
  other: {
    'official-artwork': {
      front_default: string,
  },
  }
}

/**
  * A list of base stat values for this Pokémon.
*/
export type PokemonStatFromServer = {
  base_stat: number,
  effort: number,
  stat: {
      name: string,
      url: string,
  }
};

/**
  * The species this Pokémon belongs to.
*/
export type PokemonSpeciesFromServer = {
  name: string,
  url: string,
}

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
  * Pokemon data erceived from GET /pokemon/id
*/
export type PokemonDetailsResponse = {
  name: string,
  id: number,
  height: number,
  weight: number,
  abilities: PokemonAbilityFromServer[],
  sprites: PokemonSpriteFromServer,
  species: PokemonSpeciesFromServer,
  stats: PokemonStatFromServer[],
  types: PokemonType[],
}
