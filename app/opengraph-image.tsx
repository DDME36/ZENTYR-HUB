import { ImageResponse } from 'next/og';

export const alt = 'ZENTYR — Creative Tech Lab';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
          backgroundColor: '#09090b',
          backgroundImage:
            'radial-gradient(circle at 18% 18%, #312e81 0%, transparent 34%), radial-gradient(circle at 82% 76%, #164e63 0%, transparent 32%)',
        color: 'white',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 48,
          display: 'flex',
          height: 510,
          inset: 60,
          position: 'absolute',
        }}
      />
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            alignItems: 'center',
            background: 'linear-gradient(145deg, #fafafa 0%, #a1a1aa 52%, #22d3ee 100%)',
            borderRadius: 36,
            boxShadow: '0 24px 70px rgba(34,211,238,0.18)',
            color: '#09090b',
            display: 'flex',
            fontSize: 118,
            fontWeight: 900,
            height: 178,
            justifyContent: 'center',
            lineHeight: 1,
            marginBottom: 38,
            width: 178,
          }}
        >
          Z
        </div>
        <div style={{ fontSize: 76, fontWeight: 900, letterSpacing: 14 }}>ZENTYR</div>
        <div style={{ color: '#a1a1aa', fontSize: 30, letterSpacing: 7, marginTop: 20 }}>
          CREATIVE TECH LAB
        </div>
      </div>
    </div>,
    size
  );
}
