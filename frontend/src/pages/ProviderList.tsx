import { Button } from "@/components/ui/button";
import { EnergyPieChart, MarketPieChart } from "@/components/ui/pieCharts"
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProviders, deleteProvider } from "../services/api";
import { ElectricityProvider } from "../type/ElectricityProvider";
import Filters from "../components/Filters"

interface FilterType {
  name?: string;
  country?: string;
  marketShareMin?: number;
  marketShareMax?: number;
  revenueMin?: number;
  revenueMax?: number;
  renewableMin?: number;
  renewableMax?: number;
}

const ProviderList = () => {
  const [providers, setProviders] = useState<ElectricityProvider[]>([]);
  const [filters, setFilters] = useState<FilterType>({});
  const navigate = useNavigate();

  const { loggedInUser, logout } = useAuth();

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

  const maxRevenue = Math.max(...providers.map(p => p.yearlyRevenue));

  return (
    <div className="p-6">
      <div  className="flex justify-between items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold text-[#F7F3E3] select-none w-full">Electricity Providers</h1>
        <Filters
          onFilterChange={(newFilters: FilterType) => setFilters(newFilters)}
          maxRevenue={maxRevenue}
        />
        <div className="flex gap-4">
          {loggedInUser ? ( 
            <div className="flex gap-4">
              <Button variant={"default"} onClick={logout} className="border border-[#F7F3E3]">Logout</Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button variant={"default"} onClick={() => navigate("/login")} className="border border-[#F7F3E3]">Login</Button>
              <Button variant={"secondary"} onClick={() => navigate("/register")}>Register</Button>
            </div>
          )}
        </div>
      </div>
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
                <EnergyPieChart renewableEnergyPercent={provider.renewablePercentage} />
                <MarketPieChart marketShare={provider.marketShare} />
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
