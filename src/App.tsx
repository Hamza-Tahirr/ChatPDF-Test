
import PdfViewer from './PdfViewer';
import { useState} from 'react';
import Chat from './Chat';
import PDFUploadComponent from './PDFUploadComponent';


function App() {
  const [selectedText, setSelectedText] = useState('');
  const handlePDFUpload = (file) => {
    console.log('Uploaded PDF:', file.name);
    // Further handling here (e.g., prepare for upload to a server)
  };
  return (

    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="flex">
      <div className="w-1/5 bg-gray-900 p-6 text-gray-200 h-screen">
      <h2 className="w-full font-bold text-lg">ChatPDF</h2>
        <PDFUploadComponent onPDFUpload={handlePDFUpload} />
      </div>
      <div className="w-3/6 h-screen flex flex-col relative">
        <PdfViewer onTextSelect={setSelectedText}/>
      </div>
      <div className="chatInterface">
        <Chat selectedText={selectedText}/>
      </div>

    </div>
    </div>
  )

}
export default App;