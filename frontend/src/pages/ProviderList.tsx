import { Button } from "@/components/ui/button";
import { EnergyPieChart, MarketPieChart } from "@/components/ui/pieCharts"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProviders, deleteProvider } from "../services/api";
import { ElectricityProvider } from "../type/ElectricityProvider";

const ProviderList = () => {
  const [providers, setProviders] = useState<ElectricityProvider[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    const data = await getProviders();
    setProviders(data);
  };

  const handleDelete = async (id: string) => {
    await deleteProvider(id);
    fetchProviders();
  };

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Electricity Providers</h1>
        <div className="gap-4 flex">
          <Button variant={"outline"} onClick={() => navigate("/add")} className="mb-4">Add</Button>
          <Button variant={"outline"} onClick={() => navigate("/search")}>Search</Button>

        <div className="ml-auto flex gap-4">
            <Button variant={"outline"} onClick={() => navigate("/login")} className="mb-4">Login</Button>
            <Button variant={"secondary"} onClick={() => navigate("/register")} className="mb-4">Register</Button>
        </div>
</div>

      </div>
      <ul className="space-y-2">
        {providers.map((provider) => (
          <li key={provider._id} className="border p-4 rounded flex justify-between">
            <div>
              <h2 className="text-lg font-semibold">{provider.name}</h2>
              <p>Country: {provider.country}</p>
              <p>Market Share: {provider.marketShare}%</p>
              <p>Renewable: {provider.renewablePercentage}%</p>
              <p>Revenue: €{provider.yearlyRevenue}</p>
            </div>
            <div className="flex gap-4">
              <EnergyPieChart renewableEnergyPercent={provider.renewablePercentage} />
              <MarketPieChart marketShare={provider.marketShare} />
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => handleDelete(provider._id!)}
                variant={"destructive"}
              >
                Delete
              </Button>
              <Button 
                variant={"outline"} 
                onClick={() => navigate(`/edit/${provider._id}`)} 
                className="mb-4"
              >
                Edit
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProviderList;
