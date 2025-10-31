import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@/app/dbconnect/connect"; // استيراد دالة الاتصال بقاعدة البيانات
import User from "@/app/models/user"; // استيراد نموذج المستخدم
import bcrypt from "bcryptjs"; // استيراد مكتبة bcrypt لتجزئة كلمات المرور
import jwt from "jsonwebtoken"; // استيراد مكتبة jsonwebtoken لإنشاء التوكنات

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // دالة لتنظيف المدخلات
  const sanitizeInput = (input: string) => {
    return input.replace(/<[^>]*>/g, ""); // إزالة أي تاغات HTML من المدخلات
  };

  // تحقق من نوع الطلب
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // استخرج البيانات من الجسم
  const { username, password, resetPassword, email } = req.body;

  // نظف المدخلات
  const sanitizedEmail = sanitizeInput(email || "");
  const sanitizedUsername = sanitizeInput(username || "");
  const sanitizedPassword = sanitizeInput(password || "");
  const sanitizedResetPassword = sanitizeInput(resetPassword || "");

  // تحقق من وجود البيانات المطلوبة
  if (
    !sanitizedUsername ||
    !sanitizedPassword ||
    !sanitizedResetPassword ||
    !sanitizedEmail
  ) {
    return res.status(400).json({
      message:
        "Username, password, password confirmation, and email are required",
    });
  }

  // تحقق من تطابق كلمات المرور
  if (sanitizedPassword !== sanitizedResetPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // تحقق من طول كلمة المرور
  if (sanitizedPassword.length < 8) {
    return res
      .status(400)
      .json({ message: "The password is too short (minimum 8 characters)" });
  }

  // الاتصال بقاعدة البيانات
  await connectToMongo();

  // تحقق مما إذا كان المستخدم موجودًا بالفعل
  const existingUser = await User.findOne({ username: sanitizedUsername });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  // تجزئة كلمة المرور
  const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);

  // إنشاء مستخدم جديد
  const newUser = new User({
    email: sanitizedEmail,
    username: sanitizedUsername,
    password: hashedPassword,
  });

  // حفظ المستخدم في قاعدة البيانات
  await newUser.save();

  // إنشاء توكن JWT
  const token = jwt.sign(
    { id: newUser._id.toString() },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  // إرسال الاستجابة
  return res.status(201).json({
    message: "User created successfully",
    token,
    userData: {
      userName: newUser.username,
      email: newUser.email,
      id: newUser._id.toString(),
    },
  });
}
