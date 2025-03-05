import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import ProviderList from "./pages/ProviderList";
import ProviderFormAdd from "./pages/ProviderFormAdd";
import ProviderFormEdit from "./pages/ProviderFormEdit";
import ProviderLogin from "./pages/ProviderLogin";
import ProviderRegister from "./pages/ProviderRegister";

function App() {
  return (
  <AuthProvider>
    <Router>
      <div className="p-6 overflow-auto h-screen">
        <Routes>
          <Route path="/" element={<ProviderList />} />
          <Route path="/add" element={<ProviderFormAdd />} />
          <Route path="/edit/:id" element={<ProviderFormEdit />} />
          <Route path="/login" element={<ProviderLogin />} />
          <Route path="/register" element={<ProviderRegister />} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
  );
};


export default App;
