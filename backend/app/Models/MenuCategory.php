<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuCategory extends Model
{
    protected $guarded = [];

    public function items()
    {
        return $this->hasMany(MenuItem::class, 'category_id');
    }
}
