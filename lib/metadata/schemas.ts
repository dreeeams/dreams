export function createOrganizationSchema(locale: string, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    name: 'Dreeeams',
    url: baseUrl,
    logo: `${baseUrl}/og-image.png`,
    image: `${baseUrl}/og-image.png`,
    description: locale === 'es'
      ? 'Agencia de desarrollo web y móvil profesional especializada en React, Next.js y React Native. Creamos aplicaciones web personalizadas, apps móviles y soluciones SaaS escalables.'
      : 'Professional web and mobile development agency specializing in React, Next.js, and React Native. We create custom web applications, mobile apps, and scalable SaaS solutions.',
    email: 'info@dreeeams.com',
    telephone: '+15558920875',
    foundingDate: '2024',
    priceRange: '$$',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 37.7749,
        longitude: -122.4194,
      },
      geoRadius: '10000',
    },
    sameAs: [],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'CA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@dreeeams.com',
      availableLanguage: ['English', 'Spanish'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'es' ? 'Servicios de Desarrollo' : 'Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'es' ? 'Desarrollo Web' : 'Web Development',
            description: locale === 'es'
              ? 'Desarrollo de aplicaciones web modernas con React y Next.js'
              : 'Modern web application development with React and Next.js',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'es' ? 'Desarrollo Móvil' : 'Mobile Development',
            description: locale === 'es'
              ? 'Aplicaciones móviles nativas e híbridas con React Native'
              : 'Native and hybrid mobile applications with React Native',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'es' ? 'Diseño UI/UX' : 'UI/UX Design',
            description: locale === 'es'
              ? 'Diseño de interfaces y experiencia de usuario'
              : 'User interface and experience design',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'es' ? 'Desarrollo Backend y APIs' : 'Backend & API Development',
            description: locale === 'es'
              ? 'Desarrollo de APIs REST y GraphQL escalables'
              : 'Scalable REST and GraphQL API development',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '24',
    },
  };
}

export function createWebsiteSchema(locale: string, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dreeeams',
    url: baseUrl,
    description: locale === 'es'
      ? 'Construimos productos digitales hermosos y escalables. Aplicaciones web modernas, apps móviles y experiencias de usuario excepcionales.'
      : 'We build beautiful, scalable digital products. Modern web apps, mobile applications, and exceptional user experiences.',
    inLanguage: [locale === 'es' ? 'es-ES' : 'en-US'],
    publisher: {
      '@type': 'Organization',
      name: 'Dreeeams',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.png`,
      },
    },
  };
}
