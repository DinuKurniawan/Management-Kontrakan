<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lease_id')->constrained()->cascadeOnDelete();
            $table->string('billing_month'); // format: 2024-01
            $table->decimal('rent_amount', 12, 2)->default(0);
            $table->decimal('electricity_amount', 12, 2)->default(0);
            $table->decimal('water_amount', 12, 2)->default(0);
            $table->decimal('cleaning_amount', 12, 2)->default(0);
            $table->decimal('penalty_amount', 12, 2)->default(0);
            $table->decimal('total_amount', 12, 2)->default(0);
            $table->date('due_date');
            $table->enum('status', ['unpaid', 'pending_verification', 'paid', 'overdue'])->default('unpaid');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};
