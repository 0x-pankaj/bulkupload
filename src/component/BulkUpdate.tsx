'use client'

import React, { useState } from 'react';
import * as XLSX from "xlsx";
import { FaUpload, FaFileAlt, FaSave, FaExclamationCircle } from 'react-icons/fa';

const BulkUpdate: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<Record<string, any>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [detailedStatus, setDetailedStatus] = useState<string[]>([]);

  const previewData = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          try {
            const workBook = XLSX.read(data, { type: "binary" });
            const sheetNames = workBook.SheetNames;
            const result: Record<string, any> = {};

            sheetNames.forEach(sheetName => {
              const sheet = workBook.Sheets[sheetName];
              result[sheetName] = XLSX.utils.sheet_to_json(sheet);
            });

            setJsonData(result);
            setError(null);
            console.log("Preview data loaded:", JSON.stringify(result, null, 2));
          } catch (err) {
            setError("Error parsing Excel file. Please make sure it's a valid .xlsx file.");
            console.error("Error parsing Excel file:", err);
          }
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const saveData = async () => {
    if (file) {
      setIsUploading(true);
      setUploadStatus("Uploading data...");
      setError(null);
      setDetailedStatus([]);

      try {
        console.log("Sending data to API:", JSON.stringify(jsonData, null, 2));
        const response = await fetch('/api/bulk-upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setDetailedStatus(result.results);
          setUploadStatus("All data uploaded successfully!");
        } else {
          throw new Error(result.error || 'An error occurred during upload');
        }
      } catch (error) {
        console.error("Error in upload process:", error);
        setError(`Error uploading data: ${(error as Error).message}`);
        setUploadStatus("Upload failed. Check detailed status for more information.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-black border-b pb-2">Bulk Upload</h1>
      
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <label htmlFor="file-upload" className="flex-grow sm:flex-grow-0 cursor-pointer bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors duration-300 py-2 px-4 rounded-lg border border-blue-200 p-2">
            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="hidden"
            />
            <div className="flex items-center justify-center">
              <FaUpload className="mr-2" />
              <span>{file ? file.name : "Choose Excel File"}</span>
            </div>
          </label>
          <button 
            onClick={previewData} 
            className="flex-grow sm:flex-grow-0 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            disabled={!file}
          >
            <FaFileAlt className="m-2" />
            Preview Data
          </button>
          <button 
            onClick={saveData} 
            className="flex-grow sm:flex-grow-0 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUploading || Object.keys(jsonData).length === 0}
          >
            <FaSave className="mr-2" />
            {isUploading ? "Uploading..." : "Save Data"}
          </button>
        </div>
        
        {uploadStatus && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded" role="alert">
            <p className="font-bold">Status</p>
            <p>{uploadStatus}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <div className="flex items-center">
              <FaExclamationCircle className="mr-2" />
              <p className="font-bold">Error</p>
            </div>
            <p>{error}</p>
          </div>
        )}

        {detailedStatus.length > 0 && (
          <div className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4 rounded" role="alert">
            <p className="font-bold">Detailed Status</p>
            <ul className="list-disc pl-5">
              {detailedStatus.map((status, index) => (
                <li key={index}>{status}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        {Object.entries(jsonData).map(([sheetName, data]) => (
          <div key={sheetName} className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">{sheetName}</h2>
            <pre className="bg-white p-3 rounded border border-gray-200 overflow-auto max-h-60 text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulkUpdate;