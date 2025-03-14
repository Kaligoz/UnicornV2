import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { updateProvider, getProviderById } from "../services/api";
import { ElectricityProvider } from "../type/ElectricityProvider";
import { toast } from "react-toastify";
import { validateProvider } from "@/utils/FormValidation";
import { colorPresets } from "@/type/ColorThemes";

const ProviderFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [colorTheme, setColorTheme] = useState<keyof typeof colorPresets>("red");

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
        const storedColor = localStorage.getItem(`color-${data.name}`);
        if (storedColor && storedColor in colorPresets) {
          setColorTheme(storedColor as keyof typeof colorPresets);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching provider, please try again!")
      }
    };
    fetchProvider();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
  
    setProvider((prevProvider) => ({
      ...prevProvider,
      [name]: type === "number" ? Number(value) || 0 : value,
    }));
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

    if (!validateProvider(providerData)) return;
    
    if (!id) return;
    try {
      await updateProvider(id, providerData); 
      localStorage.setItem(`color-${provider.name}`, colorTheme);
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
      <div>
        <label className="text-[#F7F3E3]">
          Select Chart Color:
          <select
            className="ml-2 p-1 bg-[#2c2c2c] text-[#F7F3E3] rounded"
            value={colorTheme}
            onChange={(e) => setColorTheme(e.target.value as keyof typeof colorPresets)}
          >
            {Object.keys(colorPresets).map((theme) => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </div>
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
