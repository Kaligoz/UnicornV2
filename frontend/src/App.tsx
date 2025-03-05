import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProviderList from "./pages/ProviderList";
import ProviderForm from "./pages/ProviderForm";

function App() {
  return (
    <Router>
      <div className="p-6 overflow-auto h-screen">
        <Routes>
          <Route path="/" element={<ProviderList />} />
          <Route path="/add" element={<ProviderForm />} />
        </Routes>
      </div>
      <AddButton/>
    </Router>
  );
};

function AddButton() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6">
      <Button variant={"outline"} onClick={() => navigate("/add")}>Add</Button>
    </div>
  );
};

export default App;
