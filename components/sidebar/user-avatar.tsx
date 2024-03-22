'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { User } from '@prisma/client';

interface UserAvatarProps {
  currentUser: User;
}

const UserAvatar = ({ currentUser }: UserAvatarProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Avatar className="cursor-pointer mb-5">
          <AvatarImage src={currentUser?.image || '/default-avatar.jpg'} alt="User profile image" />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{currentUser.name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserAvatar;
