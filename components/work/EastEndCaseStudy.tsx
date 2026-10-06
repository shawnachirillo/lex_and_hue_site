import Image from 'next/image';

const courier = {
  fontFamily: '"Courier New", Courier, monospace',
} as const;

export default function EastEndCaseStudy() {
  return (
    <main className="bg-[#f6f0e4] text-[#211f1c]">
      {/* =====================================================
          01 / HERO
      ===================================================== */}

      <section className="relative h-[100svh] min-h-[680px] overflow-hidden bg-[#1e3028] text-[#f6f0e4]">
        <Image
          src="/images/doorknob.jpg"
          alt="Antique brass door knocker"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* subtle darkening so typography belongs to image */}
        <div className="absolute inset-0 bg-black/15" />

        <div className="absolute inset-0 px-6 pb-8 pt-32 md:px-10 md:pb-10 md:pt-36 lg:px-12">
          <div className="relative mx-auto h-full max-w-[1800px]">
            <h1 className="absolute left-0 top-0 max-w-[700px] text-[clamp(3rem,7vw,7.5rem)] uppercase leading-[0.84]">
              The East
              <br />
              End Co.
            </h1>

            <p
              className="absolute right-0 top-[16%] text-[10px] uppercase"
              style={courier}
            >
              Brand Identity
            </p>

            <p
              className="absolute bottom-0 left-0 text-[10px] uppercase"
              style={courier}
            >
              Case Study 01
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}