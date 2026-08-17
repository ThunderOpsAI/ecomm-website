import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generatePresignedUploadUrl } from "@/lib/r2";

const presignSchema = z.object({
  fileName: z.string().min(1),
  contentType: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = presignSchema.parse(body);

    const presignedData = await generatePresignedUploadUrl(
      validated.fileName,
      validated.contentType
    );

    return NextResponse.json({
      success: true,
      ...presignedData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Presign upload error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Error generating upload URL" },
      { status: 500 }
    );
  }
}
