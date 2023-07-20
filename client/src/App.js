import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/universities").then((response) => {
      setUniversities(response.data);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="heading">University Data</h1>
      <table className="table">
        <thead>
          <tr>
            <th className="cell">Name</th>
            <th className="cell">Domain</th>
            <th className="cell">Country</th>
            <th className="cell">Country Code</th>
            <th className="cell">Webpage</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((uni, index) => (
            <tr key={index}>
              <td className="cell">{uni.name}</td>
              <td className="cell">{uni.domain}</td>
              <td className="cell">{uni.country}</td>
              <td className="cell">{uni.country_code}</td>
              <td className="cell">
                <a href={uni.webpage} target="_blank" rel="noopener noreferrer">
                  {uni.webpage}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
