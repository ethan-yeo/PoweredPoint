import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './DropZone.css'; // Import custom CSS for styling
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ClearIcon from '@mui/icons-material/Clear';

const Dropzone = ({ acceptedFileTypes, onFilesAdded }) => {
  const [droppedFiles, setDroppedFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    // Filter out files that are not in the acceptedFileTypes array
    const filteredFiles = acceptedFiles.filter(file => acceptedFileTypes.includes(file.type));
    setDroppedFiles([...droppedFiles, ...filteredFiles]);

    // Check for rejected files
    const rejectedFiles = acceptedFiles.filter(file => !acceptedFileTypes.includes(file.type));
    if (rejectedFiles.length > 0) {
      const rejectedFileNames = rejectedFiles.map(file => `${file.name} (${file.type})`).join(', ');
      const message = `The following files were rejected: \n${rejectedFileNames}. \nPlease provide only accepted file types.`;
      if (!window.confirm(message)) {
        // User clicked "Cancel" in the confirmation dialog
        return; // Exit the function
      }
    }
  };

  const handleDelete = (file) => {
    const updatedFiles = droppedFiles.filter((f) => f !== file);
    setDroppedFiles(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.join(','), // Join file types with comma
  });

  // Pass droppedFiles back to parent component
  React.useEffect(() => {
    onFilesAdded(droppedFiles);
  }, [droppedFiles, onFilesAdded]);

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <div className="icon">
        <CloudUploadOutlinedIcon style={{ fill: 'grey' }} sx={{ fontSize: 48, strokeWidth: 0.1 }} />
      </div>
      <p>Drag & Drop {acceptedFileTypes.join(', ')} files here</p>
      <p>or</p>
      <button type="button" className="browse-button">
        Browse Files
      </button>

      {/* Display dropped files */}
      <div className="dropped-files">
        {droppedFiles.map((file) => (
          <div key={file.name} className="file-item">
            <span>{file.name}</span>
            <button
              type="button"
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent click event from bubbling up
                handleDelete(file);
              }}
            >
              <ClearIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropzone;
