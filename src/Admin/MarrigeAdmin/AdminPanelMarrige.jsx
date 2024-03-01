import React, { useState, useEffect } from "react";

function AdminPanelMarriage() {
  const [marriageData, setMarriageData] = useState([]);

  useEffect(() => {
    // Fetch marriage data from local storage
    const storedData = localStorage.getItem("Data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const marriageEntries = Object.values(parsedData).map(
        (entry) => entry.MarriageData
      );
      setMarriageData(marriageEntries);
    }
  }, []);

  return (
    <div>
      <div className="admin-marriage-container">
        <h2>All Marriage Data</h2>
        <table>
          <thead>
            <tr>
              <th>Groom Name</th>
              <th>Groom CNIC</th>
              <th>Bride Name</th>
              <th>Bride CNIC</th>
              <th>Marriage Date</th>
              <th>Marriage Certificate</th>
            </tr>
          </thead>
          <tbody>
            {marriageData.map((data, index) => (
              <tr key={index}>
                <td>{data.husbandName}</td>
                <td>{data.husbandCnic}</td>
                <td>{data.brideName}</td>
                <td>{data.brideCnic}</td>
                <td>{data.marriageDate}</td>
                <td>
                  {data.marriageCertificateImage
                    ? data.marriageCertificateImage.name
                    : "No certificate uploaded"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanelMarriage;
