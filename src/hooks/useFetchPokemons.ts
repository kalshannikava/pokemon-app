import { useState, useEffect } from 'react';

import { GET_POKEMON } from '../constants';
import { FETCH_POKEMONS_OFFSET_INIT } from '../constants';
import { FETCH_POKEMONS_LIMIT_INIT } from '../constants';
import type { Pokemon, PokemonDetails, PokemonPartial } from '../types/pokemon';
import type { GetPoklemonsAdditionalData } from '../types/shared';

const useFetchPokemons = (): 
{ pokemons: Pokemon[], additionalData: GetPoklemonsAdditionalData, fetchPokemons: Function } => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [additionalData, setAdditionalData] = useState<GetPoklemonsAdditionalData>({ count: 0, next: '' });

  const fetchPokemonsNames = async (url?: string): Promise<PokemonPartial[]> => {
    const queryParams = new URLSearchParams({
      limit: String(FETCH_POKEMONS_LIMIT_INIT),
      offset: String(FETCH_POKEMONS_OFFSET_INIT),
    });

    const response = await fetch(url || `${GET_POKEMON}?${queryParams}`);
    const pokemonsList = await response.json();
    setAdditionalData({ next: pokemonsList.next, count: pokemonsList.count });
    return pokemonsList.results;
  };

  const fetchPokemonsNamesDetails = async (pokemonsList: PokemonPartial[]): Promise<PokemonDetails[]> => {
    const requests = pokemonsList.map((pokemon) => fetch(pokemon.url));
    const responses = await Promise.all(requests);
    const responsesJson = await responses.map((res) => res.json());
    const pokemonsDetails = await Promise.all(responsesJson);

    return pokemonsDetails;
  };

  const normalizeData = (pokemonsList: PokemonPartial[], pokemonsDetails: PokemonDetails[]): Pokemon[] =>
    pokemonsList.map((pokemon: PokemonPartial) => {
      const details: PokemonDetails = pokemonsDetails.find(
        (detail) => detail.name === pokemon.name
      )!;
      return {
        ...pokemon,
        ...details,
      };
    });

  const fetchPokemons = async (url?: string) => {
    const pokemonsList: PokemonPartial[] = await fetchPokemonsNames(url);
    const pokemonsDetails: PokemonDetails[] = await fetchPokemonsNamesDetails(pokemonsList);

    setPokemons([...pokemons, ...normalizeData(pokemonsList, pokemonsDetails)]);
  };
  useEffect(() => {
    fetchPokemons();
  }, []);

  return { pokemons, additionalData, fetchPokemons };
};

export default useFetchPokemons;
