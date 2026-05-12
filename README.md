# Management Kontrakan

Sistem manajemen kontrakan/kost berbasis web menggunakan Laravel + Inertia.js + React + Tailwind CSS.

## Tech Stack

- **Backend:** Laravel 13
- **Frontend:** React 19 + Inertia.js
- **Styling:** Tailwind CSS 4
- **Database:** MySQL
- **Authentication:** Laravel Breeze (Inertia)
- **Animasi:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts
- **PDF Export:** DomPDF
- **Excel Export:** Maatwebsite Excel

## Fitur Utama

- Multi-role: Super Admin, Admin, Penyewa
- Manajemen kontrakan, unit, penyewa, kontrak
- Tagihan & pembayaran dengan verifikasi
- Pengeluaran & laporan keuangan
- Export PDF & Excel
- Dashboard dengan chart & statistik
- Halaman publik (landing, unit, kontak)
- Responsive design (desktop, tablet, mobile)

## Cara Menjalankan

### 1. Install Dependencies

```bash
composer install
npm install
```

### 2. Copy Environment

```bash
cp .env.example .env
```

### 3. Generate Key

```bash
php artisan key:generate
```

### 4. Konfigurasi Database

Edit file `.env`:

```
DB_DATABASE=management_kontrakan
DB_USERNAME=root
DB_PASSWORD=
```

Buat database MySQL:

```sql
CREATE DATABASE management_kontrakan;
```

### 5. Jalankan Migration & Seeder

```bash
php artisan migrate --seed
```

### 6. Storage Link

```bash
php artisan storage:link
```

### 7. Jalankan Aplikasi

```bash
php artisan serve
npm run dev
```

### 8. Login

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@kontrakan.com | password |
| Admin | admin@kontrakan.com | password |
| Penyewa | penyewa@kontrakan.com | password |

## Struktur Role

- **Super Admin:** Akses penuh ke semua fitur
- **Admin:** Kelola unit, penyewa, tagihan, pembayaran, pengeluaran
- **Penyewa:** Lihat tagihan, upload bukti bayar, riwayat pembayaran
