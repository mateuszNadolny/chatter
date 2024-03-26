import getCurrentUser from '@/actions/getCurrentUser';
import getConversations from '@/actions/getConversations';

import Sidebar from '@/components/sidebar/sidebar';
import Footer from '@/components/sidebar/footer';
import ConversationList from '@/components/conversations/conversation-list';

export default async function ConversationsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  const conversations = await getConversations();
  return (
    <div className="lg:flex h-screen w-full">
      <Sidebar currentUser={currentUser!} />
      <ConversationList initialConversations={conversations} />
      {children}
      <Footer currentUser={currentUser!} />
    </div>
  );
}
