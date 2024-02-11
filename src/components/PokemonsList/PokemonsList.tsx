import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './PokemonsList.module.css';
import PokemonCard from '../PokemonCard/PokemonCard';
import Loader from '../Loader/Loader';
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
      next={() => fetchPokemons(additionalData.next)}
      hasMore={Boolean(pokemons.length && pokemons.length < additionalData.count)}
      loader={<Loader />}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>{pokemons.length ? 'Yay! You have seen it all' : 'Oops! Something went wrong :('}</b>
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
