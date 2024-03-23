'use client';
import { useState, useEffect } from 'react';

import UserListItem from './user-list-item';
import Searchbar from './searchbar';

import { User } from '@prisma/client';

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [slicedUsers, setSlicedUsers] = useState<User[]>(users.slice(0, 10));

  useEffect(() => {
    setSlicedUsers(filteredUsers.slice(0, 10));
    console.log('use effecting');
  }, [filteredUsers, users]);

  return (
    <div className="flex flex-col gap-3 w-full lg:w-[27rem] border-r">
      <h2 className="p-2 pl-5 text-2xl font-extrabold tracking-tight transition-colors">Users</h2>
      <Searchbar users={users} setFilteredUsers={setFilteredUsers} />
      <ul className="flex flex-col gap-4">
        {slicedUsers.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
