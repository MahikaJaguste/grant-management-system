import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import GrantCommitteeDashboard from "./pages/GrantCommitteeDashboard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/professor" element={<ProfessorDashboard />} />
          <Route path="/review" element={<GrantCommitteeDashboard />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};
export default App;
