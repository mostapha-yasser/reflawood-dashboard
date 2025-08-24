import { ProductFormInterface, ProductInput } from "@/types/product";
import SubmitButton from "../loginComponents/SubmitButton";
import { useEffect, useState } from "react";

export default function ProductForm({
  handleNewProductAction,
  toggleModifyModel,
  state,
  productBeforeEdit,
  headerContent,
}: ProductFormInterface) {
  
  // الحالة الأولية المصححة
  const [formValues, setFormValues] = useState<ProductInput>({
    _id: undefined, // ✅ undefined بدلاً من ""
    name: "",
    category: "mirrors",
    imageUrl: "",
    prices: {
      price: 0,
      discount: 0
    },
    shortDesc: "",
    description: "",
  });

  // دالة معالجة التغييرات المحسنة
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    
    if (name === "price" || name === "discount") {
      setFormValues((prev) => ({
        ...prev,
        prices: {
          ...prev.prices,
          [name]: value === "" ? 0 : Number(value) // ✅ تحويل صحيح للرقم
        }
      }));
    } else if (name === "category") {
      setFormValues((prev) => ({
        ...prev,
        [name]: value as "table" | "mirrors" // ✅ تأكيد النوع
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  // استخراج القيم
  const { _id, name, category, description, imageUrl, prices, shortDesc } = formValues;

  // useEffect محسن
  useEffect(() => {
    if (!productBeforeEdit) {
      // إعادة تعيين النموذج عند عدم وجود منتج للتعديل
      setFormValues({
        _id: undefined,
        name: "",
        category: "mirrors",
        imageUrl: "",
        prices: { price: 0, discount: 0 },
        shortDesc: "",
        description: "",
      });
      return;
    }
    
    // تحديث النموذج بالمنتج المحدد
    setFormValues({
      _id: productBeforeEdit._id,
      name: productBeforeEdit.name,
      category: productBeforeEdit.category,
      imageUrl: productBeforeEdit.imageUrl,
      shortDesc: productBeforeEdit.shortDesc,
      description: productBeforeEdit.description,
      prices: { ...productBeforeEdit.prices }, // ✅ نسخ عميق
    });
  }, [productBeforeEdit]);

  // دالة معالجة الإرسال
  const handleSubmit = async (formData: FormData) => {
    // إضافة البيانات المتداخلة بشكل مسطح للـ FormData
    formData.set('price', prices.price.toString());
    formData.set('discount', prices.discount.toString());
    
    // إزالة الحقول المتداخلة إذا كانت موجودة
    formData.delete('prices');
    
    await handleNewProductAction(formData);
  };

  return (
    <form
      action={handleSubmit} // ✅ استخدام دالة معالجة محسنة
      className={`     
        ${headerContent === "Add" ? "w-11/12 md:w-4/5" : "w-full"}
        bg-white border-2 border-gray-300
        min-h-96 max-h-screen px-2
        text-xs md:text-sm lg:text-base
        md:px-6 rounded-sm grid grid-cols-1 
        mt-10 lg:mt-0`}
    >
      <p className="text-center text-2xl md:text-3xl font-bold text-gray-800 my-1">
        {headerContent} Product
      </p>

      {/* اسم المنتج والفئة */}
      <div className="flex w-full justify-between gap-4">
        <div className="w-1/2 flex flex-col gap-0.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Product name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            placeholder="Enter product name"
            autoComplete="off"
            onChange={handleChange}
            required // ✅ إضافة التحقق
            className="w-full placeholder:text-center bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-center min-h-4 text-sm font-bold text-red-500">
            {state?.errors?.name && state.errors.name[0]}
          </p>
        </div>

        <div className="w-1/2 flex flex-col gap-0.5">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">
            Product category
          </label>
          <select
            value={category}
            name="category"
            id="category"
            className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={handleChange}
            required
          >
            <option value="mirrors">Mirror</option>
            <option value="table">Table</option>
          </select>
          <p className="text-center min-h-4 text-sm font-bold text-red-500">
            {state?.errors?.category && state.errors.category[0]}
          </p>
        </div>
      </div>

      {/* رابط الصورة */}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">
          Product Image URL
        </label>
        <input
          onChange={handleChange}
          id="imageUrl"
          type="url" // ✅ نوع URL للتحقق التلقائي
          name="imageUrl"
          value={imageUrl}
          placeholder="Enter image URL"
          autoComplete="off"
          required
          className="w-full placeholder:text-center bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-center min-h-4 text-sm font-bold text-red-500">
          {state?.errors?.imageUrl && state.errors.imageUrl[0]}
        </p>
      </div>

      {/* السعر والخصم */}
      <div className="flex justify-between gap-4">
        <div className="w-1/2 flex flex-col gap-0.5">
          <label htmlFor="price" className="text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            onChange={handleChange}
            id="price"
            type="number" // ✅ نوع number
            step="0.01"
            min="0"
            value={prices.price || ""} // ✅ معالجة القيم الفارغة
            name="price"
            placeholder="Enter product price"
            autoComplete="off"
            required
            className="w-full placeholder:text-center bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-center min-h-4 text-sm font-bold text-red-500">
            {state?.errors?.price && state.errors.price[0]}
          </p>
        </div>

        <div className="w-1/2 flex flex-col gap-0.5">
          <label htmlFor="discount" className="text-sm font-medium text-gray-700">
            Discount percentage
          </label>
          <input
            onChange={handleChange}
            id="discount"
            type="number"
            step="1"
            min="0"
            max="100"
            value={prices.discount || ""}
            name="discount"
            placeholder="Enter discount percentage"
            autoComplete="off"
            className="w-full placeholder:text-center bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-center min-h-4 text-sm font-bold text-red-500">
            {state?.errors?.discount && state.errors.discount[0]}
          </p>
        </div>
      </div>

      {/* الوصف المختصر */}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="shortDesc" className="text-sm font-medium text-gray-700">
          Product Short Description
        </label>
        <textarea
          onChange={handleChange}
          id="shortDesc"
          name="shortDesc"
          value={shortDesc}
          placeholder="Enter short description"
          autoComplete="off"
          rows={2}
          maxLength={100} // ✅ تحديد طول أقصى
          required
          className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-center resize-none"
        />
        <p className="text-xs text-gray-500 text-right">
          {shortDesc.length}/100 characters
        </p>
        <p className="text-center min-h-4 text-sm font-bold text-red-500">
          {state?.errors?.shortDesc && state.errors.shortDesc[0]}
        </p>
      </div>

      {/* الوصف الكامل */}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">
          Product Description
        </label>
        <textarea
          onChange={handleChange}
          id="description"
          name="description"
          value={description}
          placeholder="Enter detailed description"
          autoComplete="off"
          rows={4}
          maxLength={500} // ✅ تحديد طول أقصى
          required
          className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-center resize-none"
        />
        <p className="text-xs text-gray-500 text-right">
          {description.length}/500 characters
        </p>
        <p className="text-center min-h-4 text-sm font-bold text-red-500">
          {state?.errors?.description && state.errors.description[0]}
        </p>
      </div>

      {/* الحقل المخفي للمعرف */}
      <input
        id="_id"
        name="_id"
        type="hidden"
        value={_id || ""} // ✅ معالجة undefined
        readOnly
      />

      {/* زر الإرسال */}
      <SubmitButton
        isModel={headerContent !== "Add"}
        toggleModifyModel={toggleModifyModel}
        title={`${headerContent} product`}
      />

      {/* رسالة خطأ عامة */}
      <p className="text-center min-h-4 text-sm font-bold text-red-500">
        {state?.error && state.error}
      </p>

      {/* رسالة نجاح */}
      {state && 'success' in state && state.success && (
        <p className="text-center text-sm font-bold text-green-600">
          Product {headerContent.toLowerCase()}ed successfully!
        </p>
      )}
    </form>
  );
}