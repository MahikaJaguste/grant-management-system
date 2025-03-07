import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import GrantCommitteeDashboard from "./pages/GrantCommitteeDashboard";
import Homepage from "./pages/Homepage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/grant-management-system">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/professor" element={<ProfessorDashboard />} />
          <Route path="/review" element={<GrantCommitteeDashboard />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};
export default App;
