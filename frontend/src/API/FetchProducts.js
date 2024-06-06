import React, { useState, useEffect } from 'react';

export const FetchProducts = (category) => {


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                let response;
                if (category === 'all') {
                    response = await fetch('http://localhost:5000/api/product/products/english/all');
                    console.log("fetched from all")
                } else {
                    response = await fetch(`http://localhost:5000/api/product/category/en/${encodeURIComponent(category)}`);
                    console.log(`"fetched from all"${category}`)
                }
    
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
    
                const data = await response.json();
                console.log(`Fetched ${category} products:`, data);
    
    
                const extractedProducts = extractProducts(data);
    
                if (Array.isArray(extractedProducts)) {
                    setProducts(extractedProducts);
                    
                } else {
                    throw new Error('Invalid data format');
                }
    
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching ${category} products:`, error);
                setProducts([]);
                setLoading(false);
            }
        };
    
    
        fetchData();
    },[category]);


    const extractProducts = (data) => {
        if (category === 'all') {

            return Array.isArray(data) ? data : [];
        } else {

            if (data && data.data && Array.isArray(data.data)) {
                return data.data;
            }
            return [];
        }
    };




    return { products, loading };
}
