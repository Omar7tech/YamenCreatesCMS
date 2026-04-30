@extends('errors::layout')

@section('title', '404 - Page Not Found')

@section('styles')
.error-code {
    font-weight: 300;
    letter-spacing: 0.05em;
}

.tagline {
    font-size: clamp(0.875rem, 2vw, 1rem);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 2rem;
    font-weight: 500;
}

h1 {
    font-weight: 600;
    letter-spacing: -0.02em;
}

p {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

.divider {
    width: 60px;
    height: 1px;
    background: rgba(237, 237, 237, 0.3);
    margin: 2rem auto;
}

.nav-links {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin-top: 3rem;
    flex-wrap: wrap;
}

.nav-link {
    color: #ededed;
    text-decoration: none;
    font-size: 0.9375rem;
    position: relative;
    padding-bottom: 0.25rem;
    transition: color 0.3s ease;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #ededed;
    transition: width 0.3s ease;
}

.nav-link:hover {
    color: #ffffff;
}

.nav-link:hover::after {
    width: 100%;
}

@media (max-width: 640px) {
    .tagline {
        margin-bottom: 1.5rem;
    }

    .divider {
        margin: 1.5rem auto;
    }

    .nav-links {
        gap: 1.5rem;
        margin-top: 2rem;
    }
}
@endsection

@section('content')
<div class="error-code">404</div>

<div class="tagline">Page Not Found</div>

<h1>Every Great Brand Has a Story.<br>This Page Isn't Part of Ours.</h1>

<div class="divider"></div>

<p>The page you're looking for doesn't exist. Perhaps you've stumbled upon a URL that's yet to be built, or maybe it's been retired to make way for something better.</p>

<div class="nav-links">
    <a href="/" class="nav-link">Home</a>
    <a href="/#work" class="nav-link">Work</a>
    <a href="/#about" class="nav-link">About</a>
    <a href="/#contact" class="nav-link">Contact</a>
</div>
@endsection
