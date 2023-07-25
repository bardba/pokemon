import Image from 'next/image';
import { useModalStore } from '../lib/store';

type CardProps = {
  imgUrl?: string;
  id?: string;
  name: string;
};

const UserCard = ({ imgUrl, name, id }: CardProps) => {
  const { setShowModal } = useModalStore();
  return (
    <div
      onClick={() => setShowModal(true, id || '')}
      className="flex flex-col items-center justify-start bg-white rounded-lg shadow-lg p-4 min-h-[100px] cursor-pointer"
    >
      <Image
        src={imgUrl || ''}
        width={40}
        height={40}
        alt="thumbnail"
        placeholder="blur"
        blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      />
      <p className="font-bold text-gray-800">
        {id}. {name}
      </p>
    </div>
  );
};

export default UserCard;
