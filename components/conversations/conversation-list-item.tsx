import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';

import useOtherUser from '@/hooks/useOtherUser';

import clsx from 'clsx';

import OtherUserAvatar from '../global/other-user-avatar';
import GroupAvatar from '../global/group-avatar';

import { FullConversationType } from '@/types';

interface ConversationListItemProps {
  conversation: FullConversationType;
  selected?: boolean;
}

const ConversationListItem = ({ conversation, selected }: ConversationListItemProps) => {
  const otherUser = useOtherUser(conversation);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];

    return messages[messages.length - 1];
  }, [conversation.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'pl-5 hover:bg-primary-foreground p-4 cursor-pointer',
        selected && 'bg-primary-foreground'
      )}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex gap-3">
          {!conversation.isGroup && <OtherUserAvatar user={otherUser} />}
          {conversation.isGroup && <GroupAvatar users={conversation.users} className="h-10 w-10" />}
          <div>
            <p className="font-semibold">{conversation.name || otherUser.name}</p>
            <p className={clsx(hasSeen ? 'text-gray-500 text-sm' : 'font-extrabold text-sm')}>
              {lastMessageText}
            </p>
          </div>
        </div>

        {lastMessage?.createdAt && (
          <div className="flex justify-end">
            <p className="text-[11px] text-right text-gray-500">
              {format(new Date(lastMessage.createdAt), 'p')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationListItem;
