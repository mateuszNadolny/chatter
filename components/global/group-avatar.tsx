import React from 'react';

import Image from 'next/image';

import useInitials from '@/hooks/useInitials';

import { cn } from '@/lib/utils';
import { User } from '@prisma/client';

interface GroupAvatarProps {
  className?: string;
  users: User[];
}

const GroupAvatar = ({ className, users }: GroupAvatarProps) => {
  const firstUser = users[0];
  const secondUser = users[1];
  const thirdUser = users[2];

  return (
    <div className={cn('relative rounded-full overflow-hidden', className)}>
      <div className="absolute w-1/2 h-full">
        <Image
          src={firstUser.image ? firstUser.image : '/default.jpg'}
          alt={firstUser.name as string}
          fill
          objectFit="cover"
          className="rounded-l-full"
        />
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2">
        <Image
          src={secondUser.image ? secondUser.image : '/default.jpg'}
          alt={secondUser.name as string}
          fill
          objectFit="cover"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2">
        <Image
          src={thirdUser.image ? thirdUser.image : '/default.jpg'}
          alt={thirdUser.name as string}
          fill
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default GroupAvatar;
