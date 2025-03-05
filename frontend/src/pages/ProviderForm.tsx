import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProvider } from "../services/api";
import { ElectricityProvider } from "../type/ElectricityProvider";

const ProviderForm = () => {
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
      <h1 className="text-2xl font-bold">Add Electricity Provider</h1>
      <input name="name" value={provider.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full"/>
      <input name="country" value={provider.country} onChange={handleChange} placeholder="Country" className="border p-2 w-full"/>
      <input type="number" name="marketShare" value={provider.marketShare} onChange={handleChange} placeholder="Market Share %" className="border p-2 w-full"/>
      <input type="number" name="renewablePercentage" value={provider.renewablePercentage} onChange={handleChange} placeholder="Renewable %" className="border p-2 w-full"/>
      <input type="number" name="yearlyRevenue" value={provider.yearlyRevenue} onChange={handleChange} placeholder="Revenue (€)" className="border p-2 w-full"/>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate("/")}>Submit</button>
    </form>
  );
};

export default ProviderForm;
