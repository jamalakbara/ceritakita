import { S3Client, GetObjectCommand, NoSuchKey } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const key = path.join("/");

  try {
    const { Body, ContentType, ContentLength } = await R2.send(
      new GetObjectCommand({ Bucket: process.env.R2_BUCKET_NAME!, Key: key })
    );

    if (!Body) return new NextResponse("Not found", { status: 404 });

    const bytes = await (Body as import("@smithy/types").SdkStreamMixin).transformToByteArray();

    return new NextResponse(bytes, {
      headers: {
        "Content-Type": ContentType ?? "application/octet-stream",
        ...(ContentLength ? { "Content-Length": String(ContentLength) } : {}),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    if (err instanceof NoSuchKey) return new NextResponse("Not found", { status: 404 });
    console.error("[media proxy]", err);
    return new NextResponse("Error", { status: 500 });
  }
}
