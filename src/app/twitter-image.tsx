import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export const alt = 'Promptly - Professional AI Prompt Engineering Platform'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1da1f2 0%, #0ea5e9 50%, #3b82f6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
        />
        
        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            Promptly
          </div>
          
          {/* Tagline */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '30px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              maxWidth: '800px',
              lineHeight: 1.2,
            }}
          >
            Professional AI Prompt Engineering Platform
          </div>
          
          {/* Description */}
          <div
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '40px',
              maxWidth: '600px',
              lineHeight: 1.4,
            }}
          >
            Enterprise-grade tools for systematic prompt development, testing, and optimization
          </div>
          
          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '16px',
                color: 'white',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Prompt Development
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '16px',
                color: 'white',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Analytics
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '16px',
                color: 'white',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Collaboration
            </div>
          </div>
        </div>
        
        {/* Bottom Text */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.8)',
            fontWeight: '500',
          }}
        >
          beta.promptly.diy
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 