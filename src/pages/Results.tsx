import { useState, useEffect } from "react";
import { FileText, AlertCircle } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import Loader from "@/components/Loader";
import { apiService } from "@/services/api";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";

const scoreColor = (s: number) => s >= 80 ? "text-success" : s >= 50 ? "text-warning" : "text-destructive";

const Results = () => {
  const { id } = useParams();
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await apiService.getResults(id || "1");
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [id]);

  if (loading) return <Loader text="Analyzing your file..." />;
  if (!results) return <div className="text-center p-8 text-muted-foreground">Results not found</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analysis Results</h1>
        <p className="text-sm text-muted-foreground mt-1">Detailed report for your uploaded file</p>
      </div>

      {/* File Info */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">File Information</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><span className="text-muted-foreground">File Name</span><p className="font-medium mt-0.5">{results.fileName}</p></div>
          <div><span className="text-muted-foreground">Upload Date</span><p className="font-medium mt-0.5">{results.uploadDate}</p></div>
          <div><span className="text-muted-foreground">Status</span><div className="mt-1"><StatusBadge status={results.status} /></div></div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="glass-card p-5">
        <h3 className="font-semibold mb-4">Analysis Summary</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-destructive">{results.errorsFound}</p>
            <p className="text-xs text-muted-foreground mt-1">Errors Found</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className={cn("text-2xl font-bold", scoreColor(results.qualityScore))}>{results.qualityScore}%</p>
            <p className="text-xs text-muted-foreground mt-1">Quality Score</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-primary">B+</p>
            <p className="text-xs text-muted-foreground mt-1">Grade</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{results.summary}</p>
      </div>

      {/* Error List */}
      <div className="glass-card p-5">
        <h3 className="font-semibold mb-4">Error Details</h3>
        <div className="space-y-3">
          {results.errors.map((err: any, i: number) => (
            <div key={i} className="flex gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-mono text-destructive">Line {err.line}</p>
                <p className="text-sm mt-0.5">{err.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
