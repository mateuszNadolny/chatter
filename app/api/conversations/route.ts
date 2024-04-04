import getCurrentUser from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';
import { pusherServer } from '@/lib/pusher';

export async function POST(request: Request) {
  console.log('this shit is starting');
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;
    console.log(members); // thats how members array look like: [ '6601b42eb93fd303b84f8550', '65fe0a337d9a2e22814ee67f' ]

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 });
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((memberId: string) => ({ id: memberId })),
              { id: currentUser.id }
            ]
          }
        },
        include: {
          users: true
        }
      });

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, 'conversation:new', newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, currentUser.id]
            }
          }
        ]
      }
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id
            },
            {
              id: userId
            }
          ]
        }
      },
      include: {
        users: true
      }
    });

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:new', newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    // console.log('what the fuck');
    // console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
