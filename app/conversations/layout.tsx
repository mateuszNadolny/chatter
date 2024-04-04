import dynamic from 'next/dynamic';

import getCurrentUser from '../../actions/getCurrentUser';
import getConversations from '../../actions/getConversations';

// ADDING DYNAMIC IMPORT TO RESOLVE ISSUE COMING FROM APP BUILD (NPM RUN BUILD)
// https://github.com/vercel/next.js/issues/58576
// TODO: remove dynamic imports after Next releases fix of the issue

// import Sidebar from '../../components/sidebar/sidebar';
// import Footer from '../../components/sidebar/footer';
// import ConversationList from '../../components/conversations/conversation-list';

const Sidebar = dynamic(() => import('../../components/sidebar/sidebar'), {
  ssr: false
});
const Footer = dynamic(() => import('../../components/sidebar/footer'), {
  ssr: false
});
const ConversationList = dynamic(() => import('../../components/conversations/conversation-list'), {
  ssr: false
});

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
      <ConversationList initialConversations={conversations!} />
      {children}
      <Footer currentUser={currentUser!} />
    </div>
  );
}
