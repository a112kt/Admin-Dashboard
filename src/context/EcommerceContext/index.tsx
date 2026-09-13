'use client'

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ProductType, GetBrandProductsRes, AddBrandProductReq, EditProductReq } from '@/features/brand/productsManagement/types';
import * as productsService from '@/features/brand/productsManagement/services';

interface ProductContextType {
    products: ProductType[];
    searchProduct: string;
    selectedCategory: string;
    sortBy: string;
    priceRange: string;
    selectedGender: string;
    selectedColor: string;
    loading: boolean;
    error: Error | null;
    cartItems: ProductType[];
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
    setSearchProduct: React.Dispatch<React.SetStateAction<string>>;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    setPriceRange: React.Dispatch<React.SetStateAction<string>>;
    setSelectedGender: React.Dispatch<React.SetStateAction<string>>;
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setCartItems: React.Dispatch<React.SetStateAction<ProductType[]>>;
    deleteProduct: (productId: number | string) => void;
    searchProducts: (searchText: string) => void;
    updateSortBy: (sortOption: string) => void;
    updatePriceRange: (range: string) => void;
    selectCategory: (category: string) => void;
    selectGender: (gender: string) => void;
    selectColor: (color: string) => void;
    deleteAllProducts: () => void;
    filteredAndSortedProducts: ProductType[];
    filterReset: () => void;
    getProductById: (productId: string) => ProductType | undefined;
    updateProduct: (updatedProduct: ProductType) => void;
    selectedProduct: ProductType | null;
    setSelectedProduct: React.Dispatch<React.SetStateAction<ProductType | null>>;
    editedProduct: any;
    setEditedProduct: React.Dispatch<React.SetStateAction<any>>;
    addProduct: (newProduct: ProductType) => void;
    addNewProduct: ProductType | null
    setAddNewProduct: React.Dispatch<React.SetStateAction<ProductType | null>>;
    initializeDraftProduct: () => void;
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType);

const mapBackendProduct = (item: GetBrandProductsRes): ProductType => ({
    id: item.id,
    name: item.name,
    image: item.image || "",
    createdAt: item.createdAt,
    status: String(item.status),
    price: String(item.price),
    quantity: String(item.quantity),
});

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [searchProduct, setSearchProduct] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [priceRange, setPriceRange] = useState<string>('All');
    const [selectedGender, setSelectedGender] = useState<string>('All');
    const [selectedColor, setSelectedColor] = useState<string>('All');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [cartItems, setCartItems] = useState<ProductType[]>([]);
    const [editedProduct, setEditedProduct] = useState<any>();
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [addNewProduct, setAddNewProduct] = useState<ProductType | null>(null);

    const initializeDraftProduct = () => {
        setAddNewProduct({
            id: Date.now(),
            name: "",
            image: "",
            createdAt: new Date().toISOString(),
            status: "",
            price: "0",
            quantity: "0",
        });
    };

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await productsService.getProducts();
            if (response.success && response.data?.data) {
                const mapped = response.data.data.map(mapBackendProduct);
                setProducts(mapped);
            } else {
                setProducts([]);
            }
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filterProducts = (product: ProductType) => {
        const matchesSearch = product.name.toLowerCase().includes(searchProduct.toLowerCase());
        const withinPriceRange = (priceRange === 'All') ||
            (priceRange === '0-50' && Number(product.price) <= 50) ||
            (priceRange === '50-100' && Number(product.price) > 50 && Number(product.price) <= 100) ||
            (priceRange === '100-200' && Number(product.price) > 100 && Number(product.price) <= 200) ||
            (priceRange === '200-99999' && Number(product.price) > 200);
        return matchesSearch && withinPriceRange;
    };

    const sortProducts = (filteredProducts: ProductType[]) => {
        switch (sortBy) {
            case 'newest':
                return filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            case 'priceDesc':
                return filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
            case 'priceAsc':
                return filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
            default:
                return filteredProducts;
        }
    };

    const getProductById = (productId: string) => {
        const product = products.find(p => p.id === Number(productId));
        return product;
    };

    const filteredProducts = products.filter(filterProducts);
    const filteredAndSortedProducts = sortProducts(filteredProducts);

    const selectCategory = (category: string) => setSelectedCategory(category);
    const updateSortBy = (sortOption: string) => setSortBy(sortOption);
    const updatePriceRange = (range: string) => setPriceRange(range);
    const selectGender = (gender: string) => setSelectedGender(gender);
    const selectColor = (color: string) => setSelectedColor(color);
    const searchProducts = (searchText: string) => setSearchProduct(searchText);

    const deleteProduct = async (productId: number | string) => {
        try {
            await productsService.deleteProduct(Number(productId));
            setProducts(prev => prev.filter(product => product.id !== productId));
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    const deleteAllProducts = () => {
        setProducts([]);
    };

    const updateProduct = async (updatedProduct: ProductType) => {
        try {
            const req: EditProductReq = {
                productId: Number(updatedProduct.id),
                name: updatedProduct.name,
                description: "",
                price: Number(updatedProduct.price),
                isCustomizable: false,
            };
            await productsService.editProduct(req);
            setProducts(prev =>
                prev.map(product =>
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            );
            setSelectedProduct(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const addProduct = async (newProduct: ProductType) => {
        try {
            const req: AddBrandProductReq = {
                name: newProduct.name,
                description: "",
                price: Number(newProduct.price),
                categoryId: 1,
                isCustomizable: false,
                colors: [],
            };
            const response = await productsService.addProduct(req);
            if (response.success) {
                await fetchProducts();
            }
        } catch (error) {
            console.error('Error adding new product:', error);
            setError(error as Error);
        }
    };

    const filterReset = () => {
        setSelectedCategory('All');
        setSelectedColor('All');
        setSelectedGender('All');
        setPriceRange('All');
        setSortBy('newest');
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                searchProduct,
                selectedCategory,
                sortBy,
                priceRange,
                selectedGender,
                selectedColor,
                loading,
                error,
                cartItems,
                setProducts,
                setSearchProduct,
                setSelectedCategory,
                setSortBy,
                setPriceRange,
                setSelectedGender,
                setSelectedColor,
                setLoading,
                setCartItems,
                deleteProduct,
                searchProducts,
                updateSortBy,
                updatePriceRange,
                selectCategory,
                selectGender,
                selectColor,
                deleteAllProducts,
                filteredAndSortedProducts,
                filterReset, getProductById,
                updateProduct,
                selectedProduct,
                setSelectedProduct,
                editedProduct,
                setEditedProduct,
                addProduct,
                initializeDraftProduct,
                addNewProduct,
                setAddNewProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
