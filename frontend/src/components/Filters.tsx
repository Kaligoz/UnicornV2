import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover" 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { DualRangeSlider } from './ui/dual-range-slider';
import { toast } from "react-toastify";

interface FiltersProps {
    onFilterChange: 
        (filters: { 
            name?: string; 
            country?: string; 
            marketShareMin?: number; 
            marketShareMax?: number; 
            revenueMin?: number; 
            revenueMax?: number; 
            renewableMin?: number; 
            renewableMax?: number
        }) => void;
        maxRevenue: number;
};

const Filters = ({ onFilterChange, maxRevenue }: FiltersProps) => {
    
    const [filters, setFilters] = useState({
        name: "",
        country: "",
        marketShare: [0, 100],
        renewableEnergy: [0, 100],
        revenue: [0, maxRevenue || 100],
    });

    useEffect(() => {
        if (maxRevenue) {
            setFilters((prev) => ({
                ...prev,
                revenue: [0, maxRevenue],
            }));
        }
    }, [maxRevenue]);

    const updateFilters = (key: string, value: any) => {
        setFilters((prev) => {
            const updated = { ...prev, [key]: value };
            return updated;
        });
    };

    const handleApplyFilters = () => {
        const appliedFilters = {
            name: filters.name,
            country: filters.country,
            marketShareMin: filters.marketShare[0],
            marketShareMax: filters.marketShare[1],
            renewableMin: filters.renewableEnergy[0],
            renewableMax: filters.renewableEnergy[1],
            revenueMin: filters.revenue[0],
            revenueMax: filters.revenue[1],
        };
        onFilterChange(appliedFilters);
        toast.success("Filters applied!");
    };

    const handleResetFilters = () => {
        const defaultFilters = {
            name: "",
            country: "",
            marketShare: [0, 100],
            renewableEnergy: [0, 100],
            revenue: [0, maxRevenue],
        };
        setFilters(defaultFilters);
        onFilterChange(defaultFilters);
        toast.success("Filters have been reset!");
    };

    return (
        <Popover>
            <PopoverTrigger 
            className="h-9 px-4 py-2 border border-[#F7F3E3] text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center 
            justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 
            focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0" >
                Filters
            </PopoverTrigger>
            <PopoverContent className="bg-[#171717] border-[#2c2c2c]">
                <div className="grid grid-cols-1 grid-rows-6 w-full max-w-sm gap-1.5">

                    <InputField label="Name" value={filters.name} onChange={(e) => updateFilters("name", e.target.value)} />

                    <InputField label="Country" value={filters.country} onChange={(e) => updateFilters("country", e.target.value)} />

                    <SliderField
                        label="Market Share"
                        value={filters.marketShare}
                        onChange={(value) => updateFilters("marketShare", value)}
                        min={0}
                        max={100}
                    />

                    <SliderField
                        label="Renewable Energy"
                        value={filters.renewableEnergy}
                        onChange={(value) => updateFilters("renewableEnergy", value)}
                        min={0}
                        max={100}
                    />

                    <SliderField 
                        label="Yearly Revenue" 
                        value={filters.revenue} 
                        onChange={(value) => updateFilters("revenue", value)} 
                        min={0} 
                        max={maxRevenue} 
                    />

                    <div className="flex justify-between">
                        <Button onClick={handleApplyFilters} className="border border-[#F7F3E3] mt-4">Apply Filters</Button>
                        <Button onClick={handleResetFilters} className="border border-[#F7F3E3] mt-4">Reset Filters</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

const InputField = ({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="grid gap-1.5">
        <Label className="text-[#F7F3E3]">{label}</Label>
        <Input value={value} onChange={onChange} className="text-[#F7F3E3] border-[#F7F3E3]" />
    </div>
);

const SliderField = ({ label, value, onChange, min, max }: { label: string; value: number[]; onChange: (val: number[]) => void; min: number; max: number }) => (
    <div className="grid gap-1.5">
        <Label className="text-[#F7F3E3]">{label}</Label>
        <div className="flex items-center gap-2">
            <DualRangeSlider 
                value={value} 
                onValueChange={onChange} 
                min={min} 
                max={max} 
                step={1}
                label={(val) => <span className="text-xs">{val}</span>}  
            />
        </div>
    </div>
);


export default Filters