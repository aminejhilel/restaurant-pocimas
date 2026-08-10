<x-mail::message>
# Reservation Cancelled

Dear {{ $reservation->customer_name }},

Your reservation has been cancelled. Here are the details of the cancelled reservation:

<x-mail::panel>
**Reservation ID:** #RES-{{ str_pad($reservation->id, 5, '0', STR_PAD_LEFT) }}

**Table:** {{ $reservation->table->table_number ?? 'N/A' }}

**Date:** {{ \Carbon\Carbon::parse($reservation->reservation_date)->format('d F Y') }}

**Time:** {{ \Carbon\Carbon::parse($reservation->reservation_time)->format('H:i') }}
</x-mail::panel>

If you believe this is an error or would like to make a new reservation, please visit our website.

Thanks,
{{ config('app.name') }}
</x-mail::message>
