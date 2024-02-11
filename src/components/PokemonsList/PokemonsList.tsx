import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './PokemonsList.module.css';
import PokemonCard from '../PokemonCard/PokemonCard';
import Loader from '../Loader/Loader';
import type { Pokemon } from '../../types/pokemon';

type Props = {
  pokemons: Pokemon[],
  count: number,
  fetchPokemons: Function,
  isLoading: boolean,
}
const PokemonsList = ({ pokemons = [], count, fetchPokemons, isLoading = false }: Props) => {
  return (
    isLoading ? <Loader/> :
    <InfiniteScroll
      dataLength={pokemons.length}
      next={() => fetchPokemons()}
      hasMore={Boolean(pokemons.length && pokemons.length < count)}
      loader={<Loader />}
      className={styles.PokemonsList}
    >
      {pokemons.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </InfiniteScroll>
  );
};

export default PokemonsList;
