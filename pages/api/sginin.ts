import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@/app/dbconnect/connect";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectToMongo();

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "The password is too short" });
  }

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      // تحقق مما إذا كان المستخدم موجودًا
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
          expiresIn: "1d",
        });

        // إعداد بيانات المستخدم
        const userData = {
          userName: user.username,
          userId: user._id.toString(), // تأكد من تحويل _id إلى string
          email: user.email, // إضافة البريد الإلكتروني
        };

        return res.status(200).json({ userData, token }); // استخدم status 200 بدلاً من 201
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error); // إضافة سجل الأخطاء لسهولة التصحيح
    return res.status(500).json({ message: "Something went wrong" });
  }
}
