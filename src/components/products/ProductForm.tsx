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
  
  const [formValues, setFormValues] = useState<ProductInput>({
    _id: undefined,
    name: "",
    category: "mirrors",
    imageUrl: "",
    galleryImages: ["", "", ""],
    prices: {
      price: 0,
      discount: 0
    },
    shortDesc: "",
    description: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    
    if (name === "price" || name === "discount") {
      setFormValues((prev) => ({
        ...prev,
        prices: {
          ...prev.prices,
          [name]: value === "" ? 0 : Number(value)
        }
      }));
    } else if (name === "category") {
      setFormValues((prev) => ({
        ...prev,
        [name]: value as "table" | "mirrors"
      }));
    } else if (name.startsWith("galleryImage")) {
      const index = parseInt(name.replace("galleryImage", "")) - 1;
      setFormValues((prev) => ({
        ...prev,
        galleryImages: prev.galleryImages.map((img, i) => 
          i === index ? value : img
        )
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const { _id, name, category, description, imageUrl, prices, shortDesc, galleryImages } = formValues;

  useEffect(() => {
    if (!productBeforeEdit) {
      setFormValues({
        _id: undefined,
        name: "",
        category: "mirrors",
        imageUrl: "",
        galleryImages: ["", "", ""],
        prices: { price: 0, discount: 0 },
        shortDesc: "",
        description: "",
      });
      return;
    }
    
    setFormValues({
      _id: productBeforeEdit._id,
      name: productBeforeEdit.name,
      category: productBeforeEdit.category,
      imageUrl: productBeforeEdit.imageUrl,
      galleryImages: productBeforeEdit.galleryImages || ["", "", ""],
      shortDesc: productBeforeEdit.shortDesc,
      description: productBeforeEdit.description,
      prices: { ...productBeforeEdit.prices },
    });
  }, [productBeforeEdit]);

  const handleSubmit = async (formData: FormData) => {
    formData.set('price', prices.price.toString());
    formData.set('discount', prices.discount.toString());
    
    galleryImages.forEach((img, index) => {
      formData.set(`galleryImage${index + 1}`, img);
    });
    
    formData.delete('prices');
    formData.delete('galleryImages');
    
    await handleNewProductAction(formData);
  };

  return (
    <form
      action={handleSubmit}
      className={`     
        ${headerContent === "Add" ? "w-11/12 md:w-4/5 scale-y-75 sm:scale-100" : "w-full min-h-fit"}
        bg-white border-2 border-gray-300
        min-h-fit max-h-screen px-2
        text-xs md:text-sm lg:text-base
        md:px-6 rounded-sm grid grid-cols-1  md:scale-90
        mt-10 lg:mt-0`}
    >
      <p className="text-center text-2xl md:text-3xl font-bold text-gray-800 my-.5">
        {headerContent} Product
      </p>

      <div className="flex w-full justify-between gap-x-4 gap-y-1">
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
            required
            className="w-full placeholder:text-center bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-Text focus:border-r-Text"
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
            className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-Text focus:border-r-Text"
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

      {/* رابط الصورة الرئيسية */}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">
          Main Product Image URL
        </label>
        <input
          onChange={handleChange}
          id="imageUrl"
          type="url"
          name="imageUrl"
          value={imageUrl}
          placeholder="Enter main image URL"
          autoComplete="off"
          required
          className="w-full placeholder:text-center bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-Text focus:border-r-Text"
        />
        <p className="text-center min-h-4 text-sm font-bold text-red-500">
          {state?.errors?.imageUrl && state.errors.imageUrl[0]}
        </p>
      </div>

      {/* Gallery Images */}
      <div className="flex flex-col gap-0.5">
        <label className="text-sm font-medium text-gray-700">
          Gallery Images (Optional)
        </label>
        
        {/* Gallery Image 1 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="galleryImage1" className="text-xs text-gray-600">
            Gallery Image 1
          </label>
          <input
            onChange={handleChange}
            id="galleryImage1"
            type="url"
            name="galleryImage1"
            value={galleryImages[0]}
            placeholder="Enter gallery image 1 URL (optional)"
            autoComplete="off"
            className="w-full placeholder:text-center bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-Text focus:border-r-Text"
          />
        </div>

        {/* Gallery Image 2 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="galleryImage2" className="text-xs text-gray-600">
            Gallery Image 2
          </label>
          <input
            onChange={handleChange}
            id="galleryImage2"
            type="url"
            name="galleryImage2"
            value={galleryImages[1]}
            placeholder="Enter gallery image 2 URL (optional)"
            autoComplete="off"
            className="w-full placeholder:text-center bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-Text focus:border-r-Text"
          />
        </div>

        {/* Gallery Image 3 */}
        <div className="flex flex-col gap-1">
          <label htmlFor="galleryImage3" className="text-xs text-gray-600">
            Gallery Image 3
          </label>
          <input
            onChange={handleChange}
            id="galleryImage3"
            type="url"
            name="galleryImage3"
            value={galleryImages[2]}
            placeholder="Enter gallery image 3 URL (optional)"
            autoComplete="off"
            className="w-full placeholder:text-center bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-Text focus:border-r-Text"
          />
        </div>

        <p className="text-center min-h-4 text-sm font-bold text-red-500">
          {state?.errors?.galleryImages && state.errors.galleryImages[0]}
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
            type="number"
            step="0.01"
            min="0"
            value={prices.price || ""}
            name="price"
            placeholder="Enter product price"
            autoComplete="off"
            required
            className="w-full placeholder:text-center bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-Text focus:border-r-Text"
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
            className="w-full placeholder:text-center bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-Text focus:border-r-Text"
          />
          <p className="text-center min-h-4 text-sm font-bold text-red-500">
            {state?.errors?.discount && state.errors.discount[0]}
          </p>
        </div>
      </div>

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
          maxLength={100}
          required
          className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-Text focus:border-r-Text placeholder:text-center resize-none"
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
          maxLength={500}
          required
          className="w-full bg-gray-50 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-Text focus:border-r-Text placeholder:text-center resize-none"
        />
        <p className="text-xs text-gray-500 text-right">
          {description.length}/300 characters
        </p>
        <p className="text-center min-h-4 text-sm font-bold text-red-500">
          {state?.errors?.description && state.errors.description[0]}
        </p>
      </div>

      <input
        id="_id"
        name="_id"
        type="hidden"
        value={_id || ""} 
        readOnly
      />

      <SubmitButton
        isModel={headerContent !== "Add"}
        toggleModifyModel={toggleModifyModel}
        title={`${headerContent} product`}
      />

      <p className="text-center min-h-4 text-sm font-bold text-red-500">
        {state?.error && state.error}
      </p>

      {state && 'success' in state && state.success && (
        <p className="text-center text-sm font-bold text-green-600">
          Product {headerContent.toLowerCase()}ed successfully!
        </p>
      )}
    </form>
  );
}