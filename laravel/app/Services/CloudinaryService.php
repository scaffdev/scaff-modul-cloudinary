<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;

/**
 * Service upload Cloudinary — STAGED untuk dukungan Laravel (aktif di v1.1.0).
 *
 * NOTED:
 * - File ini BELUM disuntik CLI (manifest v1.0.0 frameworks: ["nextjs"]).
 * - Auth Basic (api_key:api_secret) sesuai anjuran docs untuk server-side.
 *   Ref: https://cloudinary.com/documentation/image_upload_api_reference
 */
class CloudinaryService
{
    protected array $allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    public function upload(UploadedFile $file, string $folder = 'uploads'): array
    {
        $cloud = config('services.cloudinary.cloud_name');
        $key = config('services.cloudinary.api_key');
        $secret = config('services.cloudinary.api_secret');
        abort_if(empty($cloud) || empty($key) || empty($secret), 500, 'Isi CLOUDINARY_* di .env');

        // NOTED: validasi di service (bukan hanya controller) agar aman
        // dipakai dari mana pun. Batas 10MB.
        abort_if(! in_array($file->getMimeType(), $this->allowed, true), 422, 'Hanya jpg/png/webp/gif.');
        abort_if($file->getSize() === 0 || $file->getSize() > 10 * 1024 * 1024, 422, 'Ukuran file 1 byte – 10MB.');

        $res = Http::withBasicAuth($key, $secret)
            ->attach('file', file_get_contents($file->getRealPath()), $file->getClientOriginalName())
            ->post("https://api.cloudinary.com/v1_1/{$cloud}/image/upload", ['folder' => $folder]);

        $data = $res->throw()->json();

        return [
            'secureUrl' => $data['secure_url'],
            'publicId' => $data['public_id'],
            'width' => $data['width'],
            'height' => $data['height'],
            'format' => $data['format'],
            'bytes' => $data['bytes'],
        ];
    }
}
