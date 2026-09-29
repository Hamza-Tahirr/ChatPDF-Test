# ChatPDF

> This is a fork of [alihssan/ChatPDF](https://github.com/alihssan/ChatPDF), started by Ali H. The changes made in this fork are listed below.

ChatPDF is a React and TypeScript frontend for reading a PDF in the browser and sending passages you select to a chat panel. It is a UI prototype. There is no backend yet, so it does not generate summaries or answers.

## Features

- Three-panel layout with an upload area, a PDF viewer and a chat panel.
- PDF viewer built on react-pdf, with a page counter and Previous/Next buttons. A sample paper opens by default.
- Drag and drop a PDF (or click to choose one) to open it in the viewer.
- When you select text in the PDF, a "Summarize Text" button appears. Clicking it sends the selected text to the chat panel.
- A chat input that adds messages to the panel when you press Enter or click Send. Messages exist only in the page and are lost on reload.

## Tech stack

- React 18 and TypeScript
- Vite 5
- Tailwind CSS
- react-pdf (PDF.js) and react-dropzone
- ESLint

## Project structure

```
src/
  App.tsx                 layout and shared state
  PdfViewer.tsx           PDF rendering, page navigation and text selection
  PDFUploadComponent.tsx  drag-and-drop PDF upload
  Chat.tsx                chat panel
  2210.07544.pdf          sample PDF shown on first load
  main.tsx                entry point
  index.css               Tailwind directives
tailwind.config.js        Tailwind config with the fade-in animation
vite.config.ts            Vite config
```

## Getting started

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (http://localhost:5173 by default).

Other scripts:

- `npm run build` type-checks the project and builds it into `dist/`
- `npm run preview` serves the production build
- `npm run lint` runs ESLint

No environment variables are needed. The PDF.js worker loads from cdnjs, so the viewer needs an internet connection.

## Sample PDF

The PDF bundled in `src/` is the arXiv paper [2210.07544](https://arxiv.org/abs/2210.07544), "Legal Case Document Summarization: Extractive and Abstractive Methods and their Evaluation". It is only there so the viewer has something to show.

## Changes in this fork

Made by Hamza Tahir:

- Replaced the original CSS files with Tailwind CSS and rebuilt the three-panel layout with flexbox and a fade-in animation.
- Restyled the chat panel, the page controls and the upload area.
- Connected the upload area to the viewer, so an uploaded PDF now opens in the viewer.
- Fixed the TypeScript errors that stopped `npm run build`, updated the react-dropzone `accept` option to the current format, and stopped empty chat messages from being added.
- Removed unused dependencies (`@pdftron/webviewer`, `@react-pdf/renderer` and a second copy of `pdfjs-dist`), unused code and template files.

## License

The original repository does not include a license, so this fork does not add one.
