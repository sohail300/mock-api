import { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonData, setJsonData] = useState("{\n  \n}");
  const [responseUrl, setResponseUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);
    try {
      // Validate JSON first
      const parsedData = JSON.parse(jsonData);

      // const res = await axios.post("http://localhost:5000/store", parsedData);

      const res = await axios.post(
        "https://mock-api-t018.onrender.com/store",
        parsedData
      );

      // No need to transform URL anymore since backend returns correct URL
      setResponseUrl(res.data.url);
    } catch (error) {
      if (error instanceof SyntaxError) {
        setError("Invalid JSON format. Please check your input.");
      } else {
        setError("Failed to generate API endpoint. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(responseUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL");
    }
  };

  return (
    <div className="container">
      <style>
        {`
          .container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          }

          h1 {
            text-align: center;
            color: #333;
            margin-bottom: 2rem;
          }

          .textarea-container {
            margin-bottom: 1rem;
          }

          textarea {
            width: 100%;
            height: 300px;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-family: monospace;
            font-size: 14px;
            resize: vertical;
            box-sizing: border-box;
          }

          textarea:focus {
            outline: none;
            border-color: #007bff;
          }

          .button-container {
            display: flex;
            justify-content: center;
            margin: 1rem 0;
          }

          button {
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background-color: #007bff;
            color: white;
            transition: background-color 0.2s;
          }

          button:hover {
            background-color: #0056b3;
          }

          button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }

          .error {
            color: #dc3545;
            padding: 10px;
            margin: 1rem 0;
            border-radius: 4px;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
          }

          .result-container {
            margin-top: 1rem;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 4px;
            border: 1px solid #dee2e6;
          }

          .result-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
          }

          .copy-button {
            background-color: #6c757d;
            padding: 6px 12px;
            font-size: 14px;
          }

          .copy-button:hover {
            background-color: #5a6268;
          }

          .url-link {
            word-break: break-all;
            color: #007bff;
            text-decoration: none;
          }

          .url-link:hover {
            text-decoration: underline;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            margin-right: 8px;
            animation: spin 1s linear infinite;
          }
        `}
      </style>

      <h1>Mock API Generator</h1>

      <div className="textarea-container">
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          placeholder="Enter your JSON data here..."
        />
      </div>

      <div className="button-container">
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Generating...
            </>
          ) : (
            "Generate URL"
          )}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {responseUrl && (
        <div className="result-container">
          <div className="result-header">
            <span>Your API Endpoint:</span>
            <button className="copy-button" onClick={handleCopy}>
              {isCopied ? "Copied!" : "Copy URL"}
            </button>
          </div>
          <a
            href={responseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="url-link"
          >
            {responseUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
