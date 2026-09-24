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

Modul ini v1.0.0 mendukung Next.js saja. File `laravel/` berstatus STAGED
(belum disuntik CLI) sehingga tidak ada yang perlu dicopot.
Berlaku mulai v1.1.0 — panduan section B akan ditambahkan saat itu.
