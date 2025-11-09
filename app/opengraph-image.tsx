import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Evgeny Shkuratov - Product Designer & AI-Powered Builder';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '48px 56px',
          position: 'relative',
        }}
      >
        {/* Shkuratov Designer text - top left */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '56px',
            display: 'flex',
            flexDirection: 'column',
            fontSize: '31.5px',
            color: 'white',
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: '-0.63px',
          }}
        >
          <div>Shkuratov</div>
          <div>Designer</div>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: 'flex',
            fontSize: '72px',
            color: '#f3b9b9',
            lineHeight: 1.25,
            width: '535px',
            letterSpacing: '-0.72px',
            marginTop: '150px',
          }}
        >
          Product Designer & AI-Powered Builder
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
