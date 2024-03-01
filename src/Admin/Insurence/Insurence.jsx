import React, { useState, useEffect } from "react";

function InsuranceDataTable() {
  const [insuranceData, setInsuranceData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({
    Cnic: "",
    insuranceType: "",
    insuranceStartDate: "",
    insuranceEndDate: "",
    insuranceCompany: "",
    insurancePolicyNumber: "",
    premiumAmount: "",
  });

  useEffect(() => {
    // Retrieve data from local storage
    const storedData = JSON.parse(localStorage.getItem("Data"));
    if (storedData) {
      const insuranceDataArray = Object.entries(storedData).flatMap(
        ([nic, data]) => {
          if (data && data.InsuranceData) {
            return { nic, ...data.InsuranceData };
          } else {
            return [];
          }
        }
      );
      setInsuranceData(insuranceDataArray);
    }
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    const selectedData = insuranceData[index];
    setEditedData(selectedData);
  };

  const handleSave = () => {
    const updatedData = [...insuranceData];
    updatedData[editIndex] = editedData;
    setInsuranceData(updatedData);
    localStorage.setItem("Data", JSON.stringify(updatedData));
    setEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Insurance Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>nic</th>
            <th>Insurance Type</th>
            <th>Insurance Start Date</th>
            <th>Insurance End Date</th>
            <th>Insurance Company</th>
            <th>Insurance Policy Number</th>
            <th>Premium Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {insuranceData.map((data, index) => (
            <tr key={index}>
              <td>{data.nic}</td>
              <td>{data.insuranceType}</td>
              <td>{data.insuranceStartDate}</td>
              <td>{data.insuranceEndDate}</td>
              <td>{data.insuranceCompany}</td>
              <td>{data.insurancePolicyNumber}</td>
              <td>{data.premiumAmount}</td>
              <td>
                {editIndex === index ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editIndex !== null && (
        <div>
          <h2>Edit Insurance Entry</h2>
          <form>
            <label>
              nic:
              <input
                type="text"
                name="nic"
                value={editedData.nic}
                onChange={handleChange}
              />
            </label>
            {/* Add other input fields for editing */}
          </form>
        </div>
      )}
    </div>
  );
}

export default InsuranceDataTable;
