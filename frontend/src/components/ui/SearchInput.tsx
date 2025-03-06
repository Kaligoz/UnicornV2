import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';

export function SearchInput() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="search" className="text-[#F7F7F7] w-full"/>
      <Button variant={"default"} type="submit" className="border border-[#f7f7f7]"><Search /></Button>
    </div>
  )
}
