'use client';

import useInitials from '@/hooks/useInitials';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { User } from '@prisma/client';

interface UserAvatarProps {
  user: User;
  className?: string;
}
const OtherUserAvatar = ({ user, className }: UserAvatarProps) => {
  const initials = useInitials(user.name!);

  return (
    <Avatar className={className}>
      <AvatarImage src={user?.image as string} alt="User profile image" />
      <AvatarFallback className="">{initials}</AvatarFallback>
    </Avatar>
  );
};

export default OtherUserAvatar;
