<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{config('app.name')}}@yield('title')</title>

    <link rel="stylesheet" href="{{asset('css/app.css')}}" type="text/css">
</head>
<body>

    @include('inc.navbar')

    <div class="container pt-5">
        <div class="row">
            @yield('content')
        </div>
    </div>


    <script src="{{asset('js/app.js')}}" type="text/javascript"></script>
</body>
</html>
