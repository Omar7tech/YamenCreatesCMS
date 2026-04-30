@php
  $currentRouteName = Route::currentRouteName();
@endphp




@if ($currentRouteName === 'home')

  <title>Home - Yamen Creates</title>
  <meta name="description"
    content="Yamen Creates is a strategic creative partner helping businesses turn ideas into structured brands. We combine brand strategy, marketing, and content to build clarity, drive positioning, and deliver measurable growth across Lebanon and beyond.">
  <meta property="og:title" content="Yamen Creates" />
  <meta property="og:description"
    content="A strategic creative partner helping founders and leadership teams turn ideas into structured brands, marketing systems, and digital experiences that scale." />
  <meta property="og:url" content="{{ url()->current() }}" />
  <meta property="og:image" content="{{ asset('og/home.jpg') }}" />
  <meta name="twitter:title" content="Yamen Creates" />
  <meta name="twitter:description"
    content="A strategic creative partner helping founders and leadership teams turn ideas into structured brands, marketing systems, and digital experiences that scale." />
  <meta name="twitter:image" content="{{ asset('og/home.jpg') }}" />

@elseif ($currentRouteName === 'work')

  <title>Work - Yamen Creates</title>
  <meta name="description"
    content="Explore Yamen Creates programs and portfolio across branding, marketing, and content. From YC Foundation to YC Scale, we design tailored solutions that match your business stage—building brands, optimizing growth, and delivering measurable results.">
  <meta property="og:title" content="Work - Yamen Creates" />
  <meta property="og:description"
    content="Explore branding, marketing, and content work by Yamen Creates, built to support businesses at every stage of growth." />
  <meta property="og:url" content="{{ url()->current() }}" />
  <meta property="og:image" content="{{ asset('og/work.jpg') }}" />
  <meta name="twitter:title" content="Work - Yamen Creates" />
  <meta name="twitter:description"
    content="Explore branding, marketing, and content work by Yamen Creates, built to support businesses at every stage of growth." />
  <meta name="twitter:image" content="{{ asset('og/work.jpg') }}" />

@elseif ($currentRouteName === 'contact')

  <title>Contact - Yamen Creates</title>
  <meta name="description"
    content="Get in touch with Yamen Creates to start your brand journey. Whether you need strategy, marketing, or content, our team is ready to collaborate, understand your business, and build solutions that drive clarity, positioning, and growth.">
  <meta property="og:title" content="Contact - Yamen Creates" />
  <meta property="og:description"
    content="Start your brand journey with Yamen Creates. Reach out to build strategy, marketing, and content systems that drive clarity and growth." />
  <meta property="og:url" content="{{ url()->current() }}" />
  <meta property="og:image" content="{{ asset('og/contact.jpg') }}" />
  <meta name="twitter:title" content="Contact - Yamen Creates" />
  <meta name="twitter:description"
    content="Start your brand journey with Yamen Creates. Reach out to build strategy, marketing, and content systems that drive clarity and growth." />
  <meta name="twitter:image" content="{{ asset('og/contact.jpg') }}" />
@endif