import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            lineHeight: 1,
          }}
        >
          P
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 