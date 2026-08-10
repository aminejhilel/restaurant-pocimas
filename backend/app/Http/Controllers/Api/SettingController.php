<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;

class SettingController extends Controller
{
    public function index()
    {
        $setting = Setting::first();

        if (!$setting) {
            return response()->json([]);
        }

        return response()->json([
            'restaurant_name' => $setting->restaurant_name,
            'logo' => $setting->logo ? asset('storage/' . $setting->logo) : null,
            'email' => $setting->email,
            'phone' => $setting->phone,
            'address' => $setting->address,
            'opening_hours' => $setting->opening_hours,
            'reservation_fee' => $setting->reservation_fee,
            'facebook' => $setting->facebook,
            'instagram' => $setting->instagram,
        ]);
    }
}
