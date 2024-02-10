import React from 'react';
import './css/index.css';
import useFetchPokemons from './hooks/useFetchPokemons';
import PokemonList from './components/PokemonsList/PokemonsList';

function App() {
  const pokemons = useFetchPokemons();

  return (
    <div data-testid='app'>
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

export default App;
