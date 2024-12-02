import { connectMongoDB } from "@/lib/mongodb";
import Features from "@/models/features";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
      await connectMongoDB();
      const data = await req.json();
      const { productId, features } = data;
  
      // حذف ویژگی‌های قبلی محصول
      await Features.deleteMany({ productId });
  
      // فقط ویژگی‌های معتبر رو ذخیره می‌کنیم
      const validFeatures = features.filter(feature => 
        feature.title?.trim() && feature.value?.trim()
      );
  
      if (validFeatures.length > 0) {
        const updatedFeatures = await Features.insertMany(
          validFeatures.map(feature => ({
            title: feature.title,
            value: feature.value,
            productId
          }))
        );
  
        return NextResponse.json({
          success: true,
          message: "Features updated successfully",
          features: updatedFeatures
        });
      }
  
      return NextResponse.json({
        success: true,
        message: "No valid features to update",
        features: []
      });
  
    } catch (error) {
      console.log("Error updating features:", error);
      return NextResponse.json({
        success: false,
        error: error.message
      });
    }
  }