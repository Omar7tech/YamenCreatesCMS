<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#2b2b2b">
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Special+Gothic+Expanded+One&display=swap" rel="stylesheet">
    <title>@yield('title') | Yamen Creates</title>
    @yield('head')
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: #2b2b2b;
            color: #ededed;
            font-family: 'Bricolage Grotesque', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 1rem;
            overflow: hidden;
        }

        .error-container {
            text-align: center;
            max-width: 600px;
            width: 100%;
            position: relative;
            z-index: 10;
        }

        .error-code {
            font-family: 'Special Gothic Expanded One', sans-serif;
            font-size: clamp(6rem, 20vw, 12rem);
            line-height: 1;
            color: #ededed;
            margin-bottom: 1rem;
            text-shadow: 0 0 40px rgba(237, 237, 237, 0.3);
        }

        h1 {
            font-size: clamp(1.5rem, 5vw, 2.5rem);
            font-weight: 700;
            margin-bottom: 1rem;
            color: #ededed;
        }

        p {
            font-size: clamp(1rem, 3vw, 1.25rem);
            line-height: 1.6;
            margin-bottom: 2rem;
            color: #b8b8b8;
        }

        .btn-home {
            display: inline-block;
            padding: 1rem 2.5rem;
            background: #ededed;
            color: #2b2b2b;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.125rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(237, 237, 237, 0.2);
        }

        .btn-home:hover {
            background: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(237, 237, 237, 0.3);
        }

        .background-pattern {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.03;
            z-index: 1;
            background-image:
                repeating-linear-gradient(0deg, #ededed 0px, #ededed 1px, transparent 1px, transparent 40px),
                repeating-linear-gradient(90deg, #ededed 0px, #ededed 1px, transparent 1px, transparent 40px);
        }

        @media (max-width: 640px) {
            .error-code {
                margin-bottom: 0.5rem;
            }

            h1 {
                margin-bottom: 0.75rem;
            }

            p {
                margin-bottom: 1.5rem;
            }

            .btn-home {
                padding: 0.875rem 2rem;
                font-size: 1rem;
            }
        }

        @yield('styles')
    </style>
</head>

<body>
    <div class="background-pattern"></div>
    <div class="error-container">
        @yield('content')
    </div>
    @yield('scripts')
</body>

</html>
