import React from 'react';
import classnames from 'classnames';

import styles from './PokemonCard.module.css';
import type { Pokemon } from '../../types/pokemon';
import { formatHeight, formatStatName, formatWeight } from '../../utils/formatters';

type Props = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: Props) => {
  const { id, name, sprites, types, species, height, weight, abilities, stats } = pokemon;
  return (
    <div className={styles.PokemonCard}>
      <div className={styles.PokemonInfoContainer}>
        <img src={sprites.other['official-artwork'].front_default} alt={name} className={styles.PokemonAvatar} />
        <div>
          <h3 className={styles.PokemonName}>{`${name} data`}</h3>
          <dl className={classnames(styles.PokemonInfo, styles.Table)}>
            <dt>National №</dt>
            <dd>{String(id).padStart(3, '0')}</dd>
            <dt>Type</dt>
            <dd className={styles.PokemonType}>
              {types.map((type) => (
                <span key={`${type.type.name}_${id}`} className={styles[type.type.name]}>{type.type.name}</span>
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
              {abilities.map(ability => <span key={`${ability.ability.name}_${ability.slot}_${id}`}>{ability.ability.name}</span>)}
            </dd>
        </dl>
        </div>
      </div>
      <div className={styles.PokemonStatsContainer}>
        <h3 className={styles.StatsHeader}>Base stats</h3>
        <dl className={classnames(styles.PokemonStats, styles.Table)}>
          {stats.map(stat => {
            return <React.Fragment key={`${stat.stat.name}_${id}`}>
            <dt>{formatStatName(stat.stat.name)}</dt>
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
