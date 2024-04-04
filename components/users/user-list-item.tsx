'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import OtherUserAvatar from '../global/other-user-avatar';

import { User } from '@prisma/client';

interface UserListItemProps {
  user: User;
}

const UserListItem = ({ user }: UserListItemProps) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    axios
      .post('/api/conversations', { userId: user.id })
      .then((user) => {
        router.push(`/conversations/${user.data.id}`);
      })
      .finally();
  }, [user, router]);

  return (
    <div
      className="w-full flex gap-4 items-center p-4 pl-5 cursor-pointer hover:bg-primary-foreground"
      onClick={handleClick}>
      <OtherUserAvatar user={user} className="flex items-center" />
      <p>{user.name!}</p>
    </div>
  );
};

export default UserListItem;
