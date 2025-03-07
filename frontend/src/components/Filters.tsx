import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover" 
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Button } from "./ui/button";

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
}

const Filters = ({ onFilterChange }: FiltersProps) => {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [marketShareMin, setMarketShareMin] = useState<number | undefined>();
    const [marketShareMax, setMarketShareMax] = useState<number | undefined>();
    const [revenueMin, setRevenueMin] = useState<number | undefined>();
    const [revenueMax, setRevenueMax] = useState<number | undefined>();
    const [renewableMin, setRenewableMin] = useState<number | undefined>();
    const [renewableMax, setRenewableMax] = useState<number | undefined>();

    const handleApplyFilters = () => {
        onFilterChange({ name, country, marketShareMin, marketShareMax, revenueMin, revenueMax, renewableMin, renewableMax });
    };

    return (
        <Popover>
            <PopoverTrigger 
            className=" h-9 px-4 py-2 border border-[#F7F3E3] text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center 
            justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 
            focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0" >
                Filters
            </PopoverTrigger>
            <PopoverContent className="bg-[#171717] border-[#2c2c2c]">
                <div className="grid grid-cols-1 grid-rows-6 w-full max-w-sm gap-1.5">

                    <div>
                        <Label htmlFor="name" className="text-[#F7F3E3]">Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} id="name" className="text-[#F7F3E3] border-[#F7F3E3]"/>
                    </div>
                    
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="country" className="text-[#F7F3E3]">Country</Label>
                        <Input value={country} onChange={(e) => setCountry(e.target.value)} id="country" className="text-[#F7F3E3] border-[#F7F3E3]"/>
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="Market Share" className="text-[#F7F3E3]">Market Share</Label>
                        <div className="flex gap-1">
                            <Input type="number" value={marketShareMin ?? ""} onChange={(e) => setMarketShareMin(Number(e.target.value) || undefined)} className="text-[#F7F3E3] border-[#F7F3E3]"/>
                            <p className="text-[#F7F3E3] font-bold "> - </p>
                            <Input type="number" value={marketShareMax ?? ""} onChange={(e) => setMarketShareMax(Number(e.target.value) || undefined)} className="text-[#F7F3E3] border-[#F7F3E3]"/>
                        </div>
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="Yearly Revenue" className="text-[#F7F3E3]">Yearly Revenue</Label>
                        <div className="flex gap-1">
                            <Input type="number"  value={revenueMin ?? ""} onChange={(e) => setRevenueMin(Number(e.target.value) || undefined)} className="text-[#F7F3E3] border-[#F7F3E3]"/>
                            <p className="text-[#F7F3E3] font-bold "> - </p>
                            <Input type="number" value={revenueMax ?? ""} onChange={(e) => setRevenueMax(Number(e.target.value) || undefined)}  className="text-[#F7F3E3] border-[#F7F3E3]"/>
                        </div>
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="Renewable Energy" className="text-[#F7F3E3]">Renewable Energy</Label>
                        <div className="flex gap-1">
                            <Input type="number" value={renewableMin ?? ""} onChange={(e) => setRenewableMin(Number(e.target.value) || undefined)}  className="text-[#F7F3E3] border-[#F7F3E3]"/>
                            <p className="text-[#F7F3E3] font-bold "> - </p>
                            <Input type="number" value={renewableMax ?? ""} onChange={(e) => setRenewableMax(Number(e.target.value) || undefined)}  className="text-[#F7F3E3] border-[#F7F3E3]"/>
                        </div>
                    </div>

                    <Button onClick={handleApplyFilters} className="border border-[#F7F3E3] mt-4">Apply Filters</Button>

                </div>
            </PopoverContent>
        </Popover>
    );
}

export default Filters