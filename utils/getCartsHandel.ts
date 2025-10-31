export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
}

export const getCartItems = async (token: string): Promise<CartItem[]> => {
  try {
    const response = await fetch(`/api/cart/get?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }

    const data = await response.json();

    // تحويل البيانات إلى CartItem
    const formattedCartItems: CartItem[] = data.map((item: any) => ({
      cartId: item._id, // Assuming _id is the cart id from the database
      id: item.productId, // Assuming productId is part of your cart item
      name: item.title,
      category: item.category,
      price: item.price,
      image: item.imgUrl,
      description: item.description,
      quantity: item.quantity,
    }));

    return formattedCartItems;
  } catch (error) {
    console.error(error);
    return []; // إعادة مصفوفة فارغة في حالة الخطأ
  }
};
