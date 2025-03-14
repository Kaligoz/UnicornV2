import { toast } from "react-toastify";
import { ElectricityProvider } from "../type/ElectricityProvider";

export const validateProvider = (provider: ElectricityProvider): boolean => {
    if (
        !provider.name?.trim() || 
        !provider.country?.trim() || 
        provider.marketShare === undefined || 
        provider.renewablePercentage === undefined || 
        provider.yearlyRevenue === undefined
    ) {
        toast.error("Please fill in all fields!");
        return false;
    } 

    if (provider.marketShare < 0 || provider.renewablePercentage < 0 || provider.yearlyRevenue < 0) {
        toast.error("Values cannot be negative.");
        return false;
    }

    if (provider.marketShare > 100 || provider.renewablePercentage > 100) {
        toast.error("Market share and renewable percentage must be between 0 and 100.");
        return false;
    }

    return true;
};