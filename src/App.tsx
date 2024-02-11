import React from 'react';
import './css/index.css';
import PokemonList from './components/PokemonsList/PokemonsList';
import usePagination from './hooks/usePagination';

function App() {
  const {
    getNextPage,
    pokemonsPaginated,
    isLoading,
    count,
  } = usePagination();

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
