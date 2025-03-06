"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface PieChartProps {
  renewableEnergyPercent: number;
}

export function EnergyPieChart( {renewableEnergyPercent}: PieChartProps) {
    const data = [
      { name: "Renewable Energy", value: renewableEnergyPercent },
      { name: "Others", value: 100 - renewableEnergyPercent },
    ];
  
    const COLORS = ["#FE5F55", "#DF2935"]; 
  
    return (
      <Card className="w-full max-w-md bg-[#171717] border-[#2c2c2c]">
        <CardHeader>
          <CardTitle className="text-[#F7F3E3]">Renewable Energy (%)</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
}
  
interface MarketPieChartProps {
    marketShare: number;
}
  
export function MarketPieChart({ marketShare}: MarketPieChartProps ) {
  
    const data = [
      { name: "Market Share", value: marketShare },
      { name: "Others", value: 100 - marketShare }, 
    ];
  
    const COLORS = ["#FE5F55", "#DF2935"]; 
  
    return (
      <Card className="w-full max-w-md bg-[#171717] border-[#2c2c2c]">
        <CardHeader>
          <CardTitle className="text-[#F7F3E3]">Energy Usage Breakdown (%)</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }