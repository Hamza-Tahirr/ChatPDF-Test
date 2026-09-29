import { pdfjs, Document, Page } from 'react-pdf';
import { useState, useEffect } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type PdfViewerProps = {
    file: File | string;
    onTextSelect: (text: string) => void;
};

function PdfViewer({ file, onTextSelect }: PdfViewerProps) {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedText, setSelectedText] = useState('');
    const [options, setOptions] = useState(false);

    useEffect(() => {
        const updateSelectedText = () => {
            const text = window.getSelection()?.toString();
            if (text) {
                setSelectedText(text);
                setOptions(true);
            }
        };

        document.addEventListener('mouseup', updateSelectedText);
        document.addEventListener('touchend', updateSelectedText);

        return () => {
            document.removeEventListener('mouseup', updateSelectedText);
            document.removeEventListener('touchend', updateSelectedText);
        };
    }, []);

    const onDocumentLoad = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    function changePage(offset: number) {
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
                    Page <span className="font-semibold">{pageNumber || (numPages ? 1 : '--')}</span> of <span className="font-semibold">{numPages || '--'}</span>
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
                            className="ml-10 px-4 py-2 bg-blue-500 rounded-md text-sm text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Summarize Text
                        </button>
                    </div>
                )}
                <Document
                    className="doc"
                    onLoadSuccess={onDocumentLoad}
                    file={file}
                >
                    <Page
                        renderAnnotationLayer={false}
                        pageNumber={pageNumber}
                        width={550}
                    />
                </Document>
            </div>
        </div>
    );
}

export default PdfViewer;
