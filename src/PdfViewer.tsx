import { pdfjs, Document, Page } from 'react-pdf';
import { useState, useCallback, useEffect } from 'react';
import File from './2210.07544.pdf';
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function highlightPattern(text, pattern) {
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

function PdfViewer({ onTextSelect }) {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedText, setSelectedText] = useState('');
    const [searchText, setSearchText] = useState('');
    const [options, setOptions] = useState(false);
    const [popupPosition, setPopupPosition] = useState({});

    useEffect(() => {
        const updateSelectedText = () => {
            const selection = window.getSelection();
            if (!selection.rangeCount) return;

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const text = selection.toString();

            if (text) {
                setSelectedText(text);
                setOptions(true);
                setPopupPosition({
                    ...popupPosition,
                    left: rect.left + window.scrollX + rect.width / 2,
                    top: rect.top + window.scrollY - 5,
                });
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

    const onDocumentLoad = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    function handleTextSummarisation() {
        onTextSelect(selectedText);
        setOptions(false);
    }

    return (
        <div className='pdfviewer bg-gray-100 p-4 rounded-lg'>
            <div className='pageCount mb-4'>
                <p className="text-sm text-gray-600">
                    Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                </p>
                <button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                    className="ml-2 px-4 py-2 bg-blue-500 rounded-md text-sm text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                    >
                    Previous
                </button>
                <button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                    className="ml-10 px-4 py-2 bg-blue-500 rounded-md text-sm text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
>
                    Next
                </button>
                
            </div>


            <div className='DisplayPDF'>
                {options && (
                    <div className='options'>
                        <button
                            type="button"
                            onClick={handleTextSummarisation}
                            className="px-4 py-2 bg-blue-500 rounded-md text-sm text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
>
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
                        customTextRenderer={textRenderer}
                    />
                </Document>
            </div>
        </div>
    )
}

export default PdfViewer;
