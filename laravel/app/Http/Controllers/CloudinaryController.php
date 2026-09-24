<?php

namespace App\Http\Controllers;

use App\Services\CloudinaryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Controller upload — STAGED untuk dukungan Laravel (aktif di v1.1.0).
 *
 * NOTED — daftarkan route manual saat v1.1.0 rilis:
 *   Route::post('/api/media/upload', [CloudinaryController::class, 'upload']);
 * TODO pemilik project: batasi hanya user terautentikasi (mis. middleware auth)
 * + rate-limit agar kuota tidak dihabiskan publik.
 */
class CloudinaryController extends Controller
{
    public function __construct(protected CloudinaryService $cloudinary) {}

    /** POST /api/media/upload (multipart, field "file"). */
    public function upload(Request $request): JsonResponse
    {
        $data = $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,webp,gif|max:10240',
            'folder' => 'nullable|string|max:100',
        ]);

        return response()->json(
            $this->cloudinary->upload($data['file'], $data['folder'] ?? 'uploads')
        );
    }
}
