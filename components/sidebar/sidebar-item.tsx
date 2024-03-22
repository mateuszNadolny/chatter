import Link from 'next/link';
import clsx from 'clsx';

interface SidebarItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
  isLogout?: boolean;
}

const SidebarItem = ({ label, icon: Icon, href, onClick, active, isLogout }: SidebarItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick} key={label}>
      <Link
        href={href}
        className={clsx(
          `flex rounded-md p-3 text-muted-foreground hover:bg-accent`,
          active && 'bg-accent text-secondary-foreground'
        )}>
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
