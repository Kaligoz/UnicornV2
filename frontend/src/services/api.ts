import axios from "axios";
import { ElectricityProvider } from "../type/ElectricityProvider";

const API_URL = "http://localhost:5000/providers";

export const getProviders = async () => {
  const response = await axios.get<ElectricityProvider[]>(API_URL);
  return response.data;
};

export const addProvider = async (providerData: {
    id?: string; 
    name: string;
    country: string;
    marketShare: number;
    renewablePercentage: number;
    yearlyRevenue: number;
  }) => {
    
    try {
      const { id, ...dataWithoutId } = providerData;
  
      const response = await axios.post(API_URL, dataWithoutId, {
        headers: { "Content-Type": "application/json" },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error adding provider:", error);
      throw error;
    }
};
  

export const updateProvider = async (id: string, provider: ElectricityProvider) => {
    try {
      const response = await axios.put( `${API_URL}/${id}`, provider);
      return response.data; 
    } catch (error) {
      console.error("Error updating provider:", error);
      throw error;
    }
};

export const deleteProvider = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getProviderById = async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching provider:', error);
      throw error;
    }
};