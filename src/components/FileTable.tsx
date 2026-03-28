import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { Link } from "react-router-dom";
import { FileItem } from "@/data/mockData";

interface FileTableProps {
  files: FileItem[];
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

const FileTable = ({ files, onDelete, isLoading }: FileTableProps) => {
  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading files...</div>;
  }

  if (files.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No files found</div>;
  }

  return (
    <div className="glass-card overflow-hidden">
      <table className="w-full text-sm font-light">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="p-4 font-medium text-muted-foreground">File Name</th>
            <th className="p-4 font-medium text-muted-foreground hidden sm:table-cell">Size</th>
            <th className="p-4 font-medium text-muted-foreground hidden md:table-cell">Upload Date</th>
            <th className="p-4 font-medium text-muted-foreground">Status</th>
            <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
              <td className="p-4 font-medium">{file.name}</td>
              <td className="p-4 text-muted-foreground hidden sm:table-cell">{file.size}</td>
              <td className="p-4 text-muted-foreground hidden md:table-cell">{file.uploadDate}</td>
              <td className="p-4"><StatusBadge status={file.status} /></td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Link to="/results">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Eye className="h-3.5 w-3.5" /></Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 hover:text-destructive"
                    onClick={() => onDelete?.(file.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
