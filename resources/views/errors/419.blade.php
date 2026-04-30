@extends('errors::layout')

@section('title', '419 - Session Expired')

@section('content')
<div class="error-code">419</div>
<h1>Session Expired</h1>
<p>Your session has expired. Please refresh the page and try again.</p>
<a href="javascript:location.reload()" class="btn-home">Refresh Page</a>
@endsection
