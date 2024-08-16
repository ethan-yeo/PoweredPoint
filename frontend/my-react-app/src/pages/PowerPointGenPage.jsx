import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner'; // Importing the spinner
import './PowerPointGenPage.css';
import { useNavigate } from "react-router-dom";
import Dropzone from "../components/DropZone"; // Ensure this path is correct

const PowerPointGenPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [query, setQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false); // Uploading state
  const [isLoading, setIsLoading] = useState(false); // Chat loading state

  const handleReset = () => {
    axios.post('http://127.0.0.1:5000/reset_ppt')
      .then(response => {
        console.log('Database cleared:', response.data.status);
        setFileName('');
        setUploadStatus('');
        setQuery('');
        setIsUploading(false);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error clearing DB', error);
      });
  };

  const handleFilesAdded = (files) => {
    setFile(files);
    const fileNames = files.map(file => file.name).join(', ');
    setFileName(fileNames);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (file.length === 0) return; // Don't proceed if no files are selected
  
    const formData = new FormData();
    file.forEach((f) => {
      if (f.type === 'application/pdf' || f.type === 'text/plain') {
        formData.append('file', f);
      }
    });
    setIsUploading(true); // Start spinner
  
    try {
      const response = await fetch('http://127.0.0.1:5000/upload_documents', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const res = await response.json();
      setUploadStatus(res.status);
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('Upload failed');
    } finally {
      setIsUploading(false); // Stop spinner
    }
  };

  const handlePowerPointGeneration = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
  
    setIsLoading(true);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/generate_ppt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate PowerPoint. Please try again.');
      }
  
      // Response should be the PowerPoint file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'presentation.pptx';
      document.body.appendChild(a);
      a.click();
      a.remove();
  
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error('Error generating PowerPoint:', error);
      alert('An error occurred while generating the PowerPoint. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div>
    <div className="chatContainer">
      <h1 className="title">PowerPoint Generator</h1>
      <p className="Description">Upload your PDF documents or submit a query to generate a powerpoint</p>
      <div className="titleLine"></div>
      <h2 className="descriptionLine">Upload Documents</h2>
      
      <Dropzone acceptedFileTypes={['application/pdf', 'text/plain']} onFilesAdded={handleFilesAdded} />
      
      <div className="buttonContainer">
        <button onClick={handleFileUpload} className="uploadButton" aria-label="Upload Files">Upload</button>
        <button onClick={handleReset} className="resetButton" type="button" aria-label="Reset">Reset</button>
      </div>
      
      {isUploading && (
        <div className="centeredContent">
          <Oval
            height={40}
            width={40}
            color="#4fa94d"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
          <p>Uploading...</p>
        </div>
      )}
      {uploadStatus && <p>{uploadStatus}</p>}
  
      <form onSubmit={handlePowerPointGeneration} className="inputContainer">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Topic / information..."
          className="chatInput"
          aria-label="Query Input"
        />
        <button type="submit" className="sendButton" aria-label="Generate PowerPoint">
          {isLoading ? (
            <Oval
              height={20}
              width={20}
              color="#ffffff"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#ffffff"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            'Generate'
          )}
        </button>
      </form>
    </div>
  </div>
  
  );
}

export default PowerPointGenPage;