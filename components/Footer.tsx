'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <Container>
        <Row className="g-4">
          <Col md={3}>
            <h5 className="fw-bold mb-3">متجر الإلكترونيات</h5>
            <p className="text-white-50">
              وجهتك الأولى لأحدث المنتجات الإلكترونية بأفضل الأسعار
            </p>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">روابط سريعة</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">عن المتجر</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">سياسة الخصوصية</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">الشروط والأحكام</a>
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">خدمة العملاء</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">اتصل بنا</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">الأسئلة الشائعة</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">تتبع الطلب</a>
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">تابعنا</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="#" className="text-white-50">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="#" className="text-white-50">
                <i className="bi bi-instagram fs-4"></i>
              </a>
            </div>
          </Col>
        </Row>

        <hr className="my-4 bg-white opacity-25" />

        <div className="text-center text-white-50">
          <p className="mb-0">&copy; 2024 متجر الإلكترونيات. جميع الحقوق محفوظة.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
