import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { updateProvider, getProviderById } from "../services/api";
import { ElectricityProvider } from "../type/ElectricityProvider";
import { toast } from "react-toastify";
import { validateProvider } from "@/utils/FormValidation";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateProvider(provider)) return;
    
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
      <h1 className="text-2xl font-bold text-[#F7F3E3]">Edit Electricity Provider</h1>
      <input name="name" value={provider.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full rounded-lg text-[#F7F3E3] border-[#2c2c2c] bg-[#171717] shadow-lg" />
      <input name="country" value={provider.country} onChange={handleChange} placeholder="Country" className="border p-2 w-full rounded-lg text-[#F7F3E3] border-[#2c2c2c] bg-[#171717] shadow-lg" />
      <input type="number" name="marketShare" value={provider.marketShare} onChange={handleChange} placeholder="Market Share %" className="border p-2 w-full rounded-lg text-[#F7F3E3] border-[#2c2c2c] bg-[#171717] shadow-lg" />
      <input type="number" name="renewablePercentage" value={provider.renewablePercentage} onChange={handleChange} placeholder="Renewable %" className="border p-2 w-full rounded-lg text-[#F7F3E3] border-[#2c2c2c] bg-[#171717] shadow-lg" />
      <input type="number" name="yearlyRevenue" value={provider.yearlyRevenue} onChange={handleChange} placeholder="Revenue ($)" className="border p-2 w-full rounded-lg text-[#F7F3E3] border-[#2c2c2c] bg-[#171717] shadow-lg" />
      <div className="gap-4 flex"> 
        <Button 
          type="submit" 
          variant={"default"}
          className="border border-[#F7F3E3]"
          >Save
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

export default ProviderFormEdit;
