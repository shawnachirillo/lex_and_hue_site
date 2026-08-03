'use client';

import { useRouter } from 'next/navigation';
import StartProjectModal from '@/components/StartProjectModal';

export default function StartAProjectPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-ink">
      <StartProjectModal
        open
        onClose={() => router.push('/')}
      />
    </main>
  );
}
