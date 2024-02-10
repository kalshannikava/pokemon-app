import { useState, useEffect } from 'react';

import { GET_POKEMON } from '../constants';
import { FETCH_POKEMONS_OFFSET_INIT } from '../constants';
import { FETCH_POKEMONS_LIMIT_INIT } from '../constants';
import type { Pokemon, PokemonDetails, PokemonPartial } from '../types/pokemon';

const useFetchPokemons = (): Pokemon[] => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const fetchPokemonsNames = async (): Promise<PokemonPartial[]> => {
    const queryParams = new URLSearchParams({
      limit: String(FETCH_POKEMONS_LIMIT_INIT),
      offset: String(FETCH_POKEMONS_OFFSET_INIT),
    });

    const response = await fetch(`${GET_POKEMON}?${queryParams}`);
    const pokemonsList = await response.json();

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

  const fetchPokemons = async () => {
    const pokemonsList: PokemonPartial[] = await fetchPokemonsNames();
    const pokemonsDetails: PokemonDetails[] = await fetchPokemonsNamesDetails(pokemonsList);

    setPokemons(normalizeData(pokemonsList, pokemonsDetails));
  };
  useEffect(() => {
    fetchPokemons();
  }, []);

  return pokemons;
};

export default useFetchPokemons;
