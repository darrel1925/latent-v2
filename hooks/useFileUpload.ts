"use client";

import { useCallback, useState } from "react";

// Custom hook for handling file uploads
export default function useFileUpload() {
  // State to track if a file is currently being uploaded
  const [isUploading, setIsUploading] = useState(false);
  // State to track the progress of the upload (0-100)
  const [uploadProgress, setUploadProgress] = useState(0);
  // State to store any error that occurs during upload
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Memoized function to handle file upload
  const uploadFile = useCallback(async (file: File) => {
    // Set initial states when upload starts
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    // Create FormData object to send file to server
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Send POST request to upload endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        // Note: Content-Type is not set manually to allow browser to set correct boundary
      });

      // Check if the upload was successful
      if (!response.ok) {
        throw new Error("Upload failed");
      }

      // Parse the response
      const result = await response.json();
      // Set progress to 100% on successful upload
      setUploadProgress(100);
      return result;
    } catch (error) {
      // Handle and set error state
      setUploadError(error instanceof Error ? error.message : "An unknown error occurred");
      throw error;
    } finally {
      // Reset uploading state regardless of success or failure
      setIsUploading(false);
    }
  }, []); // Empty dependency array means this function is created once and never recreated

  // Return the upload function and state variables
  return { uploadFile, isUploading, uploadProgress, uploadError };
}