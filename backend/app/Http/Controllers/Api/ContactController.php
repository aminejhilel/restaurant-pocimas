<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:30',
            'message' => 'required|string|max:2000',
        ]);

        $message = ContactMessage::create($request->only('name', 'email', 'phone', 'message'));

        return response()->json([
            'message' => 'Your message has been received. We will contact you shortly.',
        ], 201);
    }
}
