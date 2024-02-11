import React, { useEffect, useState } from 'react';

import './css/index.css';
import { GET_TYPES } from './constants';
import PokemonList from './components/PokemonsList/PokemonsList';
import Filters from './components/Filters/Filters';
import usePagination from './hooks/usePagination';
import useFetchPokemons from './hooks/useFetchPokemons';
import useFetch from './hooks/useFetch';
import { filterPokemonsByType } from './utils/helpers';
import type { Pokemon } from './types/pokemon';
import type { PokemonTypeResponse } from './types/shared';

function App() {
  const {
    pokemons,
    isLoading,
    count,
  } = useFetchPokemons();

  const [pokemonsToRender, setPokemonsToRender] = useState<Pokemon[]>([]);

  const {
    getNextPage,
    pokemonsPaginated,
    resetPagination,
  } = usePagination(pokemonsToRender);

  const typesFetched = useFetch<PokemonTypeResponse>(GET_TYPES);
  const [filter, setFilter] = useState<string>('');
  const [pokemonsCount, setPokemonsCount] = useState<number>(0);

  useEffect(() => {
    setPokemonsToRender(pokemons);
    setPokemonsCount(count);
  }, [pokemons, count]);

  useEffect(() => {
    const filteredPokemons = filterPokemonsByType(pokemons, filter);
    resetPagination();
    setPokemonsToRender(filteredPokemons);
    setPokemonsCount(filteredPokemons.length);
  }, [filter]);

  return (
    <div data-testid='app'>
      <Filters types={typesFetched.data?.results.map(r => r.name) || []} setFilter={setFilter} />
      <PokemonList
        pokemons={pokemonsPaginated}
        count={pokemonsCount}
        fetchPokemons={getNextPage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
