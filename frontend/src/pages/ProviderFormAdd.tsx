import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { addProvider } from "../services/api";
import { ElectricityProvider } from "../type/ElectricityProvider";

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
    await addProvider(provider);
    setProvider({ name: "", country: "", marketShare: 0, renewablePercentage: 0, yearlyRevenue: 0 });
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-[#F7F7F7]">Add Electricity Provider</h1>
      <input name="name"  onChange={handleChange} placeholder="Name" className="border p-2 w-full"/>
      <input name="country"  onChange={handleChange} placeholder="Country" className="border p-2 w-full"/>
      <input type="number" name="marketShare"  onChange={handleChange} placeholder="Market Share %" className="border p-2 w-full"/>
      <input type="number" name="renewablePercentage"  onChange={handleChange} placeholder="Renewable %" className="border p-2 w-full"/>
      <input type="number" name="yearlyRevenue" onChange={handleChange} placeholder="Revenue (€)" className="border p-2 w-full"/>
      <div className="gap-4 flex"> 
        <Button type="submit" variant={"outline"} onClick={() => navigate("/")}>Submit</Button>
        <Button type="submit" variant={"destructive"} onClick={() => navigate("/")}>Cancel</Button>
      </div>
    </form>
  );
};

export default ProviderFormAdd;
