import { FC } from 'react'
import Filters from './Filters';
import { Button } from './ui/button';
import { validateFilters, FilterType } from "../utils/filterValidation";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';

const Navbar: FC = ({}) => {

    const { loggedInUser, logout } = useAuth();

    const navigate = useNavigate();

    return (
        <nav className="bg-transparent bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.1)_1px)] bg-[size:8px_8px] backdrop-blur-md opacity-100 w-full fixed">
            <div  className="flex justify-between items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold text-[#F7F3E3] select-none w-full">Electricity Providers</h1>
                <Filters
                onFilterChange={(newFilters: FilterType) => {
                    const validatedFilters = validateFilters(newFilters);
                    if (validatedFilters) {
                    setFilters(validatedFilters);
                    }
                }}
                />;
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
        </nav>
    );
};

export default Navbar