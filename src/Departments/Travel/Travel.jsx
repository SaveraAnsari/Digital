import React, { useState } from "react";
import Nav from "../../Dashboard/Navbar";
import Footer from "../../Common/Footer";
// import "./TravelForm.css";

function TravelForm() {
  const [Cnic, setCnic] = useState("");
  const [travelDestination, setTravelDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelPurpose, setTravelPurpose] = useState("");
  const [travelDocuments, setTravelDocuments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      Cnic,
      travelDestination,
      travelDate,
      travelPurpose,
      travelDocuments: travelDocuments.name, // Save only the filename for now
    };

    let existingData = JSON.parse(localStorage.getItem("Data")) || {};

    // Check if CNIC number already exists in localStorage
    if (!existingData[Cnic]) {
      existingData[Cnic] = { TravelData: {} };
    }

    existingData[Cnic].TravelData = formData; // Save form data under 'TravelData' key

    localStorage.setItem("Data", JSON.stringify(existingData));

    // Reset form fields
    setCnic("");
    setTravelDestination("");
    setTravelDate("");
    setTravelPurpose("");
    setTravelDocuments("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTravelDocuments(file);
  };

  return (
    <div>
      <Nav />
      <div className="marriage-form-container travel">
        <form onSubmit={handleSubmit}>
          <div className="marriage-form">
            <h2>Travel Details</h2>
            <input
              type="text"
              placeholder="CNIC"
              value={Cnic}
              onChange={(e) => setCnic(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              placeholder="Destination"
              value={travelDestination}
              onChange={(e) => setTravelDestination(e.target.value)}
              required
            />
            <br />
            <label htmlFor="travelDate">Travel Date:</label>
            <br />
            <input
              id="travelDate"
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              required
              style={{padding:"20px"}}
            />
            <br />
            <textarea
              placeholder="Purpose of Travel"
              value={travelPurpose}
              onChange={(e) => setTravelPurpose(e.target.value)}
              required
            ></textarea>
            <br />
            <div className="file-input-container center">
              <label htmlFor="travelDocuments" className="file-input-label">
                Select Travel Documents
              </label>
              <input
                id="travelDocuments"
                type="file"
                onChange={handleFileChange}
                className="file-input"
                required
              />
            </div>
            <br />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default TravelForm;
