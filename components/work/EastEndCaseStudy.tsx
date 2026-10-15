import Image from 'next/image';

export default function EastEndCaseStudy() {
  return (
    <main className="min-h-screen bg-[#211f1c]">
      <div className="mx-auto w-full md:w-[75vw]">
        <Image
          src="/images/east-end-case-study1.png"
          alt="The East End Co. brand identity case study"
          width={2000}
          height={12000}
          priority
          sizes="(min-width: 768px) 75vw, 100vw"
          className="block h-auto w-full"
        />
      </div>
    </main>
  );
}