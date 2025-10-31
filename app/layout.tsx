import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext'; 
const cairo = Cairo({ subsets: ['arabic'], weight: ['300', '400', '600', '700', '800'] });
 
export const metadata: Metadata = {
title: 'متجر الإلكترونيات - أفضل المنتجات الإلكترونية',
   description: 'وجهتك الأولى لأحدث المنتجات الإلكترونية بأفضل الأسعار',
 };
 
 export default function RootLayout({
   children,
 }: {
   children: React.ReactNode;
 }) {
     return (
    <html lang="ar" dir="rtl">
       <body className={cairo.className}>
           <CartProvider>
           {children}
        </CartProvider>
      </body>
     </html>
   );
}