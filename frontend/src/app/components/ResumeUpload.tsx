import { useCallback, useState } from 'react';
import { Upload, FileText, X, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

interface ResumeUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemove: () => void;
}

export function ResumeUpload({ onFileSelect, selectedFile, onRemove }: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      onFileSelect(file);
    }
  };

  const isValidFile = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    return validTypes.includes(file.type);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (selectedFile) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{selectedFile.name}</p>
            <p className="text-sm text-secondary">{formatFileSize(selectedFile.size)}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-xl p-12 text-center transition-all
        ${isDragging 
          ? 'border-primary bg-accent/50' 
          : 'border-border bg-card hover:border-primary/50 hover:bg-accent/20'
        }
      `}
    >
      <input
        type="file"
        id="resume-upload"
        className="hidden"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileInput}
      />
      
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Upload Your Resume
          </h3>
          <p className="text-secondary mb-4">
            Drag & drop your resume here or click to browse
          </p>
          <p className="text-xs text-secondary">
            Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
          </p>
        </div>

        <label htmlFor="resume-upload">
          <Button type="button" size="lg" asChild>
            <span className="cursor-pointer">
              <FileText className="w-4 h-4 mr-2" />
              Choose File
            </span>
          </Button>
        </label>
      </div>
    </div>
  );
}
