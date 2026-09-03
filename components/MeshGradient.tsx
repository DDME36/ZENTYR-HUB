'use client';

export const MeshGradient = () => {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-700 bg-[#fafafa] dark:bg-[#09090b]"
      aria-hidden="true"
    >
      {/* Light Mode Mesh Orbs */}
      <div className="block dark:hidden">
        <div className="absolute -left-[12%] -top-[12%] h-[70vh] w-[65vw] rounded-full bg-gradient-to-br from-purple-200/55 to-rose-100/40 blur-[100px] sm:w-[48vw]" />
        <div className="absolute -bottom-[15%] -right-[12%] h-[80vh] w-[75vw] rounded-full bg-gradient-to-tl from-rose-200/50 to-amber-100/40 blur-[110px] sm:w-[55vw]" />
        <div className="absolute left-[20%] top-[28%] h-[48vh] w-[55vw] rounded-full bg-gradient-to-r from-violet-100/35 to-rose-100/40 blur-[90px]" />
      </div>

      {/* Dark Mode Subtle Ambient Orbs */}
      <div className="hidden dark:block">
        <div className="absolute -left-[12%] -top-[12%] h-[60vh] w-[55vw] rounded-full bg-gradient-to-br from-violet-950/30 to-purple-950/20 blur-[120px]" />
        <div className="absolute -bottom-[15%] -right-[12%] h-[70vh] w-[65vw] rounded-full bg-gradient-to-tl from-cyan-950/25 to-blue-950/20 blur-[130px]" />
      </div>

      {/* Grid Pattern Overlay: White Grid on Dark / Black Grid on Light */}
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-60 transition-opacity duration-700 dark:block"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.055) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse 65% 55% at 50% 38%, black 10%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 65% 55% at 50% 38%, black 10%, transparent 80%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 block opacity-55 transition-opacity duration-700 dark:hidden"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse 65% 60% at 50% 50%, black 10%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 65% 60% at 50% 50%, black 10%, transparent 80%)',
        }}
      />

      {/* Subtle vignette border */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-700 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(255,255,255,0.7)_100%)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_50%,rgba(9,9,11,0.8)_100%)]" />
    </div>
  );
};
