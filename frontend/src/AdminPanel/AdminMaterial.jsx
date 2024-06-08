import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

export const AdminMaterial = () => {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchAllMaterials();
    }, []);

    const fetchAllMaterials = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/material/allmaterials');
            const data = await response.json();
            if (response.ok) {
                setMaterials(data.data);
            } else {
                console.error('Error fetching materials:', data.message);
            }
        } catch (error) {
            console.error('Error fetching materials:', error.message);
        }
    };

    const rows = materials.map(material => ({
        id: material._id,
        materialName: material.materialName,
        quantity: material.quantity,
        price: material.price,
        description: material.description,
        givenBy: `${material.givenBy.firstName} ${material.givenBy.lastName}`,
        mobileNumber: material.givenBy.mobileNumber,
        address: `${material.givenBy.deliveryAddress.addressL1}, ${material.givenBy.deliveryAddress.addressL2}, ${material.givenBy.deliveryAddress.addressL3}`,
        images: material.images
    }));

    const columns = [
        { field: 'materialName', headerName: 'Material Name', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'givenBy', headerName: 'Given By', width: 150 },
        { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
        { field: 'address', headerName: 'Address', width: 300 },
        { 
            field: 'images', 
            headerName: 'Images',
            width: 200,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.images.map((image, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000${image}`} 
                                alt={`Material Image ${index + 1}`} 
                                style={{ width: 100, height: 100, marginRight: 10 }}
                                onError={(e) => {
                                    console.error(`Failed to load image ${index}: ${e.target.src}`);
                                    e.target.onerror = null;
                                }}
                            />
                        ))}
                    </div>
                );
            },
        }
    ];

    return (
        <Box sx={{ backgroundColor: 'white', margin: '20px auto', width: '90%', height: '600px' }}>
            <Typography variant="h4" gutterBottom>Material List</Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
            />
        </Box>
    );
};
