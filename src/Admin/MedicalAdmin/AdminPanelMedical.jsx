import React, { useState, useEffect } from "react";

function AdminPanelMedical() {
  const [formData, setFormData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [editingCnic, setEditingCnic] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Data")) || {};
    setFormData(data);
  }, []);

  const handleEdit = (cnic) => {
    setEditingCnic(cnic);
    setEditedData({ ...formData[cnic]?.medical });
  };

  const handleEditChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleSaveEdit = () => {
    const updatedData = { ...formData };
    updatedData[editingCnic].medical = editedData;
    setFormData(updatedData);
    localStorage.setItem("Data", JSON.stringify(updatedData));
    setEditingCnic("");
  };

  const handleDelete = (cnic) => {
    const updatedData = { ...formData };
    delete updatedData[cnic].medical;
    setFormData(updatedData);
    localStorage.setItem("Data", JSON.stringify(updatedData));
  };

  return (
    <div className="admin-panel">
      <h2>Medical Records</h2>
      <table>
        <thead>
          <tr>
            <th>CNIC</th>
            <th>Medical Conditions</th>
            <th>Medications Prescribed</th>
            <th>Allergies</th>
            <th>Surgery Details</th>
            <th>Vaccination History</th>
            <th>Family Medical History</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(formData).map((cnic) => (
            <tr key={cnic}>
              <td>{cnic}</td>
              <td>
                {editingCnic === cnic ? (
                  <input
                    type="text"
                    value={editedData.medicalConditions}
                    onChange={(e) =>
                      handleEditChange("medicalConditions", e.target.value)
                    }
                  />
                ) : (
                  formData[cnic]?.medical?.medicalConditions
                )}
              </td>
              <td>
                {editingCnic === cnic ? (
                  <input
                    type="text"
                    value={editedData.medicationsPrescribed}
                    onChange={(e) =>
                      handleEditChange("medicationsPrescribed", e.target.value)
                    }
                  />
                ) : (
                  formData[cnic]?.medical?.medicationsPrescribed
                )}
              </td>
              <td>
                {editingCnic === cnic ? (
                  <input
                    type="text"
                    value={editedData.allergies}
                    onChange={(e) =>
                      handleEditChange("allergies", e.target.value)
                    }
                  />
                ) : (
                  formData[cnic]?.medical?.allergies
                )}
              </td>
              <td>
                {editingCnic === cnic ? (
                  <input
                    type="text"
                    value={editedData.surgeryDetails}
                    onChange={(e) =>
                      handleEditChange("surgeryDetails", e.target.value)
                    }
                  />
                ) : (
                  formData[cnic]?.medical?.surgeryDetails
                )}
              </td>
              <td>
                {editingCnic === cnic ? (
                  <input
                    type="text"
                    value={editedData.vaccinationHistory}
                    onChange={(e) =>
                      handleEditChange("vaccinationHistory", e.target.value)
                    }
                  />
                ) : (
                  formData[cnic]?.medical?.vaccinationHistory
                )}
              </td>
              <td>
                {editingCnic === cnic ? (
                  <input
                    type="text"
                    value={editedData.familyMedicalHistory}
                    onChange={(e) =>
                      handleEditChange("familyMedicalHistory", e.target.value)
                    }
                  />
                ) : (
                  formData[cnic]?.medical?.familyMedicalHistory
                )}
              </td>
              <td>
                {editingCnic === cnic ? (
                  <button onClick={handleSaveEdit}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(cnic)}>Edit</button>
                    <button onClick={() => handleDelete(cnic)}>Delete</button>
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

export default AdminPanelMedical;
