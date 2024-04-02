import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { image } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        image: image || currentUser.image
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error(error, 'image update error');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
