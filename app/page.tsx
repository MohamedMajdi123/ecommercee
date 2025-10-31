"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import getProducts from "@/utils/getProducts";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]); // متغير لتخزين المنتجات
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  // دالة لجلب المنتجات
  const fetchProducts = async () => {
    try {
      const productsData = await getProducts(); // استدعاء الدالة لجلب المنتجات
      setProducts(productsData); // تحديث الحالة
    } catch (error) {
      setError("فشل في جلب المنتجات"); // تسجيل الخطأ
    } finally {
      setLoading(false); // إنهاء حالة التحميل
    }
  };

  // استخدام useEffect لاستدعاء fetchProducts عند جبل المكون
  useEffect(() => {
    fetchProducts();
  }, []);

  // استخدام useMemo لتصفية المنتجات بناءً على الاستعلام والتصنيف المختار
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  if (loading) return <p>جاري التحميل...</p>; // عرض رسالة التحميل
  if (error) return <p>خطأ: {error}</p>; // عرض رسالة الخطأ

  return (
    <>
      <Header
        onSearch={setSearchQuery}
        onCategoryChange={setSelectedCategory}
      />

      <section className="hero-section text-center">
        <Container>
          <h2 className="display-4 fw-bold mb-4">أحدث المنتجات الإلكترونية</h2>
          <p className="lead mb-4">
            اكتشف أفضل العروض على أحدث الأجهزة الإلكترونية
          </p>
          <a href="#products" className="btn btn-light btn-lg fw-bold">
            تسوق الآن
            <i className="bi bi-arrow-left me-2"></i>
          </a>
        </Container>
      </section>

      <section id="products" className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5 display-6">
            منتجاتنا المميزة
          </h2>
          <Row className="g-4">
            {filteredProducts.map((product) => (
              <Col key={product._id} xs={12} sm={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          {filteredProducts.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-inbox display-1 text-muted"></i>
              <p className="text-muted mt-3">لا توجد منتجات تطابق البحث</p>
            </div>
          )}
        </Container>
      </section>

      <section className="py-5 bg-white">
        <Container>
          <Row className="g-4">
            <Col md={3} className="text-center">
              <div className="feature-icon">
                <i className="bi bi-truck"></i>
              </div>
              <h5 className="fw-bold mb-2">شحن سريع</h5>
              <p className="text-muted">توصيل خلال 24-48 ساعة</p>
            </Col>
            <Col md={3} className="text-center">
              <div className="feature-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <h5 className="fw-bold mb-2">ضمان الجودة</h5>
              <p className="text-muted">منتجات أصلية 100%</p>
            </Col>
            <Col md={3} className="text-center">
              <div className="feature-icon">
                <i className="bi bi-headset"></i>
              </div>
              <h5 className="fw-bold mb-2">دعم فني 24/7</h5>
              <p className="text-muted">خدمة عملاء متميزة</p>
            </Col>
            <Col md={3} className="text-center">
              <div className="feature-icon">
                <i className="bi bi-arrow-repeat"></i>
              </div>
              <h5 className="fw-bold mb-2">إرجاع مجاني</h5>
              <p className="text-muted">استرجاع خلال 14 يوم</p>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}