## Setup Cloudinary (digabung otomatis ke SETUP.md)

> 3 langkah, ±5 menit. Tier gratis: 25 kredit/bulan, cukup untuk mulai.
> Docs resmi: https://cloudinary.com/documentation/image_upload_api_reference

### 1. Ambil kredensial

1. Daftar/login di https://cloudinary.com/console
2. Di dashboard, salin **Cloud name**, **API Key**, **API Secret**.

### 2. Isi env

```bash
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx   # rahasia! server saja, tanpa NEXT_PUBLIC_
```

### 3. Coba upload

Kirim multipart ke `POST /api/media/upload` (field `file`, opsional `folder`):

```bash
curl -X POST http://localhost:3000/api/media/upload \
  -F "file=@produk.jpg" -F "folder=toko/produk"
```

Simpan `secureUrl` ke database sebagai URL gambar produk.

NOTED: batasi route ini hanya untuk penjual/admin (auth + rate-limit) —
TODO sudah ditandai di kode route. Jangan biarkan publik upload bebas.

---

## Setup Laravel (base Laravel)

> CLI menyuntik Service + Controller; 3 langkah manual di bawah wajib
> karena tidak bisa di-generate otomatis. Tanpa SDK tambahan.

### L1. Isi `.env`

```bash
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx   # rahasia! server saja
```

### L2. Tambah ke `config/services.php`

```php
'cloudinary' => [
    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
    'api_key' => env('CLOUDINARY_API_KEY'),
    'api_secret' => env('CLOUDINARY_API_SECRET'),
],
```

### L3. Daftarkan route (mis. di `routes/api.php`)

```php
use App\Http\Controllers\CloudinaryController;

Route::post('/api/media/upload', [CloudinaryController::class, 'upload']);
```

Lalu `php artisan config:clear`. Batasi hanya user terautentikasi
(middleware auth + rate-limit, TODO di controller).
