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
