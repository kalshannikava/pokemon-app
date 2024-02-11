import React from 'react';
import classnames from 'classnames';

import styles from './PokemonType.module.css';

type Props = {
  name: string,
  classNames?: string,
  onClick?: React.MouseEventHandler<HTMLSpanElement>,
}

const PokemonType = ({ name, classNames, onClick }: Props) => {
  return <span className={classnames(styles[name], classNames, styles.PokemonType)} onClick={onClick}>{name}</span>
}

export default PokemonType;
