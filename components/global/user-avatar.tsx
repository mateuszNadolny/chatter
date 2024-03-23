'use client';
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
import { Button } from '../ui/button';
import { ThemeToggle } from '../global/theme-toggle';

import { RiLogoutBoxLine } from 'react-icons/ri';

import { signOut } from 'next-auth/react';

import { getInitials } from '@/lib/helpers';
import { User } from '@prisma/client';

import clsx from 'clsx';

interface UserAvatarProps {
  currentUser: User;
  className?: string;
}

const UserAvatar = ({ currentUser, className }: UserAvatarProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Avatar className={clsx(`cursor-pointer`, className)}>
          <AvatarImage src={currentUser?.image as string} alt="User profile image" />
          <AvatarFallback>{getInitials(currentUser?.name || '')}</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="rounded-md w-4/5 lg:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{currentUser.name}</DialogTitle>

          <DialogDescription></DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full flex-row gap-4">
          <ThemeToggle className="flex lg:hidden w-1/2" />
          <Button
            variant="secondary"
            size="icon"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex lg:hidden w-1/2">
            {/* <RiLogoutBoxLine className="h-4 w-4" /> */}
            Sign out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserAvatar;
