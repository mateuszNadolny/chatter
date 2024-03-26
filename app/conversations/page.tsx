'use client';

import clsx from 'clsx';

import useConversation from '@/hooks/useConversation';
import EmptyState from '@/components/global/empty-state';

const Home = () => {
  const { isOpen } = useConversation();

  return (
    <div className={clsx('lg:block h-full w-full', isOpen ? 'block' : 'hidden')}>
      <EmptyState />
    </div>
  );
};

export default Home;
