import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@/app/dbconnect/connect";
import Cart from "@/app/models/cart";
import jwt from "jsonwebtoken";

// تأكد من أن الدالة مُصدرة بشكل صحيح كدالة افتراضية
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectToMongo();

  const { token, product } = req.body;

  if (!token || !product) {
    return res
      .status(400)
      .json({ message: "Token and product must be provided" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    // تحقق مما إذا كانت السلة تحتوي بالفعل على المنتج
    const existingCartItem = await Cart.findOne({
      userId: userId,
      productId: product.id,
    });

    if (existingCartItem) {
      // إذا كان المنتج موجودًا، قم بتحديث الكمية
      existingCartItem.quantity += 1;
      await existingCartItem.save();

      return res.status(200).json({
        message: "Product quantity updated in cart",
        cartItem: existingCartItem,
      });
    } else {
      // إذا لم يكن موجودًا، أضف عنصرًا جديدًا
      const newCartItem = new Cart({
        userId: userId,
        productId: product.id,
        title: product.name,
        category: product.category,
        description: product.description,
        imgUrl: product.image,
        price: product.price,
        quantity: product.quantity || 1,
      });

      await newCartItem.save();

      return res.status(201).json({
        message: "Product added to cart successfully",
        cartItem: newCartItem,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Failed to add product to cart" });
  }
}
