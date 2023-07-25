'use client';

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Card from '@/app/components/Card';
import { getPokemonList } from '@/app/api/pokemon';
import { IPokemonList } from '../types/pokemon';
import { useSearchTermStore } from '../lib/store';

const Pokemons = () => {
  const { ref, inView } = useInView();
  const { searchTerm } = useSearchTermStore();

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({
      pageParam = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=12',
    }) =>
      getPokemonList({
        query: pageParam,
      }),
    queryKey: ['pokemons'],
    getNextPageParam: (lastPage) => {
      return lastPage.next;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  if (error) return <div className="mt-10">An error has occurred</div>;

  useEffect(() => {}, [data]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 w-full">
        {isSuccess &&
          searchTerm === '' &&
          data?.pages?.map((page) =>
            (page as IPokemonList)?.results?.map((pokemon, index: number) => {
              if (page.results.length === index + 1) {
                return (
                  <div ref={ref} key={index}>
                    <Card
                      key={pokemon.name}
                      id={pokemon.id}
                      imgUrl={pokemon.imageUrl}
                      name={pokemon.pokemonData?.names[2].name}
                    />
                  </div>
                );
              } else {
                return (
                  <Card
                    key={pokemon.name}
                    id={pokemon.id}
                    imgUrl={pokemon.imageUrl}
                    name={pokemon.pokemonData?.names[2].name}
                  />
                );
              }
            })
          )}

        {(isLoading || isFetchingNextPage) && (
          <p className="mb-4">Loading...</p>
        )}
      </div>
    </>
  );
};

export default Pokemons;
