
import React, { useState, useCallback } from 'react';
import { Upload, ImagePlus, FilePlus, XCircle, Check, Loader2, Tag, Info } from 'lucide-react';

export default function Hero() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState([]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      file.type === 'image/jpeg' || file.type === 'image/jpg'
    );
    
    if (validFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...validFiles]);
    }
  }, []);

  const handleFileChange = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => 
      file.type === 'image/jpeg' || file.type === 'image/jpg'
    );
    
    if (validFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...validFiles]);
    }
  }, []);

  const removeFile = useCallback((index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  }, []);

  const processImages = useCallback(() => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate processing with random tags and bounding boxes
    const possibleTags = ['Person', 'Car', 'Building', 'Tree', 'Animal', 'Phone', 'Chair', 'Table', 'Computer'];
    
    setTimeout(() => {
      const processedResults = files.map(file => {
        const numTags = Math.floor(Math.random() * 3) + 1;
        const tags = [];
        
        for (let i = 0; i < numTags; i++) {
          const randomIndex = Math.floor(Math.random() * possibleTags.length);
          if (!tags.includes(possibleTags[randomIndex])) {
            tags.push(possibleTags[randomIndex]);
          }
        }
        
        // Create random bounding boxes
        const numBoxes = Math.floor(Math.random() * 2) + 1;
        const boxes = [];
        
        for (let i = 0; i < numBoxes; i++) {
          boxes.push({
            x: Math.random() * 70 + 10, // 10-80%
            y: Math.random() * 70 + 10, // 10-80%
            width: Math.random() * 30 + 10, // 10-40%
            height: Math.random() * 30 + 10, // 10-40%
            label: tags[Math.floor(Math.random() * tags.length)]
          });
        }
        
        return {
          name: file.name,
          url: URL.createObjectURL(file),
          tags,
          boxes
        };
      });
      
      setResults(processedResults);
      setIsProcessing(false);
    }, 2000);
  }, [files]);

  const resetAll = useCallback(() => {
    setFiles([]);
    setResults([]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
       

        {/* Hero section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Instant Image Analysis
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upload single or multiple images to get instant object detection, segmentation, and classification. Perfect for researchers and ML enthusiasts.
          </p>
        </div>

        {/* Upload area */}
        {results.length === 0 && (
          <div className="mb-12">
            <div 
              className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-colors ${
                isDragging ? 'border-blue-400 bg-blue-900/20' : 'border-gray-600 hover:border-gray-400'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload size={48} className="text-blue-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">Drag & Drop Images Here</h3>
              <p className="text-gray-400 mb-4 text-center max-w-md">
                Upload .jpg or .jpeg files. Single image or multiple files supported.
              </p>
              <label className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
                Browse Files
                <input 
                  type="file" 
                  accept=".jpg,.jpeg" 
                  multiple 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* File list */}
            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4">Selected Files ({files.length})</h3>
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <FilePlus className="text-blue-400" />
                        <span className="text-gray-300">{file.name}</span>
                        <span className="text-gray-500 text-sm">{(file.size / 1024).toFixed(1)} KB</span>
                      </div>
                      <button 
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-4 justify-center">
                  <button 
                    onClick={resetAll}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={processImages}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Check size={20} />
                    Process Images
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Processing indicator */}
        {isProcessing && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={48} className="text-blue-400 animate-spin mb-4" />
            <h3 className="text-xl font-medium">Processing Images...</h3>
            <p className="text-gray-400">This may take a few moments.</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && !isProcessing && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-medium">Analysis Results</h3>
              <button 
                onClick={resetAll}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2"
              >
                <Upload size={16} />
                Upload New Images
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.map((result, index) => (
                <div key={index} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                  <div className="relative">
                    <img 
                      src={result.url} 
                      alt={result.name} 
                      className="w-full h-64 object-cover"
                    />
                    
                    {/* Bounding boxes */}
                    {result.boxes.map((box, boxIndex) => (
                      <div 
                        key={boxIndex}
                        className="absolute border-2 border-blue-500 bg-blue-500/20 flex items-end justify-start"
                        style={{
                          left: `${box.x}%`,
                          top: `${box.y}%`,
                          width: `${box.width}%`,
                          height: `${box.height}%`
                        }}
                      >
                        <span className="bg-blue-500 text-xs px-1 py-0.5 rounded-sm text-white">
                          {box.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-medium mb-2">{result.name}</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {result.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-md text-sm"
                        >
                          <Tag size={14} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Info size={14} />
                      <span>{result.boxes.length} objects detected</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Tag className="text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">Smart Classification</h3>
            <p className="text-gray-400">
              Automatically identify and tag objects in your images with high precision.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <ImagePlus className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">Batch Processing</h3>
            <p className="text-gray-400">
              Upload multiple images at once and get analysis results for your entire dataset.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="bg-green-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Download className="text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">Export Results</h3>
            <p className="text-gray-400">
              Download annotated images and analysis data in multiple formats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Download(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}