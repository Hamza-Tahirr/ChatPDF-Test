import { pdfjs, Document, Page } from 'react-pdf';
import { useState ,useCallback,useEffect} from 'react';
import File from '.\\2210.07544.pdf'
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function highlightPattern(text, pattern) {
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
  }

function PdfViewer({ onTextSelect }) {

    const [numPages, setnumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedText, setSelectedText] = useState('');
    const [searchText, setSearchText] = useState('');
    const [Options,setOptions] = useState(false);
    const [PopupPosition,setPopupPosition] = useState({});


    useEffect(() => {
        // Function to update state with selected text
        const updateSelectedText = () => {
            const selection = window.getSelection();
            if (!selection.rangeCount) return; // Exit if no selection
          
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const text = selection.toString();
          
            if (text) {
              setSelectedText(text);
              setOptions(true); // Assuming this is meant to show the popup
              // Assuming you have a state for the popup position
              setPopupPosition({
                ...PopupPosition,
                left: rect.left + window.scrollX + rect.width / 2, // Center the popup over the selection
                top: rect.top + window.scrollY - 5, // Adjust as needed, e.g., show above the selection
              });

              console.log(PopupPosition)
           // Additional handler (ensure this is defined or remove if not used)
            }
          };
    
        document.addEventListener('mouseup', updateSelectedText);
        document.addEventListener('touchend', updateSelectedText);
    
        return () => {
          document.removeEventListener('mouseup', updateSelectedText);
          document.removeEventListener('touchend', updateSelectedText);
        };
      }, []); 
    
    const textRenderer = useCallback(
        (textItem) => highlightPattern(textItem.str, searchText),
        [searchText]
    );

    function onChange(event) {
        setSearchText(event.target.value);
    }

    const onDocumentLoad = ({numPages})=>{
      setnumPages(numPages);
      setPageNumber(1);

    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    function handleTextSummarisation(){
        onTextSelect(selectedText);
        setOptions(false);
    }

    return (
      <div className='pdfviewer'>
        <div className='pageCount'>
            <p>
                Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </p>
            <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={previousPage}
                
            >
                Previous
            </button>
            <button
                type="button"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                

                >
                Next
            </button>
        </div>
  
  
        <div className='DisplayPDF'>
            { Options && (
                <div className='options'>
                        <button
                            type="button"
                            onClick={handleTextSummarisation}>
                            Summarize 🪄
                        </button>
                </div>
            )}
            <Document
                className="doc"
                onLoadSuccess={onDocumentLoad}
                file={File}
            >
                <Page 
                    renderAnnotationLayer={false}
                    pageNumber={pageNumber} 
                    width={550} 
                    customTextRenderer={textRenderer}/> 

            </Document>
            
        </div>
    </div>
        
    )
  
  }
  export default PdfViewer;