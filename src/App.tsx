import React from 'react';
import './css/index.css';
import useFetchPokemons from './hooks/useFetchPokemons';
import PokemonList from './components/PokemonsList/PokemonsList';

function App() {
  const { pokemons, additionalData, fetchPokemons } = useFetchPokemons();

  return (
    <div data-testid='app'>
      <PokemonList pokemons={pokemons} additionalData={additionalData} fetchPokemons={fetchPokemons} />
    </div>
  );
}

export default App;
