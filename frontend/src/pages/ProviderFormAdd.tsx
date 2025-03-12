import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { addProvider } from "../services/api";
import { ElectricityProvider } from "../type/ElectricityProvider";
import { toast } from "react-toastify";
import { validateProvider } from "@/utils/FormValidation";

const ProviderFormAdd = () => {
  const [provider, setProvider] = useState<ElectricityProvider>({
    name: "",
    country: "",
    marketShare: 0,
    renewablePercentage: 0,
    yearlyRevenue: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvider({ ...provider, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const providerData = {
      name: provider.name,
      country: provider.country,
      marketShare: Number(provider.marketShare),  
      renewablePercentage: Number(provider.renewablePercentage),
      yearlyRevenue: Number(provider.yearlyRevenue)
    };

    if (!validateProvider(provider)) return;

    try {
      await addProvider(providerData);
      setProvider({ name: "", country: "", marketShare: 0, renewablePercentage: 0, yearlyRevenue: 0 });
      toast.success("Successfully added a provider!");
      navigate("/")
    } catch (err) {
      console.error(err);
      toast.error("Failed to add a provider, please try again later!")
    }
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-[#F7F3E3]">Add Electricity Provider</h1>
      <input name="name"  onChange={handleChange} placeholder="Name" className="border p-2 w-full rounded-lg border-[#2c2c2c] bg-[#171717] text-[#F7F3E3] shadow-lg"/>
      <input name="country"  onChange={handleChange} placeholder="Country" className="border p-2 w-full rounded-lg border-[#2c2c2c] bg-[#171717] text-[#F7F3E3] shadow-lg"/>
      <input type="number" name="marketShare"  onChange={handleChange} placeholder="Market Share %" className="border p-2 w-full rounded-lg border-[#2c2c2c] bg-[#171717] text-[#F7F3E3] shadow-lg"/>
      <input type="number" name="renewablePercentage"  onChange={handleChange} placeholder="Renewable %" className="border p-2 w-full rounded-lg border-[#2c2c2c] bg-[#171717] text-[#F7F3E3] shadow-lg"/>
      <input type="number" name="yearlyRevenue" onChange={handleChange} placeholder="Revenue ($)" className="border p-2 w-full rounded-lg border-[#2c2c2c] bg-[#171717] text-[#F7F3E3] shadow-lg"/>
      <div className="gap-4 flex"> 
      <Button 
          type="submit" 
          variant={"default"}
          className="border border-[#F7F3E3]"
          >Submit
        </Button>
        <Button 
          type="button" 
          variant={"secondary"}
          className="bg-[#F7F3E3]"
          onClick={() => navigate("/")}
          >Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProviderFormAdd;
