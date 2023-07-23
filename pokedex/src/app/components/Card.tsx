import Image from 'next/image';
import { getPokemonInfo } from '../api/pokemon';
import { useEffect, useState } from 'react';

type CardProps = {
  imgUrl: string;
  id: string;
};

const UserCard = ({ imgUrl, id }: CardProps) => {
  const [korName, setKorName] = useState('');
  useEffect(() => {
    getPokemonInfo({ id }).then((res) => {
      setKorName(res.names[2].name);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4 min-h-[150px]">
      <Image
        src={imgUrl || ''}
        width={40}
        height={40}
        alt="thumbnail"
        placeholder="blur"
        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      />
      <p className="font-bold text-gray-800">{korName}</p>
    </div>
  );
};

export default UserCard;
