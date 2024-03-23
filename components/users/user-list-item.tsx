'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { User } from '@prisma/client';

import { getInitials } from '@/lib/helpers';

interface UserListItemProps {
  user: User;
}

const UserListItem = ({ user }: UserListItemProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post('/api/conversations', { userId: user.id })
      .then((user) => {
        router.push(`/conversations/${user.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [user, router]);

  return (
    <div
      className="w-full flex gap-4 items-center h-[60px] pl-5 cursor-pointer hover:bg-primary-foreground"
      onClick={handleClick}>
      <Avatar className="cursor-pointer flex items-center">
        <AvatarImage src={user?.image as string} alt="User profile image" />
        <AvatarFallback className="">{getInitials(user?.name || '')}</AvatarFallback>
      </Avatar>

      <p>{user.name!}</p>
    </div>
  );
};

export default UserListItem;
