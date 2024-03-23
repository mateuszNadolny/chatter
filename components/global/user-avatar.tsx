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
import { getInitials } from '@/lib/helpers';
import { User } from '@prisma/client';

interface UserAvatarProps {
  currentUser: User;
}

const UserAvatar = ({ currentUser }: UserAvatarProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Avatar className="cursor-pointer mb-5">
          <AvatarImage src={currentUser?.image as string} alt="User profile image" />
          <AvatarFallback>{getInitials(currentUser?.name || '')}</AvatarFallback>
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
