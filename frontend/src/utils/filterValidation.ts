import { toast } from "react-toastify";

export interface FilterType {
    name?: string;
    country?: string;
    marketShareMin?: number;
    marketShareMax?: number;
    revenueMin?: number;
    revenueMax?: number;
    renewableMin?: number;
    renewableMax?: number;
}

export const validateFilters = (filters: FilterType): FilterType | null => {

    if(filters.marketShareMin !== undefined && filters.marketShareMin < 0){
        toast.error("Market Share Minimum cannot be negative.");
    }
    if(filters.marketShareMin !== undefined && filters.marketShareMin > 99){
        toast.error("Market Share Minimum cannot be higher then 99.");
    }
    if(filters.marketShareMax !== undefined && filters.marketShareMax < 0){
        toast.error("Market Share Maximum cannot be negative.");
    }
    if(filters.marketShareMax !== undefined && filters.marketShareMax > 100){
        toast.error("Market Share Maximum cannot be higher then 100.");
    }
    if (
        filters.marketShareMin !== undefined &&
        filters.marketShareMax !== undefined &&
        filters.marketShareMin > filters.marketShareMax
      ) {
        toast.error("Market Share Min cannot be greater than Market Share Max.");
    }

    if (filters.revenueMin !== undefined && filters.revenueMin < 0) {
        toast.error("Revenue Minimum cannot be negative.");
      }
      if (filters.revenueMax !== undefined && filters.revenueMax < 0) {
        toast.error("Revenue Maximum cannot be negative.");
      }
      if (
        filters.revenueMin !== undefined &&
        filters.revenueMax !== undefined &&
        filters.revenueMin > filters.revenueMax
      ) {
        toast.error("Revenue Min cannot be greater than Revenue Max.");
      }
      
      if (filters.renewableMin !== undefined && filters.renewableMin < 0) {
        toast.error("Renewable Energy Minimum cannot be negative.");
      }
      if(filters.renewableMax !== undefined && filters.renewableMax > 99){
        toast.error("Renewable Energy Minimum cannot be higher then 99.");
      }
      if (filters.renewableMax !== undefined && filters.renewableMax < 0) {
        toast.error("Renewable Energy Maximum cannot be negative.");
      }
      if(filters.renewableMax !== undefined && filters.renewableMax > 100){
        toast.error("Renewable Energy Maximum cannot be higher then 100.");
      }
      if (
        filters.renewableMin !== undefined &&
        filters.renewableMax !== undefined &&
        filters.renewableMin > filters.renewableMax
      ) {
        toast.error("Renewable Min cannot be greater than Renewable Max.");
      }

    return {
        name: filters.name?.trim() || undefined,
        country: filters.country?.trim() || undefined,
        marketShareMin: filters.marketShareMin,
        marketShareMax: filters.marketShareMax,
        revenueMin: filters.revenueMin,
        revenueMax: filters.revenueMax,
        renewableMin: filters.renewableMin,
        renewableMax: filters.renewableMax,
    };
};