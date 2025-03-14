import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { toast } from "react-toastify";

const ProviderLogin = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value 
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      login(res.data.token);
      toast.success("Successfully logged in!");

      navigate("/");
    } catch (err) {
      const errorMessage = (err as Error).message || "Failed to login - wrong credentials!";
      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-[#171717]">
      <div className="bg-[#171717] p-8 rounded-md shadow-lg w-96 border broder-[#F7F3E3]">
        <h2 className="text-2xl text-[#F7F3E3] font-bold text-center mb-4">
          Login form
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col space-y-4 mb-4">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
            required
            className="p-2 border rounded bg-[#2c2c2c] text-[#F7F3E3]"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="p-2 border rounded bg-[#2c2c2c] text-[#F7F3E3]"
          />
          <Button variant={"outline"} type="submit" className="w-full bg-[#F7F3E3] hover:bg-[#f7f4e8]">
            Login
          </Button>
        </form>
        <div className='text-[#F7F3E3] flex flex-col items-center'>
            <p>Don't have an account?</p>
            <Button 
              variant={"link"} 
              onClick={() => navigate("/register")} 
              className='text-[#F7F3E3]'
            >Register here</Button>
          </div>
      </div>
    </div>
  );
};

export default ProviderLogin;
