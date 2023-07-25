'use client';

import { useSearchTermStore } from '../lib/store';
import Card from './Card';

const ResultPokemons = () => {
  const { searchResult, searchTerm } = useSearchTermStore();
  return (
    <>
      {searchResult && searchTerm && (
        <div className="mt-10">
          <Card
            key={searchResult?.names[2].name}
            id={searchResult?.id.toString()}
            imgUrl={searchResult?.imageUrl}
            name={searchResult?.names[2].name}
          />
        </div>
      )}
      {searchTerm !== '' && !searchResult && (
        <div className="mt-10">검색 결과가 없습니다.</div>
      )}
    </>
  );
};

export default ResultPokemons;
