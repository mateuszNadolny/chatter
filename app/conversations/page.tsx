'use client';

import EmptyState from '@/components/global/empty-state';

const Conversations = () => {
  return (
    <div className="hidden lg:block h-full w-full">
      <EmptyState />
    </div>
  );
};

export default Conversations;
