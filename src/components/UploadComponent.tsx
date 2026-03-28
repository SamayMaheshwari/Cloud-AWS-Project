import { useState, useCallback } from "react";
import { Upload, File, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface UploadComponentProps {
  onUpload?: (file: File) => void;
  className?: string;
  supportedExtensions?: string[];
}

const UploadComponent = ({ onUpload, className, supportedExtensions = ["cpp", "py", "txt", "pdf"] }: UploadComponentProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleFile = useCallback((f: File) => {
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (supportedExtensions.includes(ext || "")) {
      setFile(f);
      setDone(false);
      setProgress(0);
    }
  }, [supportedExtensions]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => { 
          setUploading(false); 
          setDone(true);
          toast.success("File processed successfully");
          onUpload?.(file);
        }, 500);
      }
      setProgress(Math.min(p, 100));
    }, 300);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div
        className={cn(
          "glass-card p-10 border-2 border-dashed text-center transition-colors cursor-pointer",
          dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
        )}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <p className="text-sm font-medium">Drag & drop your file here</p>
        <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
        <p className="text-xs text-muted-foreground mt-3">Supported: {supportedExtensions.map(ext => `.${ext}`).join(", ")}</p>
        <input 
          id="file-input" 
          type="file" 
          accept={supportedExtensions.map(ext => `.${ext}`).join(",")} 
          className="hidden" 
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} 
        />
      </div>

      {file && (
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center gap-3">
            <File className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>

          {(uploading || done) && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {uploading && <><Loader2 className="h-3 w-3 animate-spin" /> Processing...</>}
                {done && <><CheckCircle className="h-3 w-3 text-success" /> Upload complete</>}
              </div>
            </div>
          )}

          {!uploading && !done && (
            <Button onClick={handleUpload} className="w-full">Upload & Analyze</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
