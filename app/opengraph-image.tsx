import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Dreeeams - Agencia de Desarrollo Web y Móvil';
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
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Main content card with neobrutalist style */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '6px solid #FFFFFF',
            padding: '80px 100px',
            background: '#000000',
            position: 'relative',
          }}
        >
          {/* Dreeeams Logo SVG */}
          <div
            style={{
              display: 'flex',
              marginBottom: '40px',
            }}
          >
            <svg width="80" height="93" viewBox="0 0 97 114" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M47.9849 11.0323V52.6452L38.4484 47.2258C21.5161 37.5484 11.0064 19.5484 11.0064 0H4V47.6129C4 63.0968 12.9527 77.4194 27.1602 84.1936L48.1796 94.2581V52.6452L57.7161 58.0645C74.6484 67.7419 85.1581 85.7419 85.1581 105.29H92.1645V57.6774C92.1645 42.1935 83.2118 27.871 69.0043 21.0968L47.9849 11.0323Z" fill="#FFFFFF"/>
            </svg>
          </div>

          {/* Brand name */}
          <h1
            style={{
              fontSize: 76,
              fontWeight: 900,
              margin: 0,
              color: '#FFFFFF',
              letterSpacing: '0.15em',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            DREAM STUDIO
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: 32,
              margin: '30px 0 0 0',
              color: '#787878',
              textAlign: 'center',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            Desarrollo Web & Móvil
          </p>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 24,
              margin: '16px 0 0 0',
              color: '#FFFFFF',
              textAlign: 'center',
              fontWeight: 400,
              letterSpacing: '0.05em',
            }}
          >
            React • Next.js • React Native
          </p>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: '#FFFFFF',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
