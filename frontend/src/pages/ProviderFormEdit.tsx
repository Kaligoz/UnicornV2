import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { updateProvider, getProviderById } from "../services/api";
import { ElectricityProvider } from "../type/ElectricityProvider";
import { toast } from "react-toastify";

const ProviderFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState<ElectricityProvider>({
    name: "",
    country: "",
    marketShare: 0,
    renewablePercentage: 0,
    yearlyRevenue: 0,
  });

  useEffect(() => {
    const fetchProvider = async () => {
      if (!id) return;
      try {
        const data = await getProviderById(id);
        setProvider(() => data);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching provider, please try again!")
      }
    };
    fetchProvider();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvider({ ...provider, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if(!provider.name || !provider.country || provider.marketShare <= 0 || provider.renewablePercentage <= 0 || provider.yearlyRevenue <= 0) {
      toast.error("Please fill in all fields!")
      return false;
    } 
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    
    if (!id) return;
    try {
      await updateProvider(id, provider); 
      navigate("/");
      toast.success("Successfully edited a provider!")
    } catch (err) {
      console.error(err);
      toast.error("Error updating provider, please try again!")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-[#F7F7F7]">Edit Electricity Provider</h1>
      <input name="name" value={provider.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
      <input name="country" value={provider.country} onChange={handleChange} placeholder="Country" className="border p-2 w-full" />
      <input type="number" name="marketShare" value={provider.marketShare} onChange={handleChange} placeholder="Market Share %" className="border p-2 w-full" />
      <input type="number" name="renewablePercentage" value={provider.renewablePercentage} onChange={handleChange} placeholder="Renewable %" className="border p-2 w-full" />
      <input type="number" name="yearlyRevenue" value={provider.yearlyRevenue} onChange={handleChange} placeholder="Revenue (€)" className="border p-2 w-full" />
      <div className="gap-4 flex"> 
        <Button type="submit" variant={"outline"}>Save</Button>
        <Button type="button" variant={"destructive"} onClick={() => navigate("/")}>Cancel</Button>
      </div>
    </form>
  );
};

export default ProviderFormEdit;
