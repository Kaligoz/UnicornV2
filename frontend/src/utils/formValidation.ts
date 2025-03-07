import { toast } from "react-toastify";
import { ElectricityProvider } from "../type/ElectricityProvider";

export const validateProvider = (provider: ElectricityProvider): boolean => {
    if(!provider.name || !provider.country || provider.marketShare <= 0 || provider.renewablePercentage <= 0 || provider.yearlyRevenue <= 0) {
      toast.error("Please fill in all fields!")
      return false;
    } 
    if( provider.renewablePercentage > 100 || provider.marketShare > 100) {
      toast.error("Please fill in possible numbers!")
      return false;
    }
    return true;
};