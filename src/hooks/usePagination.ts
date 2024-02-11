import { useEffect, useState } from 'react';

import { chunkArray } from '../utils/helpers';
import type { Pokemon } from '../types/pokemon';

/** Since PokeAPI doesn't support filtering, we're fetching all pokemons at once
  * but there is no need to render all of them at first load so we're splitting array to chunks to simulate pagination
*/
const usePagination = (pokemons: Pokemon[]) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pokemonsChunked, setPokemonsChunked] = useState<Pokemon[][]>([]);
  const [pokemonsPaginated, setPokemonsPaginated] = useState<Pokemon[]>([]);

  useEffect(() => {
    const chunked = chunkArray(pokemons, 20);
    if (chunked.length) {
      setPokemonsChunked(chunked);
      setPokemonsPaginated([...pokemonsPaginated, ...chunked[pageIndex]]);
    }
  }, [pokemons]);

  const getNextPage = () => {
    if (pageIndex < pokemonsChunked.length - 1) {
      setPageIndex(pageIndex + 1);
      setPokemonsPaginated([...pokemonsPaginated, ...pokemonsChunked[pageIndex + 1]]);
    }
  }

  const resetPagination = () => {
    setPokemonsPaginated([]);
    setPokemonsChunked([]);
    setPageIndex(0);
  }

  return {
    getNextPage,
    pokemonsPaginated,
    resetPagination,
  }
}

export default usePagination;
