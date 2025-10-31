import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@/app/dbconnect/connect";
import Cart from "@/app/models/cart";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token, cartId } = req.body; // إضافة cartId هنا

  if (!token || !cartId) {
    return res
      .status(400)
      .json({ message: "Token and cartId must be provided" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    const result = await Cart.deleteOne({ _id: cartId, userId: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res
      .status(200)
      .json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Failed to remove product from cart Mohamed" });
  }
}
