<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice #{{ $payment->id }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { margin: 0; color: #1f2937; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 8px 12px; border: 1px solid #e5e7eb; text-align: left; }
        th { background: #f3f4f6; }
        .total { font-weight: bold; font-size: 14px; }
        .footer { margin-top: 40px; text-align: center; color: #6b7280; }
    </style>
</head>
<body>
    <div class="header">
        <h1>INVOICE PEMBAYARAN</h1>
        <p>Management Kontrakan</p>
    </div>

    <table>
        <tr><th>No. Invoice</th><td>#{{ $payment->id }}</td></tr>
        <tr><th>Tanggal Bayar</th><td>{{ $payment->payment_date->format('d/m/Y') }}</td></tr>
        <tr><th>Penyewa</th><td>{{ $payment->bill->lease->tenant->user->name }}</td></tr>
        <tr><th>Unit</th><td>{{ $payment->bill->lease->unit->unit_number }}</td></tr>
        <tr><th>Periode</th><td>{{ $payment->bill->billing_month }}</td></tr>
        <tr><th>Metode</th><td>{{ strtoupper($payment->payment_method) }}</td></tr>
        <tr><th>Jumlah</th><td class="total">Rp {{ number_format($payment->amount, 0, ',', '.') }}</td></tr>
        <tr><th>Status</th><td>{{ ucfirst($payment->status) }}</td></tr>
    </table>

    <div class="footer">
        <p>Terima kasih atas pembayaran Anda.</p>
    </div>
</body>
</html>
