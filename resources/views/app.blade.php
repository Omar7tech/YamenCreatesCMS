<!DOCTYPE html>
<html lang="en" @class(['dark' => ($appearance ?? 'system') == 'dark']) style="background:#2b2b2b;color:#ededed;">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#2b2b2b">
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Yamen Creates" />
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Yamen Creates ®" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="robots" content="index, follow">
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Special+Gothic+Expanded+One&display=swap"
        rel="stylesheet">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@yamencreates">
    <meta name="twitter:creator" content="@yamencreates">
    <link rel="canonical" href="{{ url()->current() }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <x-seo />

    <meta property="og:image:alt" content="Yamen Creates — Strategic Brand & Creative Partner">
    <meta name="twitter:image:alt" content="Yamen Creates — Strategic Brand & Creative Partner">
    <meta property="og:locale" content="en_US">
    <script type="application/ld+json">
      @verbatim  
                       {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Yamen Creates",
          "alternateName": ["YC", "Yamen Jurdi"],
          "url": "https://yamencreates.com/",
          "logo": "https://yamencreates.com/biglogo.jpg",
          "areaServed": ["LB", "AE", "SA"],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "info@yamencreates.com"
          },
          "sameAs": [
            "https://www.instagram.com/yamencreates",
            "https://www.linkedin.com/company/yamen-creates"
          ]
        }
    @endverbatim
  </script>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    <x-inertia::head>
        <title data-inertia>{{ config('app.name', 'YC') }}</title>
    </x-inertia::head>
    <link rel="stylesheet" href="https://unpkg.com/kursor/dist/kursor.css">
</head>

<body class="antialiased" style="background:#2b2b2b;color:#ededed;">
    <x-app-loader />
    <x-inertia::app />
</body>
<!-- <script src="https://cdn.jsdelivr.net/npm/kursor@0.0.14/dist/kursor.js"></script>
<script>
    new kursor({
        type: 1,
        removeDefaultCursor: true,
        color: '#FFFFFF'
    })
</script> -->

</html>