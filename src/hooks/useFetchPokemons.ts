import { useState, useEffect } from 'react';

import useCache from './useCache';
import { chunkArray, convertPokemonDetailsFromServerToPokemonDetailsForClient } from '../utils/helpers';
import { CACHE_EXPIRES, FETCH_POKEMONS_DETAILS_LIMIT, GET_POKEMON } from '../constants';
import { FETCH_POKEMONS_OFFSET_INIT } from '../constants';
import { FETCH_POKEMONS_LIMIT_INIT } from '../constants';
import type { Pokemon, PokemonPartial } from '../types/pokemon';
import type { PokemonDetailsResponse } from '../types/shared';

const useFetchPokemons = (): 
{ pokemons: Pokemon[], count: number, isLoading: boolean, fetchPokemons: Function } => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setCached, getCached } = useCache();

  const fetchPokemonsNames = async (url?: string): Promise<PokemonPartial[]> => {
    const queryParams = new URLSearchParams({
      limit: String(FETCH_POKEMONS_LIMIT_INIT),
      offset: String(FETCH_POKEMONS_OFFSET_INIT),
    });
    try {
      setIsLoading(true);
      const response = await fetch(url || `${GET_POKEMON}?${queryParams}`);
      const pokemonsList = await response.json();
      setCount(pokemonsList.count);
      return pokemonsList.results;
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching pokemons: ', error);
      return [];
    }
  };

  const fetchBatchPokemonsDetails = async (batches: string[]) =>
    await Promise.all(batches.map(url => fetch(url)));

  const fetchPokemonsNamesDetails = async (pokemonsList: PokemonPartial[]): Promise<PokemonDetailsResponse[]> => {
    try {
      const requestsUrls: string[] = pokemonsList.map((pokemon) => pokemon.url);
      const batches: string[][] = chunkArray(requestsUrls, FETCH_POKEMONS_DETAILS_LIMIT);
  
      let responses: Response[] = [];
      for (const batch of batches) {
        const response = await fetchBatchPokemonsDetails(batch);
        responses.push(...response);
      }

      const responsesJson = await responses.map((res) => res.json());
      const pokemonsDetails = await Promise.all(responsesJson);

      return pokemonsDetails;
    } catch (error) {
      setIsLoading(false);
      console.log('Error fetching pokemon details: ', error);
      return [];
    }
  };

  const normalizeData = (pokemonsList: PokemonPartial[], pokemonsDetails: PokemonDetailsResponse[]): Pokemon[] => {
    if (!pokemonsList.length || !pokemonsDetails.length) return [];
    return pokemonsList.map((pokemon: PokemonPartial) => {
      const details: PokemonDetailsResponse = pokemonsDetails.find(
        (detail) => detail.name === pokemon.name
      )!;
      return {
        ...pokemon,
        ...convertPokemonDetailsFromServerToPokemonDetailsForClient(details),
      };
    });
  }

  const fetchPokemons = async (url?: string) => {
    const cachedPokemons: Pokemon[] | null = getCached('pokemons');
    if (cachedPokemons) {
      setIsLoading(false);
      setPokemons(cachedPokemons);
      return;
    }

    const pokemonsList: PokemonPartial[] = await fetchPokemonsNames(url);
    const pokemonsDetails: PokemonDetailsResponse[] = await fetchPokemonsNamesDetails(pokemonsList);

    setIsLoading(false);
    const newPokemons = [...pokemons, ...normalizeData(pokemonsList, pokemonsDetails)];
    setPokemons(newPokemons);
    setCached('pokemons', newPokemons, CACHE_EXPIRES);
  };
  useEffect(() => {
    fetchPokemons();
  }, []);

  return { pokemons, count, isLoading, fetchPokemons };
};

export default useFetchPokemons;
