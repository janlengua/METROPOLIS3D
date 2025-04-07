import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FirestoreData from "./dao";
import BuildingForm from "./m3d-admin";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<FirestoreData />} />
          <Route path="/admin" element={<BuildingForm />} />
        </Routes>
    </Router>
  );
}

export default App;
