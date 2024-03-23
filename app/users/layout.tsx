import getCurrentUser from '@/actions/getCurrentUser';
import getUsers from '@/actions/getUsers';

import Sidebar from '@/components/sidebar/sidebar';
import Footer from '@/components/sidebar/footer';
import UserList from '@/components/users/user-list';

export default async function UsersLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  const users = await getUsers();

  return (
    <div className="flex h-screen w-full">
      <Sidebar currentUser={currentUser!} />
      <UserList users={users} />
      {children}
      <Footer currentUser={currentUser!} />
    </div>
  );
}
