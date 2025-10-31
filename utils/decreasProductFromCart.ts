// decreaseProductQuantity.ts
export const decreaseProductQuantity = async (
  token: string,
  cartId: string
) => {
  const response = await fetch("/api/cart/decrease", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, cartId }),
  });

  if (!response.ok) {
    throw new Error("Failed to decrease product quantity");
  }

  const data = await response.json();
  return data;
};
