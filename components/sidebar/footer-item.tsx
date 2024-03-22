import Link from 'next/link';
import clsx from 'clsx';

interface FooterItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const FooterItem = ({ label, icon: Icon, href, onClick, active }: FooterItemProps) => {
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
          `flex rounded-md p-2 text-muted-foreground hover:bg-accent border-t-2`,
          active && 'bg-accent text-secondary-foreground'
        )}>
        <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default FooterItem;
