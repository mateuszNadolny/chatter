'use client';

import useRoutes from '@/hooks/useRoutes';

import UserAvatar from '../global/user-avatar';
import SidebarItem from './sidebar-item';
import { ThemeToggle } from '../global/theme-toggle';

import { User } from '@prisma/client';

interface SidebarProps {
  currentUser: User;
}

const Sidebar = ({ currentUser }: SidebarProps) => {
  const routes = useRoutes();
  return (
    <div className="hidden lg:flex flex-col justify-between gap-3 w-[5rem] border-r">
      <ul className="pt-10 flex flex-col gap-5 items-center justify-center">
        <UserAvatar currentUser={currentUser} />
        {routes.map((item) => (
          <SidebarItem
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={item.active}
            onClick={item.onClick}
          />
        ))}
      </ul>
      <div className="pb-10 flex flex-col gap-[3rem] items-center justify-center">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
