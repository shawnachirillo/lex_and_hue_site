'use client';

import { useState } from 'react';

import Approach from '@/components/home/Approach';
import Capabilities from '@/components/home/Capabilities';
import Hero from '@/components/home/Hero';
import HomeCTA from '@/components/home/HomeCTA';
import SelectedWork from '@/components/home/SelectedWork';
import Transformations from '@/components/home/Transformations';
import StartProjectModal from '@/components/StartProjectModal';
import ClientNotes from '@/components/home/ClientNotes';
export default function BrandPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const openInquiry = () => {
    setInquiryOpen(true);
  };

  const closeInquiry = () => {
    setInquiryOpen(false);
  };

  return (
    <main className="overflow-hidden bg-bone text-ink">
      <Hero onStartProject={openInquiry} />

      <Capabilities />

      <SelectedWork />

      <Transformations />

      <Approach />

      <HomeCTA onStartProject={openInquiry} />

      <StartProjectModal
        open={inquiryOpen}
        onClose={closeInquiry}
      />
    </main>
  );
}