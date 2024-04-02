import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, displayMail, bio, website } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        name: name || currentUser.name,
        displayMail: displayMail || currentUser.displayMail,
        bio: bio || currentUser.bio,
        website: website || currentUser.website
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error(error, 'profile info update error');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
