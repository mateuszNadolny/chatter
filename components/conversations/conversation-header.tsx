'use client';

import { useRouter } from 'next/navigation';

import useOtherUser from '@/hooks/useOtherUser';

import GroupAvatar from '../global/group-avatar';
import OtherUserAvatar from '../global/other-user-avatar';
import ConversationHeaderSettings from './conversation-header-settings';
import { IoIosArrowBack } from 'react-icons/io';

import { FullConversationType } from '@/types';

interface HeaderProps {
  conversation: FullConversationType;
}

const ConversationHeader = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);
  const router = useRouter();

  return (
    <div className="w-full h-[7%] border-b px-5 flex justify-between items-center">
      <div className="flex items-center gap-3 lg:gap-4">
        <IoIosArrowBack
          className="lg:hidden h-5 w-5 mr-2 cursor-pointer"
          onClick={() => router.push('/conversations')}
        />
        {!conversation.isGroup && <OtherUserAvatar user={otherUser} className="lg:h-12 lg:w-12" />}
        {conversation.isGroup && (
          <GroupAvatar users={conversation.users} className="lg:h-12 lg:w-12" />
        )}
        {!conversation.name && <h3 className="font-bold">{otherUser.name}</h3>}
        {conversation.name && <h3 className="font-bold">{conversation.name}</h3>}
      </div>
      <ConversationHeaderSettings conversation={conversation} otherUser={otherUser} />
    </div>
  );
};

export default ConversationHeader;
