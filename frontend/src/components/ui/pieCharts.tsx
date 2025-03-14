"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { colorPresets }from "@/type/ColorThemes"

interface PieChartProps {
  renewableEnergyPercent: number;
  colorTheme: keyof typeof colorPresets;
};

export function EnergyPieChart( {renewableEnergyPercent, colorTheme}: PieChartProps) {

    const data = [
      { name: "Renewable Energy", value: renewableEnergyPercent },
      { name: "Others", value: 100 - renewableEnergyPercent },
    ];
  
    const COLORS = colorPresets[colorTheme] || colorPresets.red;
  
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
                    innerRadius="50%"
                    outerRadius="80%"
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
};
  
interface MarketPieChartProps {
    marketShare: number;
    colorTheme: keyof typeof colorPresets;
};
  
export function MarketPieChart({ marketShare, colorTheme}: MarketPieChartProps ) {

    const data = [
      { name: "Market Share", value: marketShare },
      { name: "Others", value: 100 - marketShare }, 
    ];
  
    const COLORS = colorPresets[colorTheme] || colorPresets.red;
  
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
                    innerRadius="50%"
                    outerRadius="80%"
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
};