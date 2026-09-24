/**
 * Client upload Cloudinary — disuntik Scaffdev Builder ke template Next.js.
 *
 * NOTED:
 * - File ini 100% milik modul "cloudinary". Jangan import dari kode inti template.
 * - Upload dilakukan SERVER-side via route di bawah. API Secret TIDAK PERNAH
 *   ke browser (docs melarang keras generate signature di client).
 * - Auth memakai HTTP Basic Auth (api_key:api_secret) — cara resmi paling
 *   sederhana untuk server-side, tanpa hitung timestamp/signature manual.
 *
 * Referensi resmi:
 * - Upload API   : https://cloudinary.com/documentation/image_upload_api_reference
 * - Tanda tangan : https://cloudinary.com/documentation/authentication_signatures
 */
function config(): { cloud: string; key: string; secret: string } {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !key || !secret) {
    throw new Error(
      "MISSING_ENV: isi CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY & CLOUDINARY_API_SECRET di .env.local"
    );
  }
  return { cloud, key, secret };
}

export interface UploadResult {
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/**
 * Upload 1 file gambar ke Cloudinary. Return URL aman (https) siap disimpan ke DB.
 * @param file File dari form-data (sudah divalidasi tipe di route).
 * @param folder Folder di Cloudinary, mis. "toko/produk". Default "uploads".
 */
export async function uploadImage(file: File, folder = "uploads"): Promise<UploadResult> {
  const { cloud, key, secret } = config();

  // NOTED: validasi ganda (route + sini) agar modul tetap aman walau lib
  // dipakai dari kode lain. Batas 10MB = batas aman umum tier gratis.
  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error(`Tipe file ditolak: ${file.type || "(kosong)"}. Hanya jpg/png/webp/gif.`);
  }
  if (file.size <= 0 || file.size > 10 * 1024 * 1024) {
    throw new Error("Ukuran file harus 1 byte – 10MB");
  }

  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
    method: "POST",
    // NOTED: Basic Auth = base64("api_key:api_secret"). Cara resmi yang
    // direkomendasikan docs untuk server-side (tanpa signature manual).
    headers: { Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}` },
    body: form,
  });

  if (!res.ok) throw new Error(`Cloudinary error ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
  };
  return {
    secureUrl: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    format: data.format,
    bytes: data.bytes,
  };
}
