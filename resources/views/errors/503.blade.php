@extends('errors::layout')

@section('title', '503 - Under Maintenance')

@section('styles')
.loading-dots {
    display: inline-flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

.dot {
    width: 12px;
    height: 12px;
    background: #ededed;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
    animation-delay: -0.32s;
}

.dot:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes bounce {
    0%, 80%, 100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
}
@endsection

@section('content')
<div class="error-code">503</div>
<h1>Under Maintenance</h1>
<p>We're currently performing maintenance. Check back soon.</p>
<div class="loading-dots">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
</div>
@endsection
