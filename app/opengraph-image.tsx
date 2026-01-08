import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Dream Studio - Digital Product Development';
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
          background: '#FF6B35',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '8px solid black',
            padding: '60px 80px',
            background: 'white',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              margin: 0,
              color: 'black',
              letterSpacing: '0.1em',
              textAlign: 'center',
            }}
          >
            DREAM STUDIO
          </h1>
          <p
            style={{
              fontSize: 32,
              margin: '20px 0 0 0',
              color: '#666',
              textAlign: 'center',
            }}
          >
            Building Digital Experiences
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
