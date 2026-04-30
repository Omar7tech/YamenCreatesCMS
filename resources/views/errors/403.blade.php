@extends('errors::layout')

@section('title', '403 - Access Forbidden')

@section('content')
<div class="error-code">403</div>
<h1>Access Forbidden</h1>
<p>You don't have permission to access this resource.</p>
<a href="/" class="btn-home">Return Home</a>
@endsection
