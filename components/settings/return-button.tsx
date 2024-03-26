'use client';

import { useRouter } from 'next/navigation';

import { IoIosArrowBack } from 'react-icons/io';

import { Button } from '@/components/ui/button';

import React from 'react';

const ReturnButton = () => {
  const router = useRouter();
  return (
    <Button variant="link" onClick={() => router.push('/conversations')}>
      <IoIosArrowBack className=" h-5 w-5 mr-2 cursor-pointer" />
      Go back to Chatter
    </Button>
  );
};

export default ReturnButton;
