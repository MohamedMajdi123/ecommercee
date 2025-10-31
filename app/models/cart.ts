import mongoose, { Document, Schema } from 'mongoose';

// تعريف واجهة ICart
interface ICart extends Document {
  userId: string;
  productId: number;  // يتوافق مع id في Product
  title: string;
  category: string;
  description: string;
  imgUrl: string;
  price: number;
  quantity: number;
}

// تحقق من وجود النموذج مسبقًا
const cartSchema = new Schema<ICart>({
  userId: { type: String, required: true },
  productId: { type: Number, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
}, {
  timestamps: true,
});

// استخدام mongoose.models لتجنب الخطأ
const Cart = mongoose.models.Cart || mongoose.model<ICart>('Cart', cartSchema);

export default Cart;