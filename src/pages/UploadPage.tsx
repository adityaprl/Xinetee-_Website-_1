
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Upload, Check, Copy, X, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPublic, setIsPublic] = useState(false);
  const [uploadedCID, setUploadedCID] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStarted, setUploadStarted] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadProgress(0);
      setUploadedCID(null);
      setUploadStarted(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setUploadProgress(0);
      setUploadedCID(null);
      setUploadStarted(false);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadStarted(true);
    
    // Mock upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
        
        // Mock CID generation after upload completes
        setTimeout(() => {
          setUploadedCID("QmX9cRmgUaYcLeENYP3AZK8sUSL7oMYQYwc2xdcmRt5Y6V");
          setIsUploading(false);
          toast.success("File uploaded successfully!");
        }, 500);
      }
      setUploadProgress(Math.floor(progress));
    }, 300);
  };

  const copyToClipboard = () => {
    if (uploadedCID) {
      navigator.clipboard.writeText(uploadedCID);
      toast.success("CID copied to clipboard!");
    }
  };

  return (
    <div className="space-y-8 py-8">
      <h1>Upload File</h1>
      
      <Card className="glass-panel neon-border">
        <CardHeader>
          <CardTitle>Upload to Xinete</CardTitle>
        </CardHeader>
        <CardContent>
          {!uploadStarted ? (
            <div className="space-y-6">
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="w-full h-64 border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center p-6 transition-colors hover:border-primary cursor-pointer"
              >
                {selectedFile ? (
                  <div className="text-center">
                    <Check className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="font-medium mb-1">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Badge variant="outline" className="mt-2">
                      {selectedFile.type || "Unknown type"}
                    </Badge>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-lg font-medium mb-1">Drop file here or click to browse</p>
                    <p className="text-sm text-muted-foreground text-center">
                      Supports all file types up to 500MB
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="public-access"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
                <Label htmlFor="public-access">Make this file publicly accessible</Label>
              </div>
              
              <div className="flex justify-end">
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  className="bg-primary hover:bg-primary/80 text-primary-foreground glow glow-purple"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Start Upload
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium">{selectedFile?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isUploading}
                    onClick={() => {
                      setSelectedFile(null);
                      setUploadProgress(0);
                      setUploadedCID(null);
                      setUploadStarted(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      {isUploading
                        ? "Uploading..."
                        : uploadedCID
                        ? "Upload Complete"
                        : "Preparing..."}
                    </span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              </div>
              
              {uploadedCID && (
                <div className="space-y-4">
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Content Identifier (CID)</Label>
                    <div className="flex">
                      <div className="bg-secondary/50 p-2 rounded-l-md font-mono text-xs flex-1 overflow-x-auto">
                        {uploadedCID}
                      </div>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-l-none"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Your content is now immutably stored on the blockchain
                    </p>
                  </div>
                  
                  <Tabs defaultValue="metadata">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="metadata">Metadata</TabsTrigger>
                      <TabsTrigger value="verification">Verification</TabsTrigger>
                    </TabsList>
                    <TabsContent value="metadata" className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">File Name</div>
                        <div className="text-muted-foreground">{selectedFile?.name}</div>
                        
                        <div className="font-medium">Size</div>
                        <div className="text-muted-foreground">
                          {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                        
                        <div className="font-medium">Type</div>
                        <div className="text-muted-foreground">
                          {selectedFile?.type || "Unknown"}
                        </div>
                        
                        <div className="font-medium">Timestamp</div>
                        <div className="text-muted-foreground">
                          {new Date().toISOString()}
                        </div>
                        
                        <div className="font-medium">Access</div>
                        <div className="text-muted-foreground">
                          {isPublic ? "Public" : "Private"}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="verification">
                      <div className="rounded-md bg-green-500/10 border border-green-500/20 p-4 flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-500">Verification Successful</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your file has been successfully verified and added to the Xinete blockchain.
                            You can verify this file anytime using the CID.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => window.location.href = "/dashboard"}>
                      Go to Dashboard
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedFile(null);
                        setUploadProgress(0);
                        setUploadedCID(null);
                        setUploadStarted(false);
                      }}
                      className="bg-primary hover:bg-primary/80 text-primary-foreground"
                    >
                      Upload Another File
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadPage;
