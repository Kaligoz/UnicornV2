import { toast } from "react-toastify";
import { ElectricityProvider } from "../type/ElectricityProvider";

export const validateProvider = (provider: ElectricityProvider): boolean => {
    if(!provider.name || !provider.country || !provider.marketShare || !provider.renewablePercentage || !provider.yearlyRevenue) {
      toast.error("Please fill in all fields!")
      return false;
    } 
    if(provider.marketShare < 0){
      toast.error("Market share cannot be negative")
      return false;
    }
    if(provider.renewablePercentage < 0){
      toast.error("Renewable energy percentage cannot be negative")
      return false;
    }
    if(provider.yearlyRevenue < 0){
      toast.error("Yearly revenue cannot be negative")
      return false;
    }
    if( provider.renewablePercentage > 100 || provider.marketShare > 100) {
      toast.error("Please fill in possible numbers!")
      return false;
    }
    return true;
};