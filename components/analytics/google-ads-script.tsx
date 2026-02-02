'use client';

import Script from 'next/script';

interface GoogleAdsScriptProps {
  conversionId?: string;
}

export default function GoogleAdsScript({ conversionId }: GoogleAdsScriptProps) {
  // Only load in production or if NEXT_PUBLIC_GOOGLE_ADS_ID is set
  const adsId = conversionId || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  if (!adsId) {
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Ads */}
      <Script
        id="google-ads-gtag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
      />
      <Script
        id="google-ads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${adsId}');
          `,
        }}
      />
    </>
  );
}
