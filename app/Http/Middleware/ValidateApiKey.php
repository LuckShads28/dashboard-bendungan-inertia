<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class ValidateApiKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $secretKey = request()->header('Api-Secret-Key');
        if ($secretKey !== env('API_SECRET_KEY')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        Log::debug("api key authorized");

        return $next($request);
    }
}
