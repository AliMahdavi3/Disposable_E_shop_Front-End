import React, { useEffect, useState } from 'react'
import { getAllProductsService } from '../../services/product';
import ProductCard from '../../components/cardComponents/ProductCard';
import SpinnerLoad from '../../components/SpinnerLoad';
import Pagination from '../../components/Pagination';
import FilterOnProducts from './FilterOnProducts';
import SearchBox from './filterAndSearch/SearchBox';
import { scrollOnFilter } from '../../components/ScrollToTop';

const ProductsSection = ({ itemsPerPage, selectedCategory }) => {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handleFetchProducts = async () => {
            setLoading(true);
            try {
                const res = await getAllProductsService();
                setData(res.data.products);
                setFilteredData(res.data.products);
                setTotalProducts(res.data.products.length)
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }
        handleFetchProducts();
    }, []);

    useEffect(() => {
        let filtered = [...data];

        if (searchTerm) {
            filtered = filtered.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredData(filtered);
        setTotalProducts(filtered.length);

    }, [data, searchTerm]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const pageCount = Math.ceil(totalProducts / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pageCount) {
            setCurrentPage(newPage);
            scrollOnFilter();
        }
    };

    return (
        <>
            {
                loading ? (
                    <div className="h-screen">
                        <SpinnerLoad />
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-1 md:gap-2">
                        <div className='col-span-4 md:col-span-3'>
                            <SearchBox setSearchTerm={setSearchTerm} />
                            <div className='grid grid-cols-4 gap-1 md:gap-2'>
                                {
                                    Array.isArray(currentItems) ?
                                        currentItems.map((product) => (
                                            <ProductCard
                                                product={product}
                                                key={product._id}
                                            />
                                        )) : null
                                }
                            </div>
                            <div className='mb-4 md:mb-0'>
                                <Pagination
                                    currentPage={currentPage}
                                    pageCount={pageCount}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                        <FilterOnProducts
                            data={data}
                            setFilteredData={setFilteredData}
                            setTotalProducts={setTotalProducts}
                            selectedCategory={selectedCategory}
                        />
                    </div>
                )
            }
        </>
    )
}

export default ProductsSection