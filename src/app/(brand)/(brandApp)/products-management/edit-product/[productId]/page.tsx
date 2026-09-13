import Breadcrumb from "@/components/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/ui/container/PageContainer";
import { ProductProvider } from "@/context/EcommerceContext";
import EcomEditProduct from "@/features/brand/productsManagement/components/productEdit";

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
    title: "Edit Product",
  },
];

const EditProduct = () => {
  return (
    <ProductProvider>
      <PageContainer title="Edit Product" description="this is Edit Product">
        <Breadcrumb title="Edit Product" items={BCrumb} />
        <EcomEditProduct />
      </PageContainer>
    </ProductProvider>
  );
};

export default EditProduct;
