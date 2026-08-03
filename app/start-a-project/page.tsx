'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StartAProjectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <main className="min-h-screen bg-ink" />
  );
}