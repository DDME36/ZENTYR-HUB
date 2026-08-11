export const MeshGradient = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white" aria-hidden="true">
      <div className="absolute -left-[12%] -top-[12%] h-[70vh] w-[65vw] rounded-full bg-gradient-to-br from-rose-200/70 to-orange-100/40 blur-[100px] sm:w-[48vw]" />
      <div className="absolute -bottom-[15%] -right-[12%] h-[80vh] w-[75vw] rounded-full bg-gradient-to-tl from-purple-200/65 to-blue-200/50 blur-[110px] sm:w-[55vw]" />
      <div className="absolute left-[20%] top-[28%] h-[48vh] w-[55vw] rounded-full bg-gradient-to-r from-teal-100/35 to-rose-100/45 blur-[90px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 10%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 10%, transparent 80%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(255,255,255,0.72)_100%)]" />
    </div>
  );
};
