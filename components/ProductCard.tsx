"use client";

import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Product } from "@/types/index";
import { useCart } from "@/contexts/CartContext";
import { getCookie } from "@/utils/cookies";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const token = getCookie("token");
  const [message, setMessage] = useState<string | null>(null); // تعريف setMessage

  const handleAddToCart = async () => {
    const res = await fetch("/api/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        product,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Product Added To Cart Successfully");
      console.log(data);
      addToCart(product, data.cartItem._id); // أضف المنتج مع الكمية
      setMessage(null); // تكوين الرسالة كـ null إذا كانت الإضافة ناجحة
    } else {
      setMessage(data.message || "Something went wrong!");
    }
  };

  return (
    <Card className="h-100 shadow-sm product-card border-0">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{product.name}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {product.description}
        </Card.Text>
        {message && <div className="alert alert-danger">{message}</div>}{" "}
        {/* عرض الرسالة هنا */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fs-4 fw-bold text-primary">
            {product.price} ريال
          </span>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            className="d-flex align-items-center gap-2"
          >
            <i className="bi bi-cart-plus"></i>
            أضف للسلة
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
