# scaff-modul-cloudinary

Modul upload gambar **Cloudinary** untuk
[Scaffdev](https://scaffdev.vercel.app) Builder.
Disuntik via `scaff ... --with=cloudinary` (CLI 0.2.0+).

| Framework | Status | Isi |
|---|---|---|
| Next.js | ✅ v1.0.0 | Client upload (Basic Auth server-side) + route multipart |
| Laravel | ✅ v1.0.0 | Service + Controller (HTTP client) |

## Struktur

```
scaff-modul-cloudinary/
├── scaff.integration.json   ← manifest (satu-satunya yang dibaca CLI)
├── SETUP-FRAGMENT.md        ← digabung ke SETUP.md hasil racikan
├── REMOVE.md                ← panduan copot
├── nextjs/
│   ├── lib/media/cloudinary.ts
│   └── app/api/media/upload/route.ts
└── laravel/                 ← sumber untuk base Laravel
    ├── app/Services/CloudinaryService.php
    └── app/Http/Controllers/CloudinaryController.php
```

## Env (WAJIB didaftarkan dulu di admin Scaffdev → tabel `integrasi`)

> Tambahkan via admin: kode `cloudinary`, kategori `other`, env di bawah ini.

| Key | Keterangan |
|---|---|
| `CLOUDINARY_CLOUD_NAME` | Cloud name (boleh publik) |
| `CLOUDINARY_API_KEY` | API Key (server saja) |
| `CLOUDINARY_API_SECRET` | API Secret (rahasia, server saja) |

## Validasi lokal (sebelum push)

```bash
scaffdev validate-module .
```

## Docs resmi yang dirujuk kode

- Upload API: https://cloudinary.com/documentation/image_upload_api_reference
- Signatures: https://cloudinary.com/documentation/authentication_signatures
