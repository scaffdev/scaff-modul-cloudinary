# Cara mencopot Cloudinary

> Dibutuhkan bila kamu ganti media storage lain (mis. via Scaffdev Builder).
> Estimasi: ±5 menit. Ikuti berurutan — jangan loncat.

## 0. Aturan emas (baca dulu!)

- Hapus **HANYA** file di bagian 1. File lain **JANGAN PERNAH** dihapus.
- Kalau ragu satu file, BERHENTI dan tanya pembuat template.

---

## A. Template Next.js

### A.1. Hapus file (aman — tidak dipakai kode lain)

- `lib/media/cloudinary.ts` — client upload.
- `app/api/media/upload/route.ts` — route terima file.

```bash
rm lib/media/cloudinary.ts "app/api/media/upload/route.ts"
```

### A.2. Hapus env (dari `.env.local`)

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Hapus barisnya, jangan dikosongkan saja.

### A.3. Bersihkan dependency

Tidak ada dependency tambahan (modul ini memakai `fetch` bawaan Node).

### A.4. Verifikasi (wajib lolos semua)

```bash
npm run build
```

```bash
grep -ri "cloudinary" app lib components
```

- Build harus sukses.
- Grep harus menghasilkan **0 baris**. Bila masih ada sisa (mis. `<img>`
  memakai URL Cloudinary itu TIDAK masalah — yang harus 0 adalah KODE
  upload-nya), hapus pemakaiannya, lalu build ulang.

### A.5. Yang JANGAN dihapus

- Data URL gambar yang sudah tersimpan di database (tetap jalan walau modul dicopot).
- `package.json`, `.env.local` (cukup hapus baris env-nya), layout, config.

---

## B. Template Laravel

### B.1. Hapus file (aman — tidak dipakai kode lain)

- `app/Services/CloudinaryService.php` — client upload.
- `app/Http/Controllers/CloudinaryController.php` — route terima file.

```bash
rm "app/Services/CloudinaryService.php" "app/Http/Controllers/CloudinaryController.php"
```

### B.2. Hapus env (dari `.env`)

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Hapus barisnya, jangan dikosongkan saja.

### B.3. Bersihkan dependency

Tidak ada dependency tambahan (modul ini memakai HTTP client Laravel).

### B.4. Verifikasi (wajib lolos semua)

```bash
composer install --no-dev
php artisan config:clear
```

```bash
grep -ri "cloudinary" app routes resources config
```

- Install harus sukses tanpa error.
- Grep harus menghasilkan **0 baris**. (URL gambar di database TIDAK
  masalah — yang harus 0 adalah KODE upload-nya.)
- Hapus juga blok `cloudinary` di `config/services.php` bila kamu menambahkannya.

### B.5. Yang JANGAN dihapus (Laravel)

- Data URL gambar di database (tetap jalan walau modul dicopot).
- `config/services.php` itu sendiri (cukup hapus blok `cloudinary`-nya),
  `composer.json`, `.env` (cukup hapus baris env-nya).
