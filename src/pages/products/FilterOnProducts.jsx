import React, { useEffect, useState } from 'react'
import FilterByCategory from './filterAndSearch/FilterByCategory';
import FilterByPrice from './filterAndSearch/FilterByPrice';
import FilterByColor from './filterAndSearch/FilterByColor';
import FilterByTags from './filterAndSearch/FilterByTags';
import ResetFilters from './filterAndSearch/ResetFilters';
import { scrollOnFilter } from '../../components/ScrollToTop';

const FilterOnProducts = ({ data, setFilteredData, setTotalProducts, selectedCategory }) => {

    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [tags, setTags] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const categoryCounts = {};
        const uniqueColors = new Set();
        const uniqueTags = new Set();

        data.forEach(product => {
            categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
            uniqueColors.add(product.color);
            uniqueTags.add(product.tag);
        });

        setCategories(categoryCounts);
        setColors([...uniqueColors]);
        setTags([...uniqueTags]);

    }, [data]);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = data.filter(d => d.category === selectedCategory);
            setFilteredData(filtered);
            setTotalProducts(filtered.length);
        } else {
            setFilteredData(data);
            setTotalProducts(data.length);
        }
    }, [selectedCategory, data, setFilteredData, setTotalProducts]);

    const handleResetFilters = () => {
        setFilteredData(data);
        setTotalProducts(data.length);
        setMinPrice('');
        setMaxPrice('');
        scrollOnFilter();
    };

    const handleCategoryClick = (category) => {
        const filtered = data.filter(d => d.category === category);
        setFilteredData(filtered);
        setTotalProducts(filtered.length);
        scrollOnFilter();
    };

    const handleColorClick = (color) => {
        const filtered = data.filter(d => d.color === color);
        setFilteredData(filtered);
        setTotalProducts(filtered.length);
        scrollOnFilter();
    };

    const handleTagClick = (tag) => {
        const filtered = data.filter(d => d.tag === tag);
        setFilteredData(filtered);
        setTotalProducts(filtered.length);
        scrollOnFilter();
    };

    const handlePriceChange = () => {
        let filtered = data;
        if (minPrice) {
            filtered = filtered.filter(d => d.price >= minPrice);
        }
        if (maxPrice) {
            filtered = filtered.filter(d => d.price <= maxPrice);
        }
        setFilteredData(filtered);
        setTotalProducts(filtered.length);
        scrollOnFilter();
    };

    return (
        <div className="col-span-4 md:col-span-1">
            <ResetFilters handleResetFilters={handleResetFilters} />
            <FilterByCategory
                categories={categories}
                handleCategoryClick={handleCategoryClick}
            />
            <FilterByPrice
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                setMinPrice={setMinPrice}
                handlePriceChange={handlePriceChange}
            />
            <FilterByColor
                colors={colors}
                handleColorClick={handleColorClick}
            />
            <FilterByTags tags={tags} handleTagClick={handleTagClick} />
        </div>
    )
}

export default FilterOnProducts