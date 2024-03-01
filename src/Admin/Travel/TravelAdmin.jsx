import React, { useState, useEffect } from "react";

function TravelDataDisplay() {
  const [travelData, setTravelData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Data"));
    if (storedData) {
      const travelDataArray = Object.entries(storedData).flatMap(([cnic, data]) => {
        if (data && data.TravelData) {
          if (Array.isArray(data.TravelData)) {
            return data.TravelData.map((item) => ({ cnic, ...item }));
          } else {
            return [{ cnic, ...data.TravelData }]; // Convert single object to array with one element
          }
        } else {
          return [];
        }
      });
      setTravelData(travelDataArray);
    }
  }, []);
  

  const handleEdit = (index) => {
    // Implement edit functionality
    const editedData = { ...travelData[index] };
    // Handle edit logic here
    console.log("Edit data:", editedData);
  };

  const handleDelete = (index) => {
    // Implement delete functionality
    const updatedData = [...travelData];
    updatedData.splice(index, 1);
    setTravelData(updatedData);
    // Update localStorage
    const newData = updatedData.reduce((acc, cur) => {
      if (!acc[cur.cnic]) {
        acc[cur.cnic] = { TravelData: [] };
      }
      acc[cur.cnic].TravelData.push(cur);
      return acc;
    }, {});
    localStorage.setItem("Data", JSON.stringify(newData));
  };

  return (
    <div>
      <h2>All Travel Data</h2>
      <table>
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Destination</th>
            <th>Travel Date</th>
            <th>Purpose</th>
            <th>Documents</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {travelData.map((data, index) => (
            <tr key={index}>
              <td>{data.cnic}</td>
              <td>{data.travelDestination}</td>
              <td>{data.travelDate}</td>
              <td>{data.travelPurpose}</td>
              <td>{data.travelDocuments}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TravelDataDisplay;
