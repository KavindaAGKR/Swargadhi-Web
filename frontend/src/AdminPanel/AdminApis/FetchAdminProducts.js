import React, { useEffect,useState } from "react";



export const FetchAdminProducts = () => {

    const [products, setProducts] = useState([]);


    useEffect(() => {

        const fetchAllProducts = async () => {
            
            try {
                const response = await fetch('http://localhost:5000/api/product/all');
                const data = await response.json();
                if (response.ok) {
                    console.log(data.data)
                    setProducts(data.data);
                } else {
                    console.error('Error fetching Ayurvedic products:', data.message);
                }
            } catch (error) {
                console.error('Error fetching Ayurvedic products:', error.message);
            }
        
            
        };
        fetchAllProducts();
    }, []);
    
    
    
return {products}

  
}


