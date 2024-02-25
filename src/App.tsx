import PdfViewer from './PdfViewer';
import { useState } from 'react';
import Chat from './Chat';
import PDFUploadComponent from './PDFUploadComponent';

function App() {
  const [selectedText, setSelectedText] = useState('');

  const handlePDFUpload = (file) => {
    console.log('Uploaded PDF:', file.name);
    // Further handling here (e.g., prepare for upload to a server)
  };

  return (
    <div className="flex w-screen min-h-screen bg-slate-600">
      <div className="w-1/4 p-4 max-h-screen">
        <div className="w-full h-full border-2 border-gray-600 bg-gray-500 rounded-lg overflow-y-hidden">
        <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">ChatPDF</h1>
          </div>
          <PDFUploadComponent onPDFUpload={handlePDFUpload} />
        </div>
      </div>
      <div className="w-3/5 p-4 max-h-screen">
        <div className="w-full h-full border-2 border-gray-300 bg-gray-300 bg-opacity-80 rounded-lg overflow-y-auto">
          <PdfViewer onTextSelect={setSelectedText} />
        </div>
      </div>
      <div className="w-1/4 p-4 max-h-screen">
        <div className="w-full h-full border-2 border-gray-300 bg-gray-300 bg-opacity-80 rounded-lg overflow-y-auto">
          <Chat selectedText={selectedText} />
        </div>
      </div>
    </div>
  );
}

export default App;
