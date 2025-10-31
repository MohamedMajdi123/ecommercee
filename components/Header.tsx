"use client";

import { removeCookie } from "@/utils/cookies";
import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Badge,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { useCart } from "@/contexts/CartContext";
import CartModal from "./CartModal";
import { useRouter } from "next/navigation";
import UserInfo from "./userInfo";

interface HeaderProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onCategoryChange }) => {
  const { getCartCount } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const router = useRouter();

  const categories = [
    { id: "all", name: "الكل", icon: "bi-grid-fill" },
    { id: "phones", name: "هواتف ذكية", icon: "bi-phone-fill" },
    { id: "laptops", name: "لابتوبات", icon: "bi-laptop-fill" },
    { id: "tablets", name: "تابلت", icon: "bi-tablet-fill" },
    { id: "accessories", name: "إكسسوارات", icon: "bi-headphones" },
    { id: "smartwatch", name: "ساعات ذكية", icon: "bi-smartwatch" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  const handleLogout = () => {
    if (window.confirm("هل أنت متأكد من تسجيل الخروج؟")) {
      removeCookie("token");
      removeCookie("user");
      router.push("/login");
    }
  };

  return (
    <>
      <header className="sticky-top bg-white shadow-sm">
        {/* Top Header */}
        <Navbar bg="white" expand="lg" className="py-3">
          <Container>
            {/* Logo على اليمين */}
            <Navbar.Brand href="/" className="d-flex align-items-center gap-3">
              <div
                className="bg-primary text-white rounded-3 p-2 d-flex align-items-center justify-content-center"
                style={{ width: "50px", height: "50px" }}
              >
                <i className="bi bi-lightning-charge-fill fs-3"></i>
              </div>
              <div>
                <h1 className="mb-0 fs-5 fw-bold text-dark">
                  متجر الإلكترونيات
                </h1>
                <small className="text-muted">أفضل العروض</small>
              </div>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              {/* Navigation في المنتصف */}
              <Nav className="mx-auto">
                <Nav.Link href="#" className="fw-semibold px-3">
                  الرئيسية
                </Nav.Link>
                <Nav.Link href="#products" className="fw-semibold px-3">
                  المنتجات
                </Nav.Link>
                <Nav.Link href="#" className="fw-semibold px-3">
                  العروض
                </Nav.Link>
                <Nav.Link href="#" className="fw-semibold px-3">
                  من نحن
                </Nav.Link>
                <Nav.Link href="#" className="fw-semibold px-3">
                  اتصل بنا
                </Nav.Link>
              </Nav>

              {/* User Actions على اليسار */}
              <div className="d-flex align-items-center gap-3">

                  <Button
                    variant="link"
                    className="text-dark position-relative p-2"
                    onClick={() => setShowUserInfo(true)}
                  >
                    <i className="bi bi-person-fill fs-5"></i>
                  </Button>

                <Button
                  variant="link"
                  className="text-dark position-relative p-2"
                  onClick={() => setShowCart(true)}
                >
                  <i className="bi bi-cart-fill fs-5"></i>
                  {getCartCount() > 0 && (
                    <Badge
                      bg="danger"
                      className="position-absolute top-0 start-0 rounded-pill"
                      style={{ fontSize: "0.65rem" }}
                    >
                      {getCartCount()}
                    </Badge>
                  )}
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleLogout}
                  className="d-flex align-items-center gap-2"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span className="d-none d-md-inline">تسجيل خروج</span>
                </Button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Search & Categories Section */}
        <div className="bg-light border-top py-3">
          <Container>
            {/* Search Bar */}
            <Form.Group className="mb-3">
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="ابحث عن المنتجات..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="ps-5"
                  style={{ fontSize: "16px" }}
                />
                <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
              </div>
            </Form.Group>

            {/* Categories */}
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    activeCategory === category.id
                      ? "primary"
                      : "outline-secondary"
                  }
                  size="sm"
                  onClick={() => handleCategoryClick(category.id)}
                  className="d-flex align-items-center gap-2 rounded-pill"
                >
                  <i className={`bi ${category.icon}`}></i>
                  {category.name}
                </Button>
              ))}
            </div>
          </Container>
        </div>
      </header>

      <UserInfo show={showUserInfo} onHide={() => setShowUserInfo(false)} />
      <CartModal show={showCart} onHide={() => setShowCart(false)} />
    </>
  );
};

export default Header;
