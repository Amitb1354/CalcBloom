import { useEffect } from 'react'

const BASE_URL = 'https://calcbloom1.vercel.app'
const OG_IMAGE = `${BASE_URL}/og-image.png`

export function useSEO({ title, description, path, structuredData }) {
  useEffect(() => {
    // Title
    document.title = title

    // Description
    let meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${BASE_URL}${path}`

    // OG tags
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:url': `${BASE_URL}${path}`,
      'og:image': OG_IMAGE,
    }
    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    })

    // Twitter tags
    const twitterTags = {
      'twitter:title': title,
      'twitter:description': description,
      'twitter:url': `${BASE_URL}${path}`,
      'twitter:image': OG_IMAGE,
    }
    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    })

    // Structured Data
    if (structuredData) {
      let sd = document.getElementById('page-structured-data')
      if (!sd) {
        sd = document.createElement('script')
        sd.id = 'page-structured-data'
        sd.type = 'application/ld+json'
        document.head.appendChild(sd)
      }
      sd.textContent = JSON.stringify(structuredData)
    }

    return () => {
      const sd = document.getElementById('page-structured-data')
      if (sd) sd.remove()
    }
  }, [title, description, path, structuredData])
}
