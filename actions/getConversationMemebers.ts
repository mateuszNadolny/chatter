'use server';

import prisma from '@/lib/prismadb';
import getSession from './getSession';
import getCurrentUser from './getCurrentUser';

export default async function getConversationMembers(array: string[]) {
  const session = await getSession();
  const currentUser = await getCurrentUser();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: array
        },
        NOT: {
          email: session.user.email
        }
      }
    });

    return [...users, currentUser];
  } catch (error) {
    console.error(error);
    return [];
  }
}
