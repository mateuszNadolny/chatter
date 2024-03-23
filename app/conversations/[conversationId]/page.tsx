import getConversationById from '@/actions/getConversationById';
import getMessages from '@/actions/getMessages';

import EmptyState from '@/components/global/empty-state';
import ConversationHeader from '@/components/conversations/conversation-header';

interface Props {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: Props }) => {
  const { conversationId } = params;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className="hidden lg:block h-full w-full">
        <EmptyState />
      </div>
    );
  }

  return (
    <>
      <ConversationHeader conversation={conversation} />
    </>
  );
};

export default ConversationId;
