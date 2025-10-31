// deleteProductFromCart.ts
export const deleteProductFromCart = async (token: string, cartId: string) => {
  const response = await fetch("/api/cart/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, cartId }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete product from cart");
  }

  const data = await response.json();
  return data;
};
