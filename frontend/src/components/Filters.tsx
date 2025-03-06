import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Filters = () => {
  return (
    <Popover>
        <PopoverTrigger>
            <Button variant={"default"} className="border border-[#F7F3E3]">Filters</Button>
        </PopoverTrigger>
        <PopoverContent className="bg-[#171717] border-[#2c2c2c]">
            <div className="grid grid-cols-1 grid-rows-5 w-full max-w-sm items-center gap-1.5">

                <div>
                    <Label htmlFor="Name" className="text-[#F7F3E3]">Name</Label>
                    <Input type="name" id="name" className="text-[#F7F3E3] border-[#F7F3E3]"/>
                </div>
                
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Country" className="text-[#F7F3E3]">Country</Label>
                    <Input type="country" id="country" className="text-[#F7F3E3] border-[#F7F3E3]"/>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Market Share" className="text-[#F7F3E3]">Market Share</Label>
                    <div className="flex gap-1">
                        <Input type="frommarketshare" id="marketshare" className="text-[#F7F3E3] border-[#F7F3E3]"/>
                        <p className="text-[#F7F3E3] font-bold "> - </p>
                        <Input type="tomarketshare" id="marketshare" className="text-[#F7F3E3] border-[#F7F3E3]"/>
                    </div>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Yearly Revenue" className="text-[#F7F3E3]">Yearly Revenue</Label>
                    <div className="flex gap-1">
                        <Input type="country" id="country" className="text-[#F7F3E3] border-[#F7F3E3]"/>
                        <p className="text-[#F7F3E3] font-bold "> - </p>
                        <Input type="country" id="country" className="text-[#F7F3E3] border-[#F7F3E3]"/>
                    </div>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="Renewable Energy" className="text-[#F7F3E3]">Renewable Energy</Label>
                    <div className="flex gap-1">
                        <Input type="country" id="country" className="text-[#F7F3E3] border-[#F7F3E3]"/>
                        <p className="text-[#F7F3E3] font-bold "> - </p>
                        <Input type="country" id="country" className="text-[#F7F3E3] border-[#F7F3E3]"/>
                    </div>
                </div>
            </div>
        </PopoverContent>
    </Popover>
  );
}

export default Filters