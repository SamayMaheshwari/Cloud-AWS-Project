import UploadComponent from "@/components/UploadComponent";

const UploadPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Upload File</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload files for cloud-powered analysis</p>
      </div>

      <UploadComponent />
    </div>
  );
};

export default UploadPage;
