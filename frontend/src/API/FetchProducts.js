import React, { useEffect,useState } from "react";



export const FetchProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchAllProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/product/all');
                const data = await response.json();
                if (response.ok) {
                    console.log(data.data);
                    
                    setProducts(data.data);
                    
                } else {
                    console.error('Error fetching Ayurvedic products:', data.message);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Ayurvedic products:', error.message);
                setLoading(false);
            }
        
            
        };
        fetchAllProducts();
    }, []);
    
    
    
return {products, loading}

  
}


