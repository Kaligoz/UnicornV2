import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { useAuth } from "@/components/AuthContext";

const ProviderRegister = ({}) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { username, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => 
  setFormData({ ...formData, [e.target.name]: e.target.value 
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5000/auth/register', {
            username,
            password
        });
        setMessage('Registered successfully'); 

        localStorage.setItem("token", res.data.token);
        login(res.data.token);

        navigate("/");
    } catch (err) {
        console.error(err);
        setMessage('Failed to register, User already exists'); 
    }
  };
  
  return(
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-md shadow-lg w-96">
        <h2 className="text-2xl text-[#F7F7F7] font-bold text-center mb-4">
          Register form
        </h2>
        {message && (
          <p className="text-center text-red-500 mb-4">{message}</p>
        )}
        <form onSubmit={onSubmit} className="flex flex-col space-y-4 mb-4">
          <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            value={username} 
            onChange={onChange} 
            required 
            className="p-2 border rounded bg-gray-700 text-white"/>
          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={password} 
            onChange={onChange} 
            required 
            className="p-2 border rounded bg-gray-700 text-white"/>
          <Button variant={"outline"} type="submit" className="w-full">
              Register
          </Button>
        </form>
          <div className='text-[#F7F7F7] flex flex-col items-center'>
            <p>Already have an account?</p>
            <Button 
              variant={"link"} 
              onClick={() => navigate("/login")} 
              className='text-[#F7F7F7]'
            >login here</Button>
          </div>
      </div>
    </div>
  );
}

export default ProviderRegister