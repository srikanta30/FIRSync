import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/complaint" element={<Complaint />} />
        </Routes>
      </Router>
    </>
  );
}
