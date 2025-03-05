import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProviderList from "./pages/ProviderList";
import ProviderFormAdd from "./pages/ProviderFormAdd";
import ProviderFormEdit from "./pages/ProviderFormEdit";

function App() {
  return (
    <Router>
      <div className="p-6 overflow-auto h-screen">
        <Routes>
          <Route path="/" element={<ProviderList />} />
          <Route path="/add" element={<ProviderFormAdd />} />
          <Route path="/edit/:id" element={<ProviderFormEdit />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
