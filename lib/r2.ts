import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accountId = process.env.R2_ACCOUNT_ID || "placeholder_account_id";
const accessKeyId = process.env.R2_ACCESS_KEY_ID || "placeholder_access_key";
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || "placeholder_secret_key";
export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "ecomm-products";
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "https://pub-r2.example.com";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * Generates a presigned PUT URL for direct browser-to-R2 upload
 */
export async function generatePresignedUploadUrl(
  fileName: string,
  contentType: string,
  expiresInSeconds: number = 3600
): Promise<{ uploadUrl: string; publicUrl: string; key: string }> {
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const uniqueKey = `products/${Date.now()}-${sanitizedFileName}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: uniqueKey,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2Client, command, {
    expiresIn: expiresInSeconds,
  });

  const publicUrl = `${R2_PUBLIC_URL.replace(/\/$/, "")}/${uniqueKey}`;

  return {
    uploadUrl,
    publicUrl,
    key: uniqueKey,
  };
}

/**
 * Deletes an object from Cloudflare R2
 */
export async function deleteR2Object(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });

  await r2Client.send(command);
}
