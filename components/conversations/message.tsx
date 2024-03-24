import Image from 'next/image';

import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { format } from 'date-fns';

import useInitials from '@/hooks/useInitials';

import MessageImage from './message-image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FullMessageType } from '@/types';

interface MessageProps {
  isLast?: boolean;
  message: FullMessageType;
}
const Message = ({ message, isLast }: MessageProps) => {
  const session = useSession();
  const initilas = useInitials(message.sender.name!);

  const sentByMe = session.data?.user?.email === message.sender.email;
  const seenList = (message.seen || [])
    .filter((user) => user.email !== message.sender.email)
    .map((user) => user.name)
    .join(', ');

  const containerClass = clsx('flex gap-3 p-4', sentByMe && 'justify-end');
  const avatarClass = clsx(sentByMe && 'order-2');
  const bodyClass = clsx('flex flex-col gap-2', sentByMe && 'items-end');
  const messageClass = clsx(
    'text-sm w-fit overflow-hidden',
    sentByMe ? 'bg-sky-500 text-white' : 'bg-secondary',
    message.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  );

  return (
    <div className={containerClass}>
      <div className={avatarClass}>
        <Avatar>
          <AvatarImage src={message.sender.image!} alt="Profile picture" />
          <AvatarFallback>{initilas}</AvatarFallback>
        </Avatar>
      </div>
      <div className={bodyClass}>
        <div className={clsx('flex items-center gap-4', sentByMe && 'flex-row-reverse')}>
          <div className="text-sm font-semibold">{message.sender.name}</div>
          <div className="text-xs text-muted-foreground">
            {format(new Date(message.createdAt), 'p')}
          </div>
        </div>
        <div className={messageClass}>
          {message.image ? <MessageImage image={message.image} /> : <div>{message.body}</div>}
        </div>
        {isLast && sentByMe && seenList.length > 0 && (
          <div
            className="
            text-xs 
            font-light 
            text-muted-foreground
            ">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;