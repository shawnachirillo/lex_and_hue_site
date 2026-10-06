import Image from 'next/image';

export default function EastEndCaseStudy() {
  return (
    <main className="bg-[#211f1c]">
      <Image
        src="/images/east-end-case-study.png"
        alt="The East End Co. brand identity case study"
        width={2500}
        height={12000}
        priority
        sizes="100vw"
        className="h-auto w-full"
      />
    </main>
  );
}