<x-mail::message>
# Reservation Confirmed 🎉

Dear {{ $reservation->customer_name }},

Your table reservation has been confirmed. Here are your details:

<x-mail::panel>
**Reservation ID:** #RES-{{ str_pad($reservation->id, 5, '0', STR_PAD_LEFT) }}

**Table:** {{ $reservation->table->table_number ?? 'N/A' }}

**Date:** {{ \Carbon\Carbon::parse($reservation->reservation_date)->format('d F Y') }}

**Time:** {{ \Carbon\Carbon::parse($reservation->reservation_time)->format('H:i') }}

**Guests:** {{ $reservation->guests }}

**Amount Paid:** €{{ number_format($reservation->reservation_fee, 2) }}
</x-mail::panel>

@if($reservation->special_request)
**Your Special Request:** {{ $reservation->special_request }}
@endif

We look forward to welcoming you!

Thanks,
{{ config('app.name') }}
</x-mail::message>
