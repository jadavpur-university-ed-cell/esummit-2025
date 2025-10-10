import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://esummit.juecell.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://esummit.juecell.com/events',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.79,
    },
    {
      url: 'https://esummit.juecell.com/merchandise',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://esummit.juecell.com/events/launchx',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.59,
    },
    {
        url: 'https://esummit.juecell.com/events/hacknpitch',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.58,
    },
    {
        url: 'https://esummit.juecell.com/events/dizmart',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.57,
      },
      {
        url: 'https://esummit.juecell.com/events/corporateclash',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.56,
      },
  ]
}