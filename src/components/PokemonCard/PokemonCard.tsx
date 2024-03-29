import React from 'react';
import classnames from 'classnames';

import styles from './PokemonCard.module.css';
import PokemonType from '../PokemonType/PokemonType';
import type { Pokemon } from '../../types/pokemon';
import { formatHeight, formatStatName, formatWeight } from '../../utils/formatters';

type Props = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: Props) => {
  const { id, name, sprite, types, species, height, weight, abilities, stats } = pokemon;
  return (
    <div className={styles.PokemonCard}>
      <div className={styles.PokemonInfoContainer}>
        <img src={sprite} alt={name} className={styles.PokemonAvatar} />
        <div>
          <h3 className={styles.PokemonName}>{`${name} data`}</h3>
          <dl className={classnames(styles.PokemonInfo, styles.Table)}>
            <dt>National №</dt>
            <dd>{String(id).padStart(3, '0')}</dd>
            <dt>Type</dt>
            <dd className={styles.PokemonType}>
              {types.map((type) => (
                <PokemonType key={`${type.name}_${id}`} name={type.name} />
              ))}
            </dd>
            <dt>Species</dt>
            <dd className={styles.PokemonSpecies}>{species.name}</dd>
            <dt>Height</dt>
            <dd>{formatHeight(height)}</dd>
            <dt>Weight</dt>
            <dd>{formatWeight(weight)}</dd>
            <dt>Abilities</dt>
            <dd className={styles.PokemonAbilities}>
              {abilities.map(ability => <span key={`${ability.name}_${ability.slot}_${id}`}>{ability.name}</span>)}
            </dd>
        </dl>
        </div>
      </div>
      <div className={styles.PokemonStatsContainer}>
        <h3 className={styles.StatsHeader}>Base stats</h3>
        <dl className={classnames(styles.PokemonStats, styles.Table)}>
          {stats.map(stat => {
            return <React.Fragment key={`${stat.name}_${id}`}>
            <dt>{formatStatName(stat.name)}</dt>
            <dd>
              <span>{stat.base_stat}</span>
            </dd>
            </React.Fragment>
          })}
        </dl>
      </div>
    </div>
  );
};

export default PokemonCard;
