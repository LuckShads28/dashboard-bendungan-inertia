<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>Dashboard</title>
    @viteReactRefresh
    @vite('resources/css/app.css')
    @vite('resources/js/app.tsx')
    @inertiaHead
  </head>
  <body class="dark">
    @routes()
    @inertia
  </body>
</html>
