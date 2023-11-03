// CropContext.js
import React, { createContext, useEffect, useState } from 'react';

const CropContext = createContext();

const CropProvider = ({ children }) => {
    const [cropsData, setCropsData] = useState({});

    useEffect(() => {
        const storedCropsData = localStorage.getItem('cropsData');
        if (storedCropsData && Object.keys(storedCropsData).length !== 0) {
            setCropsData(JSON.parse(storedCropsData));
        }
    }, []);

    useEffect(() => {
        if (Object.keys(cropsData).length !== 0) {
            localStorage.setItem('cropsData', JSON.stringify(cropsData));
        }
    }, [cropsData]);

    return (
        <CropContext.Provider value={{ cropsData, setCropsData }}>
            {children}
        </CropContext.Provider>
    );
};

export { CropContext, CropProvider };
