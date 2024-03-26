import { useMemo } from 'react';

const useInitials = (name: string) => {
  const initials = useMemo(() => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }, [name]);

  return initials;
};

export default useInitials;
