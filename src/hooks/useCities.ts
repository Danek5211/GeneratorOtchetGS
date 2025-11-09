import { useState } from 'react';
import type { CityData } from '../types';
import { createEmptyParsedData } from '../utils';

const createEmptyCity = (name: string = ''): CityData => ({
    name,
    leaderReports: [''],
    parsedData: createEmptyParsedData(),
    leaderAppointment: '',
    leaderBans: '',
    leaderWarnings: '',
    leaderRemoval: '',
    leaderEvaluation: ''
});

export const useCities = () => {
    const [cities, setCities] = useState<CityData[]>([]);

    const addCity = () => {
        setCities([...cities, createEmptyCity()]);
    };

    const removeCity = (index: number) => {
        const newCities = [...cities];
        newCities.splice(index, 1);
        setCities(newCities);
    };

    const updateCity = (cityIndex: number, field: keyof CityData, value: any) => {
        const newCities = [...cities];
        newCities[cityIndex] = {
            ...newCities[cityIndex],
            [field]: value
        };
        setCities(newCities);
    };

    const updateParsedData = (cityIndex: number, field: string, value: any) => {
        const newCities = [...cities];
        newCities[cityIndex].parsedData = {
            ...newCities[cityIndex].parsedData,
            [field]: value
        };
        setCities(newCities);
    };

    const clearCityData = (cityIndex: number) => {
        const newCities = [...cities];
        newCities[cityIndex].parsedData = createEmptyParsedData();
        newCities[cityIndex].leaderReports = [''];
        setCities(newCities);
    };

    return {
        cities,
        setCities,
        addCity,
        removeCity,
        updateCity,
        updateParsedData,
        clearCityData
    };
};