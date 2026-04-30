@extends('errors::layout')

@section('title', '429 - Too Many Requests')

@section('content')
<div class="error-code">429</div>
<h1>Too Many Requests</h1>
<p>You've made too many requests. Please wait a moment and try again.</p>
<a href="/" class="btn-home">Return Home</a>
@endsection
