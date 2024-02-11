import React from 'react';

import styles from './Filters.module.css';
import PokemonType from '../PokemonType/PokemonType';

type Props = {
  types: string[],
  setFilter: (filter: string) => void,
}

const Filters = ({ types, setFilter }: Props) => {
  return <>
    <h3>Filter by type: </h3>
    <div>{types.map(type => <PokemonType name={type} key={type} classNames={styles.FilterEntry} onClick={() => setFilter(type)}/>)}</div>
  </>
}

export default Filters;
