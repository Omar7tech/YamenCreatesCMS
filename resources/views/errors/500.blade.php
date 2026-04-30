@extends('errors::layout')

@section('title', '500 - Server Error')

@section('styles')
.error-code {
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}
@endsection

@section('content')
<div class="error-code">500</div>
<h1>Server Error</h1>
<p>Something went wrong on our end. We're working to fix it.</p>
<a href="/" class="btn-home">Return Home</a>
@endsection
