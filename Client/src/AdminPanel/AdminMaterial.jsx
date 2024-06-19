import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import config from '../config';

export const AdminMaterial = () => {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchAllMaterials();
    }, []);

    const fetchAllMaterials = async () => {
        try {
            const response = await fetch(`${config.baseURL}/api/material/allmaterials`);
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
        { field: 'description', headerName: 'Description', width: 250 },
        { field: 'givenBy', headerName: 'Supplier name', width: 150 },
        { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
        { field: 'address', headerName: 'Address', width: 250 },
        { 
            field: 'images', 
            headerName: 'Images',
            width: 300,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.images.map((image, index) => (
                            <img
                                key={index}
                                src={`${config.baseURL}${image}`} 
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
        <Box sx={{   width: '100%', height: 'auto',  }}>
            <Typography variant="h4" padding='25px'>Materials that users can supply</Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                getRowHeight={() => 'auto'}
                sx={{ backgroundColor: 'white', margin:{xs:'0px 5px', sm:'0 25px '}}}
            />
        </Box>
    );
};
