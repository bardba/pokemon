'use client';

import Image from 'next/image';

type CardProps = {
  name: string;
  url: string;
};

const UserCard = ({ name, url }: CardProps) => {
  const id = url.split('/')[6];
  const thumbnail = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4 min-h-[150px]">
      <Image
        src={thumbnail}
        width={40}
        height={40}
        alt="thumbnail"
        placeholder="blur"
        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      />
      <p className="font-bold text-gray-800">{name}</p>
    </div>
  );
};

export default UserCard;
