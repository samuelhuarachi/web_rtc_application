<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/client.css') }}">
    <title>Cliente</title>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-3">
                <h1>Cliente</h1>
            </div>
            <div class="col-md-12 mb-3">
                <div class="workspace">
                    <video id="clientSideAnalistVideo" playsinline autoplay></video>
                </div>
            </div>
        </div>
    </div>

    
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

    <script>
    const slug = '{{ $slug }}'
    const BASEURL = '{{ env("NODEAPI") }}'
    const token = 'token_client_1';
    </script>

    <script src="{{ asset('js/peer_client.js') }}"></script>
</body>
</html>