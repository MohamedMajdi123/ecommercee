"use client";

import { removeCookie, getCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import React from "react";
import { Modal, Button } from "react-bootstrap";

interface CartModalProps {
  show: boolean;
  onHide: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ show, onHide }) => {
  const userCookie = getCookie("user");

  // تحقق من أن الكوكي ليس فارغًا قبل التحليل
  let user;
  try {
    user = JSON.parse(userCookie || "{}"); // إذا كان فارغًا، قم بإرجاع كائن فارغ
  } catch (error) {
    console.error("Failed to parse user cookie:", error);
    user = {};
  }

  const router = useRouter();

  const handleLogout = () => {
    if (window.confirm("هل أنت متأكد من تسجيل الخروج؟")) {
      removeCookie("token");
      removeCookie("user");
      router.push("/login");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          <i className="bi bi-person-fill fs-5"></i>
          المعلومات الشخصية
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
        <h2>اسم المستخدم : {user.userName || "غير متوفر"}</h2>
        <h3> البريد الإلكتروني : {user.email || "غير متوفر"}</h3>
      </Modal.Body>

      <Modal.Footer className="flex-column align-items-stretch text-center">
        <Button
          variant="danger"
          size="sm"
          onClick={handleLogout}
          className="d-flex align-items-center gap-2"
        >
          <div className="m-auto">
            <i className="bi bi-box-arrow-right me-2"></i>
            <span className="d-none d-md-inline">تسجيل خروج</span>
          </div>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
