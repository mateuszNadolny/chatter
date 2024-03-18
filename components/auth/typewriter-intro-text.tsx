'use client';

import { TbMessageHeart } from 'react-icons/tb';

import { TypewriterEffectSmooth } from '../ui/typewriter-effect';
export function TypewriterIntroText() {
  const words = [
    {
      text: 'Welcome'
    },
    {
      text: 'to'
    },
    {
      text: 'Chatter',
      className: 'text-blue-500 dark:text-blue-500'
    }
  ];
  return (
    <>
      <div className="hidden sm:flex flex-col gap-2 items-center justify-center">
        <TbMessageHeart className="h-[65px] w-[65px]" />
        <TypewriterEffectSmooth words={words} />
      </div>
      <div className="flex gap-2 items-center justify-center sm:hidden flex-col gap-2 items-center justify-center">
        <TbMessageHeart className="h-[65px] w-[65px]" />
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Welcome to Chatter
        </h2>
      </div>
    </>
  );
}
