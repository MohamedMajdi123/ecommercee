"use client";

import React from "react";
import { Modal, Button, ListGroup, Badge, Image } from "react-bootstrap";
import { useCart } from "@/contexts/CartContext";
import { deleteProductFromCart } from "@/utils/deleteProductCart";
import { decreaseProductQuantity } from "@/utils/decreasProductFromCart";
import { increaseProductQuantity } from "@/utils/increaseProductFromCart";
import { getCookie } from "@/utils/cookies";

interface CartItem {
  cartId: string;
  id: string | number; // السماح بأن تكون الـ id من نوع string أو number
  image: string | Blob | undefined;
  name: string;
  price: number | string;
  quantity: number;
}

interface CartModalProps {
  show: boolean;
  onHide: () => void;
}
const CartModal: React.FC<CartModalProps> = ({ show, onHide }) => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal,
  } = useCart();

  const token = getCookie("token") as string;
  function decreaseCart(id: string) {
    decreaseProductQuantity(token, id);
    decreaseQuantity(id as string);
  }
  function increaseCart(id: string) {
    increaseProductQuantity(token, id);
    increaseQuantity(id as string);
  }
  function removeCart(id: string) {
    deleteProductFromCart(token, id);
    removeFromCart(id as string);
  }
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          <i className="bi bi-cart-fill me-2"></i>
          سلة التسوق
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-cart-x display-1 text-muted"></i>
            <p className="text-muted mt-3">السلة فارغة</p>
          </div>
        ) : (
          <ListGroup variant="flush">
            {cart.map((item: CartItem) => (
              <ListGroup.Item
                key={item.id}
                className="border-0 border-bottom py-3"
              >
                <div
                  className="d-flex align-items-center gap-3"
                  id={item.cartId}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    rounded
                  />

                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-bold">{item.name}</h6>
                    <p className="mb-0 text-primary fw-bold">
                      {item.price} ريال
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => decreaseCart(item.cartId as string)}
                      className="rounded-circle"
                      style={{ width: "32px", height: "32px", padding: 0 }}
                    >
                      <i className="bi bi-dash"></i>
                    </Button>

                    <Badge bg="primary" className="px-3 py-2">
                      {item.quantity}
                    </Badge>

                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => increaseCart(item.cartId as string)}
                      className="rounded-circle"
                      style={{ width: "32px", height: "32px", padding: 0 }}
                    >
                      <i className="bi bi-plus"></i>
                    </Button>
                  </div>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeCart(item.cartId as string)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>

      {cart.length > 0 && (
        <Modal.Footer className="flex-column align-items-stretch">
          <div className="d-flex justify-content-between mb-3">
            <span className="fs-5 fw-bold">الإجمالي:</span>
            <span className="fs-4 fw-bold text-primary">
              {getCartTotal()} ريال
            </span>
          </div>
          <Button variant="primary" size="lg" className="w-100">
            <i className="bi bi-check-circle me-2"></i>
            إتمام الطلب
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CartModal;
