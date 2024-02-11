import { Pokemon } from "../types/pokemon"

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
  pokemons.filter(pokemon => pokemon.types.find(t => t.type.name === type));
