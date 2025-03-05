import { useState } from "react";
import axios from "axios";
import { Card, CardContent, Button } from "@mui/material";

export default function TechlogUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [techlogData, setTechlogData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setTechlogData(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:2020/api/documentai/process", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTechlogData(response.data);
    } catch (err) {
      setError("Failed to process techlog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-red-600 to-yellow-500 text-white p-6">
      <Card className="w-full max-w-md p-6 shadow-lg border border-yellow-500 bg-black text-white">
        <CardContent className="flex flex-col space-y-4">
          <h2 className="text-xl font-bold text-center text-yellow-400">Upload Techlog Image</h2>
          <input 
            id="techlogFile" 
            type="file" 
            accept="image/*,.pdf" 
            onChange={handleFileChange} 
            className="border border-yellow-500 p-2 rounded-md bg-black text-white focus:ring-2 focus:ring-yellow-500"
          />
          <Button 
            onClick={handleUpload} 
            disabled={!file || loading} 
            className={`w-full py-2 rounded-md font-bold ${file ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
          >
            {loading ? "Processing..." : "Submit"}
          </Button>
        </CardContent>
      </Card>
      {error && <p className="text-red-300 mt-4">{error}</p>}
      {techlogData && (
        <Card className="w-full max-w-md mt-6 p-6 shadow-lg border border-yellow-500 bg-gradient-to-r from-black via-red-600 to-yellow-500 text-white">
          <CardContent>
            <h2 className="text-lg font-semibold text-center text-yellow-300">Techlog Summary</h2>
            <p><strong>🛠️ Defects:</strong> {techlogData.defects}</p>
            <p><strong>🛫 From Airport:</strong> {techlogData.Airports?.split("To:")[0].replace("From:", "").trim()}</p>
            <p><strong>🛬 Destination Airport:</strong> {techlogData.Airports?.split("To:")[1].split("Fit #:")[0].trim()}</p>
            <p><strong>⏳ Utilization:</strong> {techlogData.utilization}</p>
            <p><strong>✈️ Aircraft:</strong> {techlogData.Aircraft}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
