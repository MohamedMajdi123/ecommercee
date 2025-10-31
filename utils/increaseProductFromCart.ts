// increaseProductQuantity.ts
export const increaseProductQuantity = async (
  token: string,
  cartId: string
) => {
  const response = await fetch("/api/cart/increase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, cartId }),
  });

  if (!response.ok) {
    throw new Error("Failed to increase product quantity");
  }

  const data = await response.json();
  return data;
};
