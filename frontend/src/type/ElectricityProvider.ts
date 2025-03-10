export interface ElectricityProvider {
    _id?: string;
    name: string;
    country: string;
    marketShare: number;
    renewablePercentage: number;
    yearlyRevenue: number;
}
  