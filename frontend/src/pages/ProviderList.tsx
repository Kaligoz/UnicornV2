import { Button } from "@/components/ui/button";
import { EnergyPieChart, MarketPieChart } from "@/components/ui/pieCharts"
import { useAuth } from "../components/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProviders, deleteProvider } from "../services/api";
import { ElectricityProvider } from "../type/ElectricityProvider";
import { Search } from 'lucide-react';

const ProviderList = () => {
  const [providers, setProviders] = useState<ElectricityProvider[]>([]);

  const navigate = useNavigate();

  const { loggedInUser, logout } = useAuth();

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
        <div  className="flex">
          <h1 className="text-2xl font-bold mb-4 text-[#F7F7F7] select-none">Electricity Providers</h1>
          <Button variant={"link"} onClick={() => navigate("/")} className="text-[#F7F7F7]"><Search /></Button>
        </div>
        <div className="gap-4 flex">
          {loggedInUser && (  
            <Button variant={"outline"} onClick={() => navigate("/add")} className="mb-4">Add</Button>
          )}
            {loggedInUser ? ( 
              <div className="ml-auto flex gap-4">
                <Button variant={"outline"} onClick={logout} className="mb-4">Logout</Button>
              </div>
            ) : (
              <div className="ml-auto flex gap-4">
                <Button variant={"outline"} onClick={() => navigate("/login")} className="mb-4">Login</Button>
                <Button variant={"secondary"} onClick={() => navigate("/register")} className="mb-4">Register</Button>
              </div>
            )}
        </div>
      </div>
      <ul className="space-y-2">
        {providers.map((provider) => (
          <li key={provider._id} className="border p-4 rounded flex justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#F7F7F7]">{provider.name}</h2>
              <p className="text-[#F7F7F7]">Country: {provider.country}</p>
              <p className="text-[#F7F7F7]">Market Share: {provider.marketShare}%</p>
              <p className="text-[#F7F7F7]">Renewable: {provider.renewablePercentage}%</p>
              <p className="text-[#F7F7F7]">Revenue: €{provider.yearlyRevenue}</p>
            </div>
            <div className="flex gap-4 select-none">
              <EnergyPieChart renewableEnergyPercent={provider.renewablePercentage} />
              <MarketPieChart marketShare={provider.marketShare} />
            </div>
            <div className="flex gap-4">
              {loggedInUser && (
                  <>
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
                  </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProviderList;
