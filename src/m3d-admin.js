import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const BuildingForm = () => {
  const [name, setName] = useState("");
  const [model3D, setModel3D] = useState("");
  const [location, setLocation] = useState("");
  const [offices, setOffices] = useState([]);
  const [officeName, setOfficeName] = useState("");
  const [officeModel3D, setOfficeModel3D] = useState("");
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      const querySnapshot = await getDocs(collection(db, "buildings"));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBuildings(docs);
    };
    fetchBuildings();
  }, []);

  const addOffice = () => {
    if (officeName && officeModel3D) {
      setOffices([...offices, { name: officeName, model3D: officeModel3D }]);
      setOfficeName("");
      setOfficeModel3D("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "buildings"), {
        name,
        model3D,
        location,
        offices
      });
      alert("Building added successfully!");
      setName("");
      setModel3D("");
      setLocation("");
      setOffices([]);
    } catch (error) {
      console.error("Error adding building:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Add Building</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input type="text" placeholder="Building Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Model 3D" value={model3D} onChange={(e) => setModel3D(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        
        <h3>Add Offices</h3>
        <input type="text" placeholder="Office Name" value={officeName} onChange={(e) => setOfficeName(e.target.value)} />
        <input type="text" placeholder="Office Model 3D" value={officeModel3D} onChange={(e) => setOfficeModel3D(e.target.value)} />
        <button type="button" onClick={addOffice}>Add Office</button>
        
        <ul>
          {offices.map((office, index) => (
            <li key={index}>{office.name} - {office.model3D}</li>
          ))}
        </ul>
        
        <button type="submit">Submit</button>
      </form>

      <h2>Buildings</h2>
      {buildings.map((building) => (
        <div key={building.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Name:</strong> {building.name}</p>
          <p><strong>Model 3D:</strong> {building.model3D}</p>
          <p><strong>Location:</strong> {building.location}</p>
          <h4>Offices</h4>
          <ul>
            {building.offices && building.offices.map((office, index) => (
              <li key={index}>{office.name} - {office.model3D}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BuildingForm;
