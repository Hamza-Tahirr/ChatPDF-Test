import React from 'react';
import { useDropzone } from 'react-dropzone';

const PDFUploadComponent = ({ onPDFUpload }) => {
  const onDrop = React.useCallback((acceptedFiles) => {
    // Filter for PDF files
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    if (pdfFiles.length > 0) {
      // Assuming you want to handle the first PDF file
      onPDFUpload(pdfFiles[0]);
    } else {
      alert("No PDF files detected.");
    }
  }, [onPDFUpload]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'application/pdf',
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dotted border-black p-8 text-center font-bold ${
        isDragActive ? 'text-blue-700' : 'text-gray-700'
      }`}
    >
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the PDF here ...</p> :
          <p>Drag 'n' drop a PDF here, or click to select a PDF</p>
      }
    </div>
  );
};

export default PDFUploadComponent;
