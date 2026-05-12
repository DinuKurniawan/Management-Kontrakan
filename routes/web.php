<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KontrakanController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\LeaseController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PasswordResetRequestController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Tenant\TenantDashboardController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [PublicController::class, 'landing'])->name('landing');
Route::get('/units', [PublicController::class, 'units'])->name('public.units');
Route::get('/units/{unit}', [PublicController::class, 'unitDetail'])->name('public.units.show');
Route::get('/about', [PublicController::class, 'about'])->name('public.about');
Route::get('/contact', [PublicController::class, 'contact'])->name('public.contact');
Route::post('/contact', [ContactController::class, 'store'])->name('public.contact.store');

// Auth routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/forgot-password', [ForgotPasswordController::class, 'show'])->name('password.request');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'store'])->name('password.request.store');
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

// Super Admin routes
Route::middleware(['auth', 'role:super_admin'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::resource('kontrakan', KontrakanController::class);
    Route::resource('units', UnitController::class);
    Route::resource('facilities', FacilityController::class);
    Route::resource('tenants', TenantController::class);
    Route::resource('leases', LeaseController::class);
    Route::put('leases/{lease}/status', [LeaseController::class, 'updateStatus'])->name('leases.status');
    Route::resource('bills', BillController::class);
    Route::post('bills/generate', [BillController::class, 'generate'])->name('bills.generate');
    Route::resource('payments', PaymentController::class);
    Route::put('payments/{payment}/verify', [PaymentController::class, 'verify'])->name('payments.verify');
    Route::resource('expenses', ExpenseController::class);
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('reports/export/pdf', [ReportController::class, 'exportPdf'])->name('reports.export.pdf');
    Route::get('reports/export/excel', [ReportController::class, 'exportExcel'])->name('reports.export.excel');
    Route::resource('users', UserController::class);
    Route::get('reset-requests', [PasswordResetRequestController::class, 'index'])->name('reset-requests.index');
    Route::put('reset-requests/{passwordResetRequest}', [PasswordResetRequestController::class, 'handle'])->name('reset-requests.handle');
});

// Admin routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('units', UnitController::class)->names('units');
    Route::resource('tenants', TenantController::class)->names('tenants');
    Route::resource('leases', LeaseController::class)->names('leases');
    Route::put('leases/{lease}/status', [LeaseController::class, 'updateStatus'])->name('leases.status');
    Route::resource('bills', BillController::class)->names('bills');
    Route::post('bills/generate', [BillController::class, 'generate'])->name('bills.generate');
    Route::resource('payments', PaymentController::class)->names('payments');
    Route::put('payments/{payment}/verify', [PaymentController::class, 'verify'])->name('payments.verify');
    Route::resource('expenses', ExpenseController::class)->names('expenses');
    Route::get('reset-requests', [PasswordResetRequestController::class, 'index'])->name('reset-requests.index');
    Route::put('reset-requests/{passwordResetRequest}', [PasswordResetRequestController::class, 'handle'])->name('reset-requests.handle');
});

// Tenant routes
Route::middleware(['auth', 'role:penyewa'])->prefix('tenant')->name('tenant.')->group(function () {
    Route::get('/dashboard', [TenantDashboardController::class, 'index'])->name('dashboard');
    Route::get('/bills', [TenantDashboardController::class, 'bills'])->name('bills');
    Route::get('/bills/{bill}', [TenantDashboardController::class, 'billDetail'])->name('bills.show');
    Route::post('/bills/{bill}/pay', [TenantDashboardController::class, 'submitPayment'])->name('bills.pay');
    Route::get('/payments', [TenantDashboardController::class, 'payments'])->name('payments');
    Route::get('/payments/{payment}/invoice', [TenantDashboardController::class, 'invoice'])->name('payments.invoice');
    Route::get('/profile', [TenantDashboardController::class, 'profile'])->name('profile');
    Route::put('/profile', [TenantDashboardController::class, 'updateProfile'])->name('profile.update');
});
