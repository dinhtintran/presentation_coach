"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
// Configure PDF.js to use a real Worker instead of workerSrc URL
if (typeof window !== "undefined" && typeof Worker !== "undefined") {
  try {
    const worker = new Worker(
      // Construct a URL relative to this module so the bundler serves it
      new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url),
      { type: "module" }
    );
    // @ts-ignore - types may not include workerPort
    pdfjsLib.GlobalWorkerOptions.workerPort = worker;
  } catch (e) {
    // Fallback: let pdfjs create a fake worker (slower) rather than crash
    // eslint-disable-next-line no-console
    console.warn("PDF.js worker setup failed, using fake worker:", e);
  }
}

interface PDFSlideViewerProps {
  fileUrl: string;
  currentSlide: number;
  onLoadComplete?: (totalPages: number) => void;
}

export function PDFSlideViewer({ fileUrl, currentSlide, onLoadComplete }: PDFSlideViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const renderTaskRef = useRef<any>(null);

  // Load PDF document
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setIsLoading(true);
        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        if (onLoadComplete) {
          onLoadComplete(pdfDoc.numPages);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("Failed to load PDF");
        setIsLoading(false);
      }
    };

    loadPdf();
  }, [fileUrl]);

  // Render current page
  useEffect(() => {
    if (!pdf || !canvasRef.current) return;

    const renderPage = async () => {
      try {
        const page = await pdf.getPage(currentSlide + 1);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Calculate scale to fit container (consider rotation)
        const container = canvas.parentElement as HTMLElement | null;
        const containerWidth = container?.clientWidth || 800;
        const containerHeight = container?.clientHeight || Math.round((containerWidth * 9) / 16);

        const rotation = (page.rotate || 0) % 360;
        const baseViewport = page.getViewport({ scale: 1, rotation });
        const scale = Math.min(containerWidth / baseViewport.width, containerHeight / baseViewport.height);
        const scaledViewport = page.getViewport({ scale, rotation });

        canvas.width = Math.floor(scaledViewport.width);
        canvas.height = Math.floor(scaledViewport.height);

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };

        // Cancel previous render if any
        if (renderTaskRef.current && typeof renderTaskRef.current.cancel === "function") {
          try { renderTaskRef.current.cancel(); } catch {}
        }
        renderTaskRef.current = page.render(renderContext);
        await renderTaskRef.current.promise;
      } catch (err) {
        console.error("Error rendering page:", err);
      }
    };

    renderPage();
    // Re-render on window resize to keep fit view
    const onResize = () => renderPage();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (renderTaskRef.current && typeof renderTaskRef.current.cancel === "function") {
        try { renderTaskRef.current.cancel(); } catch {}
      }
    };
  }, [pdf, currentSlide]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-contain"
    />
  );
}
