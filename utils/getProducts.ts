const getProducts = async () => {
    try {
      const response = await fetch('/api/products'); // استدعاء API لجلب المنتجات
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json(); // تحويل الاستجابة إلى JSON
      return products; // إرجاع قائمة المنتجات
    } catch (error) {
      console.error("Error fetching products:", error); // تسجيل الخطأ في حالة حدوثه
      return []; // إرجاع مصفوفة فارغة في حالة حدوث خطأ
    }
  };
  
  export default getProducts; // تصدير الدالة بشكل افتراضي