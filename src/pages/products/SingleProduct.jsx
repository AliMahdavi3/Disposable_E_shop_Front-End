import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import SpinnerLoad from '../../components/SpinnerLoad';
import AddToFavorites from './singleProduct/AddToFavorites';
import AddToCartButton from './singleProduct/AddToCartButton';
import ProductInfo from './singleProduct/ProductInfo';
import ImageSection from './singleProduct/ImageSection';
import ViewAndDate from './singleProduct/ViewAndDate';
import QuantityPriceAvailable from './singleProduct/QuantityPriceAvailable';
import Content from './singleProduct/Content';
import useSolidNavbar from '../../hooks/useSolidNavbar';
import { getSingleProductService } from '../../services/product';
import RelatedProducts from './carousels/RelatedProducts';
import ProductComments from './ProductComments';


const SingleProduct = () => {

    let { productId } = useParams();
    const [data, setData] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const token = localStorage.getItem('token');
    useSolidNavbar(true);

    useEffect(() => {
        const handleFetchSingleProduct = async () => {
            try {
                const res = await getSingleProductService(productId);
                console.log(res.data);
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        handleFetchSingleProduct();
    }, [productId]);

    const crumbs = [
        { title: 'Home', href: '/' },
        { title: 'محصولات', href: '/products' },
        { title: data ? data.product.title : 'لطفا صبر کنید...', href: `/products/${productId}` },
    ];

    return (
        <>
            <Breadcrumbs crumbs={crumbs} />
            {
                !data ? (
                    <div className='h-screen'>
                        <SpinnerLoad />
                    </div>
                ) : (
                    <div className="md:pt-5 container single_product">
                        <div dir='ltr' className='md:py-10 grid grid-cols-5 gap-4'>
                            <ImageSection data={data} />
                            <div dir='rtl' className="col-span-5 md:col-span-3 h-fit md:py-5">
                                <div className='md:flex-row flex-col items-start md:items-center md:px-10 pb-10'>
                                    <div className='mb-3'>
                                        <AddToFavorites
                                            data={data}
                                            productId={productId}
                                            token={token}
                                        />
                                        <ViewAndDate data={data} />
                                    </div>
                                </div>
                                <Content data={data} />
                                <QuantityPriceAvailable
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                    data={data}
                                />

                                <AddToCartButton
                                    data={data}
                                    productId={productId}
                                    quantity={quantity}
                                    token={token}
                                />

                                <hr className='border-2 border-gray-300 mt-7' />
                                <ProductInfo data={data} />

                            </div>
                        </div>
                        <ProductComments productId={productId} />
                        <RelatedProducts productId={productId} />
                    </div>
                )
            }
            <Footer />
        </>
    )
}

export default SingleProduct
