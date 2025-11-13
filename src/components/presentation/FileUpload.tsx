"use client";

import { useState, useRef } from "react";
import { Upload, FileText, X, Loader2, Sparkles } from "lucide-react";
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

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

    // Set file and start uploading immediately
    setUploadState({ file, isUploading: true, progress: 0 });

    // Auto-upload
    const formData = new FormData();
    formData.append("file", file);

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
        file,
        isUploading: false,
        progress: 0,
        error: "Failed to upload file. Please try again.",
      });
    }
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

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Create a synthetic event for handleFileSelect
      const syntheticEvent = {
        target: { files: e.dataTransfer.files },
      } as React.ChangeEvent<HTMLInputElement>;
      
      await handleFileSelect(syntheticEvent);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50 group-hover:opacity-70" />
        
        {/* Main container */}
        <div className="relative backdrop-blur-xl bg-white/10 border-2 border-dashed border-white/30 group-hover:border-purple-400/60 rounded-3xl p-12 md:p-16 text-center transition-all duration-300">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.ppt,.pptx"
            onChange={handleFileSelect}
            className="hidden"
          />

          {!uploadState.file ? (
            <div className="space-y-6">
              {/* Upload Icon with gradient */}
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl rotate-6 group-hover:rotate-12 transition-all duration-300 opacity-20" />
                <div className="relative w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-10 h-10 text-purple-300 group-hover:text-purple-200 transition-colors" />
                </div>
              </div>

              {/* Text */}
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                  Upload Your Presentation
                </h3>
                <p className="text-gray-300 text-base md:text-lg max-w-md mx-auto leading-relaxed">
                  Drag & drop your file here or click to browse
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400 pt-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    📄 PDF
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    📊 PowerPoint
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    📦 Max 50MB
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 border border-white/10">
                    <FileText className="w-6 h-6 text-purple-300" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-semibold text-white truncate mb-1">
                      {uploadState.file.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {(uploadState.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                {!uploadState.isUploading && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadState({
                        file: null,
                        isUploading: false,
                        progress: 0,
                      });
                    }}
                    className="p-2.5 hover:bg-white/10 rounded-xl transition-all duration-200 flex-shrink-0 group/btn border border-transparent hover:border-white/20"
                  >
                    <X className="w-5 h-5 text-gray-400 group-hover/btn:text-white transition-colors" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {uploadState.error && (
        <div className="mt-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl blur-xl" />
          <div className="relative backdrop-blur-sm bg-red-500/10 border border-red-400/30 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-400 text-sm">⚠️</span>
              </div>
              <p className="text-red-200 text-sm leading-relaxed flex-1">
                {uploadState.error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {uploadState.isUploading && (
        <div className="mt-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
          <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
              <span className="text-white font-semibold text-lg">
                Processing your presentation...
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-300 rounded-full relative overflow-hidden"
                style={{ width: `${uploadState.progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm mt-4">
              This may take a few moments...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
