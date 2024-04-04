'use client';

import dynamic from 'next/dynamic';
import { cn } from '../../lib/utils';

import useConversation from '../../hooks/useConversation';

// ADDING DYNAMIC IMPORT TO RESOLVE ISSUE COMING FROM APP BUILD (NPM RUN BUILD)
// https://github.com/vercel/next.js/issues/58576
// TODO: remove dynamic imports after Next releases fix of the issue

// import EmptyState from '../../components/global/empty-state';
const EmptyState = dynamic(() => import('../../components/global/empty-state'), { ssr: false });
const ConversationsPage = () => {
  const { isOpen } = useConversation();

  return (
    <div className={cn('lg:block h-full w-full', isOpen! ? 'block' : 'hidden')}>
      <EmptyState />
    </div>
  );
};

export default ConversationsPage;
