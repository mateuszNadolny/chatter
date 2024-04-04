import dynamic from 'next/dynamic';

import getConversationById from '../../../actions/getConversationById';
import getMessages from '../../../actions/getMessages';

// ADDING DYNAMIC IMPORT TO RESOLVE ISSUE COMING FROM APP BUILD (NPM RUN BUILD)
// https://github.com/vercel/next.js/issues/58576
// TODO: remove dynamic imports after Next releases fix of the issue

// import EmptyState from '../../../components/global/empty-state';
// import ConversationHeader from '../../../components/conversations/conversation-header';
// import ConversationBody from '../../../components/conversations/conversation-body';
// import ConversationInput from '../../../components/conversations/conversation-input';

const EmptyState = dynamic(() => import('../../../components/global/empty-state'), {
  ssr: false
});
const ConversationHeader = dynamic(
  () => import('../../../components/conversations/conversation-header'),
  {
    ssr: false
  }
);
const ConversationBody = dynamic(
  () => import('../../../components/conversations/conversation-body'),
  {
    ssr: false
  }
);
const ConversationInput = dynamic(
  () => import('../../../components/conversations/conversation-input'),
  {
    ssr: false
  }
);

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
    <div className="fixed lg:static top-0 left-0 w-full h-screen z-20 flex flex-col bg-background">
      <ConversationHeader conversation={conversation} />
      <ConversationBody initialMessages={messages} />
      <ConversationInput />
    </div>
  );
};

export default ConversationId;
