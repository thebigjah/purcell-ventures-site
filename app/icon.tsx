import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: '#8B6914',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          fontWeight: 700,
          fontSize: 12,
          color: '#F5E6C8',
          letterSpacing: '0.5px',
        }}
      >
        PV
      </div>
    ),
    { ...size }
  )
}
