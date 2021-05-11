<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StreamController extends Controller
{
    

    public function client($slug)
    {

        return view('client', compact(
            'slug'));
    }

    public function analist(Request $request)
    {
        $token = "token1";
        $slug = "samuel-gomes";

        return view('analist', compact('token', 'slug'));
    }
}
