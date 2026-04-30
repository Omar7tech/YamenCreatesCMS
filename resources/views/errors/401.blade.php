@extends('errors::layout')

@section('title', '401 - Unauthorized')

@section('content')
<div class="error-code">401</div>
<h1>Unauthorized</h1>
<p>You need to authenticate to access this resource.</p>
<a href="/" class="btn-home">Return Home</a>
@endsection
