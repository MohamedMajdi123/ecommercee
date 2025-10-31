import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@/app/dbconnect/connect";
import Cart from "@/app/models/cart";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token } = req.query; // الحصول على token من الاستعلام

  if (!token) {
    return res.status(400).json({ message: "Token must be provided" });
  }

  try {
    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
    const userId = decoded.id;

    await connectToMongo();

    // العثور على جميع عناصر السلة الخاصة بالمستخدم
    const cartItems = await Cart.find({ userId: userId });

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Failed to fetch cart items" });
  }
}
