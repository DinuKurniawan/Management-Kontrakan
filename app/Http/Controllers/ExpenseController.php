<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $expenses = Expense::with(['category', 'creator'])
            ->when($request->search, fn ($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->when($request->category, fn ($q, $c) => $q->where('expense_category_id', $c))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard/Expenses/Index', [
            'expenses' => $expenses,
            'categories' => ExpenseCategory::all(),
            'filters' => $request->only('search', 'category'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Expenses/Form', [
            'categories' => ExpenseCategory::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'expense_category_id' => 'required|exists:expense_categories,id',
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'expense_date' => 'required|date',
            'description' => 'nullable|string',
            'proof_image' => 'nullable|image|max:2048',
        ]);

        $data['created_by'] = auth()->id();
        if ($request->hasFile('proof_image')) {
            $data['proof_image'] = $request->file('proof_image')->store('expenses', 'public');
        }

        $expense = Expense::create($data);
        ActivityLogService::log('create', $expense, "Mencatat pengeluaran: {$expense->title}");

        return redirect()->route('dashboard.expenses.index')->with('success', 'Pengeluaran berhasil dicatat.');
    }

    public function edit(Expense $expense)
    {
        return Inertia::render('Dashboard/Expenses/Form', [
            'expense' => $expense,
            'categories' => ExpenseCategory::all(),
        ]);
    }

    public function update(Request $request, Expense $expense)
    {
        $data = $request->validate([
            'expense_category_id' => 'required|exists:expense_categories,id',
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'expense_date' => 'required|date',
            'description' => 'nullable|string',
            'proof_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('proof_image')) {
            if ($expense->proof_image) Storage::disk('public')->delete($expense->proof_image);
            $data['proof_image'] = $request->file('proof_image')->store('expenses', 'public');
        }

        $expense->update($data);
        ActivityLogService::log('update', $expense, "Mengupdate pengeluaran: {$expense->title}");

        return redirect()->route('dashboard.expenses.index')->with('success', 'Pengeluaran berhasil diupdate.');
    }

    public function destroy(Expense $expense)
    {
        if ($expense->proof_image) Storage::disk('public')->delete($expense->proof_image);
        ActivityLogService::log('delete', $expense, "Menghapus pengeluaran: {$expense->title}");
        $expense->delete();
        return redirect()->route('dashboard.expenses.index')->with('success', 'Pengeluaran berhasil dihapus.');
    }
}
