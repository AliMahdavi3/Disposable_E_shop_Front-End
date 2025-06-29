import React from 'react'
import Footer from '../../components/Footer';
import ProductsSection from './ProductsSection';
import { useSearchParams } from 'react-router-dom';
import useSolidNavbar from '../../hooks/useSolidNavbar';
import NewestProducts from './carousels/NewestProducts';

const Products = () => {

    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get('category');

    useSolidNavbar(true);

    return (
        <>
            <div className='pt-16'>
                <NewestProducts />
                <div className="container my-10">
                    <ProductsSection
                        selectedCategory={selectedCategory}
                        itemsPerPage={12}
                    />
                </div>
                <Footer />
            </div >
        </>
    )
}

export default Products
