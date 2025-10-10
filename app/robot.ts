import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/','/events/*','/merchandise'],
      disallow: '/private/',
    },
    sitemap: 'https://www.esummit.juecell.com/sitemap.xml',
  }
}