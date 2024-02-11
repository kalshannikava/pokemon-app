import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './PokemonsList.module.css';
import PokemonCard from '../PokemonCard/PokemonCard';
import type { Pokemon } from '../../types/pokemon';
import type { GetPoklemonsAdditionalData } from '../../types/shared';

type Props = {
  pokemons: Pokemon[],
  additionalData: GetPoklemonsAdditionalData,
  fetchPokemons: Function,
}
const PokemonsList = ({ pokemons, additionalData, fetchPokemons }: Props) => {
  return (
    <InfiniteScroll
      dataLength={pokemons.length}
      next={() => { console.log(additionalData.next); fetchPokemons(additionalData.next)}}
      hasMore={pokemons.length < additionalData.count}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      className={styles.PokemonsList}
    >
      {pokemons.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </InfiniteScroll>
  );
};

export default PokemonsList;
