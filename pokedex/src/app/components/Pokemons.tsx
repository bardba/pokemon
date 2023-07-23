'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Card from '@/app/components/Card';
import { getPokemonList, pokemonType } from '@/app/api/pokemon';

type pokemonPage = {
  next: string;
  previous: string;
  results: pokemonType[];
};

const Pokemons = () => {
  const { ref, inView } = useInView();
  const [searchTerm, setSearchTerm] = useState('');

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
    queryKey: ['pokemons', searchTerm],
    getNextPageParam: (lastPage) => {
      return lastPage.next;
    },
    select: (datas: { pages: pokemonPage[]; pageParams: any[] }) => {
      if (searchTerm) {
        const filteredPages = datas.pages.map((page) => {
          return {
            ...page,
            results: page.results.filter((pokemon) =>
              pokemon.id.includes(searchTerm)
            ),
          };
        });

        return {
          pageParams: datas.pageParams,
          pages: filteredPages,
        };
      }
      return datas;
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
      <input
        className="w-full p-2 rounded-md shadow-md text-black mt-10"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="포켓몬 아이디를 입력하세요."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10  w-full">
        {isSuccess &&
          data?.pages?.map((page) =>
            page?.results?.map((pokemon: pokemonType, index: number) => {
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
