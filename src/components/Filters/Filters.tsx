import React from 'react';

import styles from './Filters.module.css';
import PokemonType from '../PokemonType/PokemonType';
import classnames from 'classnames';

type Props = {
  types: string[],
  selected: string,
  setFilter: (filter: string) => void,
  resetFilters: () => void,
}

const Filters = ({ types, selected, setFilter, resetFilters }: Props) => {
  return <>
    <h3>Filter by type: </h3>
    <div>{types.map(type =>
      <PokemonType
        name={type}
        key={type}
        classNames={classnames(styles.FilterEntry, { [styles.Selected] : type === selected })}
        onClick={() => setFilter(type)}
      />)}
    </div>
    <button onClick={resetFilters} className={styles.ResetButton}>Reset filters</button>
  </>
}

export default Filters;
