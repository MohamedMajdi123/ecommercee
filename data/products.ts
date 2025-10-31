// import { Product } from '@/types';

// export const products: Product[] = [
//   {
//     id: 1,
//     name: 'iPhone 15 Pro Max',
//     category: 'phones',
//     price: 5499,
//     image: '/images/products/iphone15pro.jpeg',
//     description: 'أحدث هاتف من آبل بكاميرا 48 ميجابكسل'
//   },
//   {
//     id: 2,
//     name: 'Samsung Galaxy S24 Ultra',
//     category: 'phones',
//     price: 4799,
//     image: '/images/products/images (5).jpeg',
//     description: 'هاتف سامسونج الرائد بمعالج قوي'
//   },
//   {
//     id: 3,
//     name: 'MacBook Pro 16"',
//     category: 'laptops',
//     price: 12999,
//     image: '/images/products/images (7).jpeg',
//     description: 'لابتوب احترافي مع شريحة M3 Pro'
//   },
//   {
//     id: 4,
//     name: 'Dell XPS 15',
//     category: 'laptops',
//     price: 8999,
//     image: '/images/products/images (8).jpeg',
//     description: 'لابتوب قوي للمحترفين والمبدعين'
//   },
//   {
//     id: 5,
//     name: 'iPad Pro 12.9"',
//     category: 'tablets',
//     price: 4299,
//     image: '/images/products/images (10).jpeg',
//     description: 'تابلت احترافي مع شاشة Liquid Retina'
//   },
//   {
//     id: 6,
//     name: 'Samsung Galaxy Tab S9',
//     category: 'tablets',
//     price: 3499,
//     image: '/images/products/images (11).jpeg',
//     description: 'تابلت متطور مع قلم S Pen'
//   },
//   {
//     id: 7,
//     name: 'AirPods Pro 2',
//     category: 'accessories',
//     price: 999,
//     image: '/images/products/images (12).jpeg',
//     description: 'سماعات لاسلكية بإلغاء ضوضاء'
//   },
//   {
//     id: 8,
//     name: 'Sony WH-1000XM5',
//     category: 'accessories',
//     price: 1299,
//     image: '/images/products/images (13).jpeg',
//     description: 'سماعات فوق الأذن بجودة صوت عالية'
//   },
//   {
//     id: 9,
//     name: 'Apple Watch Series 9',
//     category: 'smartwatch',
//     price: 1799,
//     image: '/images/products/images (14).jpeg',
//     description: 'ساعة ذكية مع ميزات صحية متقدمة'
//   },
//   {
//     id: 10,
//     name: 'Samsung Galaxy Watch 6',
//     category: 'smartwatch',
//     price: 1299,
//     image: '/images/products/images (15).jpeg',
//     description: 'ساعة ذكية أنيقة مع بطارية طويلة'
//   },
//   {
//     id: 11,
//     name: 'Xiaomi 14 Pro',
//     category: 'phones',
//     price: 3299,
//     image: '/images/products/images (6).jpeg',
//     description: 'هاتف بمواصفات رائدة وسعر منافس'
//   },
//   {
//     id: 12,
//     name: 'HP Spectre x360',
//     category: 'laptops',
//     price: 7499,
//     image: '/images/products/images (8).jpeg',
//     description: 'لابتوب قابل للتحول بشاشة لمس'
//   }
// ];
import getProducts from "@/utils/getProducts"; // تأكد من المسار الصحيح

const fetchProducts = async () => {
  const products = await getProducts(); // استدعاء الدالة لجلب المنتجات
  return products; // إرجاع المنتجات
};

const products = await fetchProducts(); // استدعاء الدالة وتخزين النتائج في متغير

export default products; // تصدير المتغير