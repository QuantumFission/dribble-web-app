import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const { paths } = await request.json();

  if (!paths) {
    return NextResponse.json(
      { message: "Image path is required" },
      { status: 400 }
    );
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [
        {
          width: 2000,
          height: 1504,
          crop: "scale",
        },
      ],
    };
    const cloudinaryPromises = paths.map((path: string) => {
      return new Promise<string>((resolve, reject) => {
        try {
          cloudinary.uploader.upload(
            path,
            options,
            (error: any, result: any) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.url);
              }
            }
          );
        } catch (error) {
          reject(error);
        }
      });
    });

    const results = await Promise.all(cloudinaryPromises);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
