import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';
import getCurrentUser from '@/actions/getCurrentUser';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { currentPassword, newPassword, confirmNewPassword } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, currentUser.hashedPassword!);

    if (!isPasswordCorrect) {
      return new NextResponse(JSON.stringify({ error: 'The current password is incorrect' }), {
        status: 400
      });
    }

    if (currentPassword === newPassword) {
      return new NextResponse(JSON.stringify({ error: 'New password cannot be the same as old' }), {
        status: 400
      });
    }

    if (newPassword !== confirmNewPassword) {
      return new NextResponse(JSON.stringify({ error: 'New passwords do not match' }), {
        status: 400
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        hashedPassword: newHashedPassword
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error(error, 'register error');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
