import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { TbMessageHeart } from 'react-icons/tb';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { FaUsersLine } from 'react-icons/fa6';

import { signOut } from 'next-auth/react';
import useConversation from './useConversation';

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: TbMessageHeart,
        active: pathname === '/conversations' || !!conversationId
      },
      {
        label: 'Users',
        href: '/users',
        icon: FaUsersLine,
        active: pathname === '/users'
      },
      {
        label: 'Logout',
        onClick: () => signOut(),
        href: '#',
        icon: RiLogoutBoxLine
      }
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
