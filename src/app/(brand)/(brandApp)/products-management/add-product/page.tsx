import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import { ProductProvider } from "@/context/EcommerceContext/index";
import EcomAddProduct from "@/features/brand/productsManagement/components/productAdd";

const BCrumb = [
  {
    to: "/",
    title: "Dashboard",
  },
  {
    to: "/products-management/products",
    title: "Products Management",
  },
  {
    title: "Add Product",
  },
];

const AddProduct = () => {
  return (
    <ProductProvider>
      <PageContainer title="Add Product" description="this is Add Product">
        <Breadcrumb title="Add Product" items={BCrumb} />
        <EcomAddProduct />
      </PageContainer>
    </ProductProvider>
  );
};

export default AddProduct;
