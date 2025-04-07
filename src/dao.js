import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const FirestoreData = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "buildings"));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(docs);
    };

    const fetchFloors = async () => {
      const buildingsSnapshot = await getDocs(collection(db, "buildings"));
      let allFloors = [];
    
      for (const buildingDoc of buildingsSnapshot.docs) {
        const floorsSnapshot = await getDocs(collection(db, "buildings", buildingDoc.id, "floors"));
        const floorsData = floorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), buildingId: buildingDoc.id }));
        allFloors = [...allFloors, ...floorsData];
      }
    
      setFloors(allFloors);
    };
    

    fetchData();
    fetchFloors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newForm = { nombre: name, apellido: surname };
      await addDoc(collection(db, "formularios"), newForm);
      alert("Formulario agregado exitosamente!");
      setName("");
      setSurname("");
    } catch (error) {
      console.error("Error al agregar el formulario:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Nombre" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input 
          type="text" 
          placeholder="Apellido" 
          value={surname} 
          onChange={(e) => setSurname(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px 10px", cursor: "pointer" }}>Enviar</button>
      </form>

      <h2>Buildings</h2>
      {data.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Data:</strong> {JSON.stringify(item)}</p>
        </div>
      ))}

      <h2>Plantas</h2>
      {floors.map((floor) => (
        <div key={floor.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>ID:</strong> {floor.id}</p>
          <p><strong>Data:</strong> {JSON.stringify(floor)}</p>
        </div>
      ))}
    </div>
  );
};

export default FirestoreData;
