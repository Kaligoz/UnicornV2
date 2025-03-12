import { Button } from "@/components/ui/button";
import { EnergyPieChart, MarketPieChart } from "@/components/ui/pieCharts"
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProviders, deleteProvider } from "../services/api";
import { ElectricityProvider } from "../type/ElectricityProvider";
import { FilterType } from "../type/FilterType";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/components/AuthContext";
import { colorPresets } from "@/type/ColorThemes";

const ProviderList = () => {
  const [providers, setProviders] = useState<ElectricityProvider[]>([]);
  const [filters, setFilters] = useState<FilterType>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try{
      const data = await getProviders();
      setProviders(data);
    } catch (error) {
      toast.error("Failed to fetch provider data.");
      console.error("Error fetching provider:", error);
    }
  };

  const filteredProviders = providers.filter(provider => {
    return (
      (filters.name ? provider.name.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
      (filters.country ? provider.country.toLowerCase().includes(filters.country.toLowerCase()) : true) &&
      (filters.marketShareMin !== undefined ? provider.marketShare >= filters.marketShareMin : true) &&
      (filters.marketShareMax !== undefined ? provider.marketShare <= filters.marketShareMax : true) &&
      (filters.revenueMin !== undefined ? provider.yearlyRevenue >= filters.revenueMin : true) &&
      (filters.revenueMax !== undefined ? provider.yearlyRevenue <= filters.revenueMax : true) &&
      (filters.renewableMin !== undefined ? provider.renewablePercentage >= filters.renewableMin : true) &&
      (filters.renewableMax !== undefined ? provider.renewablePercentage <= filters.renewableMax : true)
    );
  });

  const handleDelete = async (id: string) => {
    try{
      await deleteProvider(id);
      fetchProviders();
      toast.success("Provider successfully deleted!");
    } catch (error) {
      toast.error("Failed to delete provider.");
      console.error("Error deleting provider:", error);
    }
  };

  const getProviderColor = (providerName: string): keyof typeof colorPresets => {
    const storedColor = localStorage.getItem(`color-${providerName}`);
    return (storedColor && storedColor in colorPresets ? storedColor : "blue") as keyof typeof colorPresets;
  };


  const { loggedInUser, logout } = useAuth();

  const maxRevenue = Math.max(...providers.map(p => p.yearlyRevenue));

  return (
    <div className="p-6">
      <Navbar 
        setFilters={setFilters}
        maxRevenue={maxRevenue}
        loggedInUser={loggedInUser}
        logout={logout}
        navigate={navigate}
      />
      <div className="mt-16"></div>
      {loggedInUser && (  
        <Button variant={"default"} onClick={() => navigate("/add")} className="border border-[#F7F3E3] mb-4">Add</Button>
      )}
  <ul className="space-y-2">
      {filteredProviders.length > 0 ? (
        filteredProviders.map((provider) => (
          <li key={provider._id} className="p-2 flex flex-col justify-between">
            <div className="mb-2" style={{ height: '1px', background: 'linear-gradient(to right, #F7F3E3, transparent)' }}></div>
            <h2 className="text-lg font-semibold text-[#F7F3E3] mb-2">{provider.name}</h2>
            <div className="grid grid-cols-2 grid-rows-1 mb-4 gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-[#F7F3E3] border border-[#2c2c2c] bg-[#171717] rounded-md p-2 shadow-lg"><span className="font-semibold">Country:</span> {provider.country}</p>
                <p className="text-[#F7F3E3] border border-[#2c2c2c] bg-[#171717] rounded-md p-2 shadow-lg"><span className="font-semibold">Yearly Revenue:</span> ${provider.yearlyRevenue}</p>
                <p className="text-[#F7F3E3] border border-[#2c2c2c] bg-[#171717] rounded-md p-2 shadow-lg"><span className="font-semibold">Market Share:</span> {provider.marketShare}%</p>
                <p className="text-[#F7F3E3] border border-[#2c2c2c] bg-[#171717] rounded-md p-2 shadow-lg mb-4"><span className="font-semibold">Renewable Energy:</span> {provider.renewablePercentage}%</p>
                <div className="flex gap-4">
                  {loggedInUser && (
                    <>
                      <Button
                        onClick={() => handleDelete(provider._id!)}
                        variant={"secondary"}
                        className="bg-[#F7F3E3]"
                      >
                        Delete
                      </Button>
                      <Button 
                        variant={"default"} 
                        className="border border-[#F7F3E3] mb-4"
                        onClick={() => navigate(`/edit/${provider._id}`)}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-4 select-none w-full">
                <EnergyPieChart  renewableEnergyPercent={provider.renewablePercentage} colorTheme={getProviderColor(provider.name) as keyof typeof colorPresets} />
                <MarketPieChart  marketShare={provider.marketShare} colorTheme={getProviderColor(provider.name) as keyof typeof colorPresets} />
              </div>
            </div>
          </li>
        ))
      ) : (
        <p className="text-[#F7F3E3]">No providers match the filters.</p>
      )}
    </ul>
  </div>
  );
};

export default ProviderList;
