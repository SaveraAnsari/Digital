import React, { useState, useEffect } from "react";
import "../../Admin/regData.css";
import "./education.css";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";

function Education() {
  const [cnic, setCnic] = useState("");
  const [educationData, setEducationData] = useState([]);
  const [degreeName, setDegreeName] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("");
  const [cgpaPercentage, setCgpaPercentage] = useState("");
  const [editIndex, setEditIndex] = useState(null); // State to track the index of the row being edited

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("Data")) || {};
    // Retrieve education data based on CNIC
    setEducationData(dataFromLocalStorage[cnic]?.Education || []);
  }, [cnic]); // Update educationData when CNIC changes

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      cnic: cnic,
      DegreeName: degreeName,
      InstituteName: instituteName,
      Duration: duration,
      StartDate: startDate,
      Status: status,
      CgpaPercentage: parseFloat(cgpaPercentage),
    };

    let existingData = JSON.parse(localStorage.getItem("Data")) || {};

    // Check if CNIC number already exists in localStorage
    if (!existingData[cnic]) {
      existingData[cnic] = { Education: {} }; // Initialize as empty array
    }

    existingData[cnic].Education = formData; // Save form data under 'Education' key

    localStorage.setItem("Data", JSON.stringify(existingData));

    // Reset form fields
    setCnic("");
    setDegreeName("");
    setInstituteName("");
    setDuration("");
    setStartDate("");
    setStatus("");
    setCgpaPercentage("");
  };

  const handleEdit = (index) => {
    setEditIndex(index); // Set the index of the row being edited
  };

  const handleSave = () => {
    // Save the edited data to local storage
    localStorage.setItem("Data", JSON.stringify(educationData));
    setEditIndex(null); // Reset edit mode
  };

  const handleDelete = (index) => {
    // Delete the selected row from the state and update local storage
    const updatedEducationData = [...educationData];
    updatedEducationData.splice(index, 1);
    setEducationData(updatedEducationData);
    localStorage.setItem("Data", JSON.stringify(updatedEducationData));
  };

  return (
    <>
      <Nav />

      <div className="education marriage-form-container">
        <div className="marriage-form">
          <form onSubmit={handleSubmit}>
            <h1>Education Details</h1>
            <input
              type="text"
              placeholder="CNIC"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
            />

            <input
              type="text"
              placeholder="Degree Name"
              value={degreeName}
              onChange={(e) => setDegreeName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Institute Name"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <br />
            <label htmlFor="start">Start Date</label>
            <br />
            <input
              type="date"
              id="start"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <br />
            <input
              type="radio"
              id="complete"
              name="status"
              value="Complete"
              checked={status === "Complete"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label htmlFor="complete" className="radioo">
              Complete
            </label>
            <input
              type="radio"
              id="inProcess"
              name="status"
              value="In Process"
              checked={status === "In Process"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label htmlFor="inProcess" className="radioo">
              In Process
            </label>
            <input
              type="text"
              placeholder="CGPA/Percentage"
              value={cgpaPercentage}
              onChange={(e) => setCgpaPercentage(e.target.value)}
            />
            <br />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Education;
