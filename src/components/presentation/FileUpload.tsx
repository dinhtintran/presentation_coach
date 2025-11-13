"use client";

import { useState, useRef } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import type { Presentation, UploadState } from "@/types/presentation";

interface FileUploadProps {
  onUploadComplete: (presentation: Presentation) => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    isUploading: false,
    progress: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];

    if (!validTypes.includes(file.type)) {
      setUploadState({
        ...uploadState,
        error: "Please upload a PDF or PowerPoint file",
      });
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setUploadState({
        ...uploadState,
        error: "File size must be less than 50MB",
      });
      return;
    }

    setUploadState({ file, isUploading: false, progress: 0 });
  };

  const handleUpload = async () => {
    if (!uploadState.file) return;

    setUploadState({ ...uploadState, isUploading: true, progress: 0 });

    const formData = new FormData();
    formData.append("file", uploadState.file);

    try {
      const response = await fetch("/api/presentation/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      onUploadComplete(data.presentation);
    } catch (error) {
      setUploadState({
        ...uploadState,
        isUploading: false,
        error: "Failed to upload file. Please try again.",
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInputRef.current!.files = e.dataTransfer.files;
      handleFileSelect({
        target: { files: e.dataTransfer.files },
      } as any);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className="relative border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 hover:bg-slate-50 group"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.ppt,.pptx"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!uploadState.file ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-slate-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900 mb-2">
                Upload your presentation
              </p>
              <p className="text-sm text-slate-500">
                Drag & drop or click to browse • PDF or PowerPoint • Max 50MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-8 h-8 text-slate-600" />
              <div className="text-left">
                <p className="font-medium text-slate-900">
                  {uploadState.file.name}
                </p>
                <p className="text-sm text-slate-500">
                  {(uploadState.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadState({
                    file: null,
                    isUploading: false,
                    progress: 0,
                  });
                }}
                className="ml-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {uploadState.error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {uploadState.error}
        </div>
      )}

      {/* Upload Button */}
      {uploadState.file && !uploadState.isUploading && (
        <button
          onClick={handleUpload}
          className="mt-6 w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
        >
          Process Presentation
        </button>
      )}

      {/* Loading State */}
      {uploadState.isUploading && (
        <div className="mt-6 p-6 bg-slate-50 rounded-xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
            <span className="text-slate-700 font-medium">
              Processing your presentation...
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 transition-all duration-300 rounded-full"
              style={{ width: `${uploadState.progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
