<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\ExpenseCategory;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Listrik Umum', 'description' => 'Biaya listrik area umum'],
            ['name' => 'Air', 'description' => 'Biaya air bersih'],
            ['name' => 'Perbaikan', 'description' => 'Biaya perbaikan dan maintenance'],
            ['name' => 'Kebersihan', 'description' => 'Biaya kebersihan dan sampah'],
            ['name' => 'Keamanan', 'description' => 'Biaya keamanan dan satpam'],
            ['name' => 'Internet', 'description' => 'Biaya internet/WiFi'],
            ['name' => 'Lainnya', 'description' => 'Pengeluaran lain-lain'],
        ];

        foreach ($categories as $cat) {
            ExpenseCategory::create($cat);
        }

        $expenses = [
            ['expense_category_id' => 1, 'title' => 'Listrik area parkir', 'amount' => 350000, 'expense_date' => Carbon::now()->subDays(20)],
            ['expense_category_id' => 2, 'title' => 'Tagihan air PDAM', 'amount' => 500000, 'expense_date' => Carbon::now()->subDays(15)],
            ['expense_category_id' => 3, 'title' => 'Perbaikan atap unit A2', 'amount' => 1200000, 'expense_date' => Carbon::now()->subDays(10)],
            ['expense_category_id' => 4, 'title' => 'Gaji petugas kebersihan', 'amount' => 800000, 'expense_date' => Carbon::now()->subDays(5)],
            ['expense_category_id' => 6, 'title' => 'Tagihan WiFi bulanan', 'amount' => 450000, 'expense_date' => Carbon::now()->subDays(3)],
        ];

        foreach ($expenses as $exp) {
            Expense::create(array_merge($exp, ['created_by' => 1]));
        }
    }
}
