import { Pokemon, PokemonDetails } from '../types/pokemon';
import { PokemonDetailsResponse } from '../types/shared';

/**
 * 
 * @param array Array to split.
 * @param itemsPerChunk Number of array items per chunk.
 * @returns Chunked array.
 */
export const chunkArray = (array: Array<any>, itemsPerChunk: number = 20): Array<any>[] => {
  return array.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index / itemsPerChunk)

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray;
  }, [])
}

/**
 * 
 * @param pokemons Pokemons array to filter.
 * @param type Type to be filtered by.
 * @returns Filtered Pokemons.
 */
export const filterPokemonsByType = (pokemons: Pokemon[], type: string): Pokemon[] =>
  pokemons.filter(pokemon => pokemon.types.find(t => t.name === type));

/**
 * 
 * @param pokemonFromServer Pokemon data recevied from server.
 * @returns Pokemon data for client.
 */
export const convertPokemonDetailsFromServerToPokemonDetailsForClient = (pokemonFromServer: PokemonDetailsResponse): PokemonDetails => {
  return {
    id: pokemonFromServer.id,
    name: pokemonFromServer.name,
    height: pokemonFromServer.height,
    weight: pokemonFromServer.weight,
    sprite: pokemonFromServer.sprites.other['official-artwork'].front_default,
    types: pokemonFromServer.types.map(type => ({ slot: type.slot, name: type.type.name })),
    species: pokemonFromServer.species,
    abilities: pokemonFromServer.abilities.map(ability => ({ slot: ability.slot, name: ability.ability.name })),
    stats: pokemonFromServer.stats.map(stat => ({ base_stat: stat.base_stat, name: stat.stat.name })),
  }
}
