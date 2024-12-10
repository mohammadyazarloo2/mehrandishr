import { connectMongoDB } from "@/lib/mongodb";
import Products from "@/models/products";
import Features from "@/models/features";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Received Data:", data);

    await connectMongoDB();
    const {
      name,
      title,
      description,
      category,
      brandId,
      price,
      discount,
      productId,
      barcode,
      images,
      features,
      chapters
    } = data;

    console.log("Form Data:", {
      name,
      title,
      description,
      category,
      brandId, // Check this value
      price,
      discount,
      productId,
      barcode,
      images,
      features,
      chapters
    });

    const product = await Products.create({
      name,
      title,
      description,
      category,
      brandId, // اطمینان از ارسال brandId
      price,
      discount,
      productId,
      barcode,
      images,
      chapters
    });

    console.log("Product created:", product);

    if (features && features.length > 0) {
      const featurePromises = features.map((feature) =>
        Features.create({
          productId: product._id,
          title: feature.key,
          value: feature.value,
        })
      );

      const createdFeatures = await Promise.all(featurePromises);
      console.log("Features created:", createdFeatures);
    }

    return NextResponse.json(
      { message: "محصول با موفقیت ایجاد شد" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in product creation:", error.message);
    return NextResponse.json(
      { message: "خطا در ایجاد محصول", error: error.message },
      { status: 500 }
    );
  }
}

