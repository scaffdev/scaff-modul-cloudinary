import { NextResponse } from "next/server";
import { uploadImage } from "../../../../../lib/media/cloudinary";

/**
 * POST /api/media/upload — terima 1 file gambar (multipart), upload ke Cloudinary.
 *
 * NOTED:
 * - Field form WAJIB bernama "file". Folder opsional via field "folder".
 * - Secret tetap di server — browser hanya kirim file ke route ini.
 * - TODO pemilik project: tambahkan auth (hanya admin/penjual boleh upload)
 *   + rate-limit. Route publik tanpa auth = orang bisa menghabiskan kuotamu.
 *
 * Balikan: { secureUrl, publicId, width, height, format, bytes }
 */
export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Body harus multipart/form-data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Field "file" wajib diisi 1 gambar' }, { status: 400 });
  }
  const folder = form.get("folder");
  const folderStr = typeof folder === "string" && folder.trim() ? folder.trim() : "uploads";

  try {
    const result = await uploadImage(file, folderStr);
    return NextResponse.json(result);
  } catch (err) {
    // NOTED: bedakan salah user (400) vs salah server/layanan (502).
    const msg = err instanceof Error ? err.message : "Gagal upload";
    const userError = msg.startsWith("Tipe file") || msg.startsWith("Ukuran file");
    return NextResponse.json({ error: msg }, { status: userError ? 400 : 502 });
  }
}
