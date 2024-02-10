import React from 'react';

import styles from './PokemonsList.module.css';
import PokemonCard from '../PokemonCard/PokemonCard';
import type { Pokemon } from '../../types/pokemon';

type Props = {
  pokemons: Pokemon[],
}
const PokemonsList = ({ pokemons }: Props) => {
  return (
    <div className={styles.PokemonsList}>
      {pokemons.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
};

export default PokemonsList;
