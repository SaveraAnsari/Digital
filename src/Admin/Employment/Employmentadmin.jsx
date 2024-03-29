import React, { useState, useEffect } from "react";

function EmploymentDataTable() {
  const [employmentData, setEmploymentData] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // State to track the index of the row being edited
  const [editedData, setEditedData] = useState({}); // State to store edited data

  useEffect(() => {
    // Retrieve data from local storage
    const storedData = JSON.parse(localStorage.getItem("Data"));
    if (storedData) {
      const employmentDataArray = Object.entries(storedData).flatMap(
        ([cnic, item]) => {
          if (item && item.EmploymentData) {
            return { cnic, ...item.EmploymentData };
          } else {
            return [];
          }
        }
      );
      setEmploymentData(employmentDataArray);
    }
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index); // Set the index of the row being edited
    setEditedData(employmentData[index]); // Set editedData state with the data of the row being edited
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditedData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Save the edited data to local storage
    const updatedData = [...employmentData];
    updatedData[editIndex] = editedData;
    setEmploymentData(updatedData);
    const storedData = JSON.parse(localStorage.getItem("Data"));
    storedData[employmentData[editIndex].cnic].EmploymentData = editedData;
    localStorage.setItem("Data", JSON.stringify(storedData));
    setEditIndex(null); // Reset edit mode
  };

  const handleCancel = () => {
    setEditIndex(null); // Reset edit mode without saving changes
  };

  const handleDelete = (index) => {
    const updatedData = [...employmentData];
    updatedData.splice(index, 1);
    setEmploymentData(updatedData);
    const storedData = JSON.parse(localStorage.getItem("Data"));
    const cnic = employmentData[index].cnic;
    if (storedData && storedData[cnic]) {
      delete storedData[cnic].EmploymentData;
      localStorage.setItem("Data", JSON.stringify(storedData));
    }
  };

  return (
    <div>
      <h1>Employment </h1>
      <table>
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Job Title</th>
            <th>Company Name</th>
            <th>Job Start Date</th>
            <th>Job End Date</th>
            <th>Salary</th>
            <th>Job Responsibility</th>
            <th>Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employmentData.map((data, index) => (
            <tr key={index}>
              <td>{data.cnic}</td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedData.jobTitle}
                    onChange={(e) => handleChange(e, "jobTitle")}
                  />
                ) : (
                  data.jobTitle
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedData.companyName}
                    onChange={(e) => handleChange(e, "companyName")}
                  />
                ) : (
                  data.companyName
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="date"
                    value={editedData.jobStartDate}
                    onChange={(e) => handleChange(e, "jobStartDate")}
                  />
                ) : (
                  data.jobStartDate
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="date"
                    value={editedData.jobEndDate}
                    onChange={(e) => handleChange(e, "jobEndDate")}
                  />
                ) : (
                  data.jobEndDate
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedData.salary}
                    onChange={(e) => handleChange(e, "salary")}
                  />
                ) : (
                  data.salary
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedData.jobResponsibility}
                    onChange={(e) => handleChange(e, "jobResponsibility")}
                  />
                ) : (
                  data.jobResponsibility
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedData.skills}
                    onChange={(e) => handleChange(e, "skills")}
                  />
                ) : (
                  data.skills
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmploymentDataTable;
