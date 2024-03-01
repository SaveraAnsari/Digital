import React, { useState, useEffect } from "react";

function AdminEducation() {
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    // Retrieve education data from local storage
    const storedData = JSON.parse(localStorage.getItem("Data")) || {};
    const education = Object.values(storedData).flatMap(
      (item) => item?.Education || []
    ); // Check for existence of Education property
    setEducationData(education);
  }, []);

  const handleEdit = (index) => {
    // Implement edit logic here
    const editedData = educationData[index];
    // Assuming you want to log the edited data for now
    console.log("Editing data:", editedData);
  };

  const handleDelete = (index) => {
    // Implement delete logic here
    const updatedEducationData = [...educationData];
    updatedEducationData.splice(index, 1);
    setEducationData(updatedEducationData);
    // Update local storage with the updated data
    const storedData = JSON.parse(localStorage.getItem("Data")) || {};
    const newData = Object.values(storedData).map((item) => ({
      ...item,
      Education: updatedEducationData,
    }));
    localStorage.setItem("Data", JSON.stringify(newData));
  };

  return (
    <div className="admin-education">
      <h1>Education Data</h1>
      <table>
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Degree Name</th>
            <th>Institute Name</th>
            <th>Duration</th>
            <th>Start Date</th>
            <th>Status</th>
            <th>CGPA/Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {educationData.length > 0 ? (
            educationData.map((data, index) => (
              <tr key={index}>
                <td>{data.cnic}</td>
                <td>{data.DegreeName}</td>
                <td>{data.InstituteName}</td>
                <td>{data.Duration}</td>
                <td>{data.StartDate}</td>
                <td>{data.Status}</td>
                <td>{data.CgpaPercentage}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No education data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminEducation;
