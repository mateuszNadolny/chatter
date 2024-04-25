'use client';

import { useRouter } from 'next/navigation';

import useInitials from '@/hooks/useInitials';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { ThemeToggle } from '../global/theme-toggle';
import OtherUserAvatar from './other-user-avatar';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { CiSettings } from 'react-icons/ci';

import { signOut } from 'next-auth/react';

import { User } from '@prisma/client';

import clsx from 'clsx';

interface UserAvatarProps {
  currentUser: User;
  className?: string;
}

const UserAvatar = ({ currentUser, className }: UserAvatarProps) => {
  const router = useRouter();
  const initials = useInitials(currentUser.name!);

  return (
    <Dialog>
      <DialogTrigger>
        <Avatar className={clsx(`cursor-pointer`, className)}>
          <AvatarImage src={currentUser?.image as string} alt="User profile image" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="rounded-md w-4/5 lg:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center gap-4 w-full">
          <OtherUserAvatar user={currentUser} />
          <div>
            <DialogTitle className="flex flex-col items-start">
              {currentUser.name}
              <p className="text-sm text-gray-500">{currentUser.email}</p>
            </DialogTitle>
          </div>
        </DialogHeader>
        {currentUser.bio && <p className="text-xs lg:text-md">{currentUser.bio}</p>}
        <DialogFooter className="w-full flex-row gap-1 lg:gap-4">
          <ThemeToggle className="flex w-1/2" />
          <Button
            size="icon"
            className="flex gap-1 w-1/2 text-[12px] lg:text-sm"
            onClick={() => router.push('/settings')}>
            <CiSettings className="h-4 w-4 lg:h-5 lg:w-5" />
            Settings
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex gap-1 w-1/2 text-[12px] lg:text-sm">
            <RiLogoutBoxLine className="h-3 w-3 lg:h-5 lg:w-5" />
            Sign out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserAvatar;
