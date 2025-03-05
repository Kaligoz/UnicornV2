import { useEffect, useState } from "react";
import { getProviders, deleteProvider } from "../services/api";
import { ElectricityProvider } from "../type/ElectricityProvider";

const ProviderList = () => {
  const [providers, setProviders] = useState<ElectricityProvider[]>([]);

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
      <h1 className="text-2xl font-bold mb-4">Electricity Providers</h1>
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
            <button
              onClick={() => handleDelete(provider._id!)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProviderList;
