import { Button } from './ui/button';
import Filters from './Filters';
import { FilterType } from "../type/FilterType";

interface NavbarProps {
  setFilters: (newFilters: FilterType) => void;
  maxRevenue: number;
  loggedInUser: any; 
  logout: () => void;
  navigate: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({setFilters, maxRevenue, loggedInUser, logout, navigate }) => {
    return (
        <div className="fixed w-full top-0 left-0 z-50 p-4 bg-transparent bg-[radial-gradient(transparent_1px,var(--token-f32baa44-90b8-42a5-8bca-ffba9d95b23a,#171717)_1px)] bg-[size:4px_4px] backdrop-blur-[3px] opacity-100 mask-[linear-gradient(rgb(0,0,0)_60%,rgba(0,0,0,0)_100%)]">
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
        </div>
    );
}

export default Navbar