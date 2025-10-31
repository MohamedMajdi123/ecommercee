import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@/app/dbconnect/connect"; // استدعاء دالة الاتصال
import Product from "@/app/models/product"; // استدعاء نموذج المنتج

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToMongo(); // التحقق من الاتصال بقاعدة البيانات
    const products = await Product.find({}); // جلب جميع المنتجات
    return res.status(200).json(products); // إرجاع البيانات
  } catch (error) {
    console.error("فشل جلب المنتجات:", error);
    return res.status(500).json({ message: "فشل في جلب المنتجات" });
  }
}