import { connectMongoDB } from "@/lib/mongodb";
import Products from "@/models/products";
import Features from "@/models/features";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      const { name, title, description, category, price, discount, productId, barcode, images, features } = await req.json();
      await connectMongoDB();

      // ایجاد محصول جدید
      const product = await Products.create({
        name,
        title,
        description,
        category,
        price,
        discount,
        productId,
        barcode,
        images
      });

      // ایجاد ویژگی‌های محصول
      const featurePromises = features.map(feature => 
        Features.create({
          productId: product._id,
          title: feature.key,
          value: feature.value
        })
      );
    
      const createdFeatures = await Promise.all(featurePromises);
    
      // اضافه کردن شناسه‌های ویژگی‌ها به محصول
      product.features = createdFeatures.map(feature => feature._id);
      await product.save();

      return NextResponse.json({ message: "محصول با موفقیت ایجاد شد" }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "خطا در ایجاد محصول" },
        { status: 500 }
      );
    }
}