import getCurrentUser from '@/actions/getCurrentUser';

import Sidebar from '@/components/sidebar/sidebar';
import Footer from '@/components/sidebar/footer';

export default async function UsersLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex h-screen">
      <Sidebar currentUser={currentUser!} />
      <Footer currentUser={currentUser!} />
      {children}
    </div>
  );
}
