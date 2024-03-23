'use client';

import useRoutes from '@/hooks/useRoutes';

import UserAvatar from '../global/user-avatar';
import FooterItem from './footer-item';
import { ThemeToggle } from '../global/theme-toggle';

import { User } from '@prisma/client';

interface FooterProps {
  currentUser: User;
}

const Footer = ({ currentUser }: FooterProps) => {
  const routes = useRoutes();
  return (
    <div className="fixed bottom-0 lg:hidden w-full border-t-2">
      <ul className="p-3 flex items-center justify-between w-full h-full">
        {routes.map((item) => (
          <FooterItem
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={item.active}
            onClick={item.onClick}
          />
        ))}
        <li>
          <UserAvatar currentUser={currentUser} className="h-8 w-8 shrink-0" />
        </li>
      </ul>
    </div>
  );
};

export default Footer;
