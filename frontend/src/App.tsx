import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [jsonData, setJsonData] = useState("{}");
  const [responseUrl, setResponseUrl] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/store",
        JSON.parse(jsonData)
      );
      setResponseUrl(res.data.url);
    } catch (error) {
      alert("Invalid JSON");
    }
  };

  return (
    <div className="container">
      <h1>Mock API Generator</h1>
      <textarea
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        rows="10"
        cols="50"
      />
      <button onClick={handleSubmit}>Generate URL</button>
      {responseUrl && (
        <p>
          Access your data at:{" "}
          <a href={responseUrl} target="_blank" rel="noopener noreferrer">
            {responseUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
