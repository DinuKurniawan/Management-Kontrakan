<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Tahunan {{ $year }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { margin: 0; color: #1f2937; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 8px 12px; border: 1px solid #e5e7eb; text-align: left; }
        th { background: #f3f4f6; }
        .text-right { text-align: right; }
        .total-row { font-weight: bold; background: #f9fafb; }
    </style>
</head>
<body>
    <div class="header">
        <h1>LAPORAN KEUANGAN TAHUNAN</h1>
        <p>Management Kontrakan - Tahun {{ $year }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Bulan</th>
                <th class="text-right">Pendapatan</th>
                <th class="text-right">Pengeluaran</th>
                <th class="text-right">Laba Bersih</th>
            </tr>
        </thead>
        <tbody>
            @php $totalIncome = 0; $totalExpense = 0; @endphp
            @foreach($monthlyData as $data)
                @php $totalIncome += $data['income']; $totalExpense += $data['expense']; @endphp
                <tr>
                    <td>{{ $data['month'] }}</td>
                    <td class="text-right">Rp {{ number_format($data['income'], 0, ',', '.') }}</td>
                    <td class="text-right">Rp {{ number_format($data['expense'], 0, ',', '.') }}</td>
                    <td class="text-right">Rp {{ number_format($data['profit'], 0, ',', '.') }}</td>
                </tr>
            @endforeach
            <tr class="total-row">
                <td>TOTAL</td>
                <td class="text-right">Rp {{ number_format($totalIncome, 0, ',', '.') }}</td>
                <td class="text-right">Rp {{ number_format($totalExpense, 0, ',', '.') }}</td>
                <td class="text-right">Rp {{ number_format($totalIncome - $totalExpense, 0, ',', '.') }}</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
