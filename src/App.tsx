import React from 'react';
import './css/index.css';
import PokemonList from './components/PokemonsList/PokemonsList';
import usePagination from './hooks/usePagination';
import useFetchPokemons from './hooks/useFetchPokemons';

function App() {
  const {
    pokemons,
    isLoading,
    count,
  } = useFetchPokemons();
  const {
    getNextPage,
    pokemonsPaginated,
  } = usePagination(pokemons);

  return (
    <div data-testid='app'>
      <PokemonList
        pokemons={pokemonsPaginated}
        count={count}
        fetchPokemons={getNextPage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
