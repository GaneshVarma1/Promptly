import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard/account/'],
    },
    sitemap: 'https://beta.promptly.diy/sitemap.xml',
  }
} 