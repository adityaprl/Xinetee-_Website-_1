
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Check, X, Search, AlertCircle, Shield, Clock, User } from "lucide-react";
import { toast } from "sonner";

type VerificationStatus = "idle" | "loading" | "valid" | "tampered" | "unregistered" | "error";

const VerificationPage = () => {
  const [cid, setCid] = useState("");
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [fileDetails, setFileDetails] = useState<any | null>(null);

  const verifyFile = () => {
    if (!cid) {
      toast.error("Please enter a CID to verify");
      return;
    }

    setStatus("loading");

    // Mock verification process
    setTimeout(() => {
      if (cid.startsWith("Qm") && cid.length > 20) {
        // Valid CID format
        const randomStatus: VerificationStatus[] = ["valid", "tampered", "unregistered"];
        const result = randomStatus[Math.floor(Math.random() * randomStatus.length)];
        
        setStatus(result);
        
        if (result === "valid") {
          setFileDetails({
            name: "document.pdf",
            type: "application/pdf",
            size: "2.4MB",
            timestamp: "2025-05-17T15:32:45Z",
            owner: "0x7Fc56A8F4f873C5A82ABe2fC40A5724B49C5f373",
            uploadedAt: "2025-05-17",
            lastVerified: "2025-05-18",
            blockNumber: 14529384,
            integrityHash: "e5c144f9936cf2906d5518e5f2f4786332e97dce",
          });
        } else {
          setFileDetails(null);
        }
      } else {
        setStatus("error");
        setFileDetails(null);
      }
    }, 1500);
  };

  const renderStatusContent = () => {
    switch (status) {
      case "valid":
        return (
          <Alert className="border-green-500/40 bg-green-500/10">
            <Check className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-500">Verification Successful</AlertTitle>
            <AlertDescription className="text-green-500/80">
              This file is valid and has not been tampered with since being registered on the blockchain.
            </AlertDescription>
          </Alert>
        );
      case "tampered":
        return (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Tampering Detected</AlertTitle>
            <AlertDescription>
              This file has been modified since it was registered on the blockchain.
              The current file hash does not match the registered hash.
            </AlertDescription>
          </Alert>
        );
      case "unregistered":
        return (
          <Alert variant="default" className="border-yellow-500/40 bg-yellow-500/10">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <AlertTitle className="text-yellow-500">Unregistered Content</AlertTitle>
            <AlertDescription className="text-yellow-500/80">
              This CID is not registered on the Xinete blockchain. It may be from another system or may not exist.
            </AlertDescription>
          </Alert>
        );
      case "error":
        return (
          <Alert variant="destructive">
            <X className="h-4 w-4" />
            <AlertTitle>Invalid CID Format</AlertTitle>
            <AlertDescription>
              The provided string does not appear to be a valid Content Identifier (CID).
              Please check and try again.
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 py-8">
      <h1>CID Verification</h1>

      <Card className="glass-panel neon-border">
        <CardHeader>
          <CardTitle>Verify File Integrity</CardTitle>
          <CardDescription>
            Enter a Content Identifier (CID) to verify its integrity on the Xinete blockchain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter CID (Qm...)"
                value={cid}
                onChange={(e) => setCid(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={verifyFile}
                disabled={status === "loading"}
                className="bg-primary hover:bg-primary/80 text-primary-foreground"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Verify
                  </>
                )}
              </Button>
            </div>

            {status !== "idle" && renderStatusContent()}

            {status === "valid" && fileDetails && (
              <div className="mt-6">
                <Separator className="my-6" />
                
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">File Details</TabsTrigger>
                    <TabsTrigger value="ownership">Ownership</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">File Name</h4>
                          <p>{fileDetails.name}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">File Type</h4>
                          <p>{fileDetails.type}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">File Size</h4>
                          <p>{fileDetails.size}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Integrity Hash</h4>
                          <p className="font-mono text-xs">{fileDetails.integrityHash}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Block Number</h4>
                          <p>{fileDetails.blockNumber}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Timestamp</h4>
                          <p>{new Date(fileDetails.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ownership" className="pt-4">
                    <div className="rounded-md bg-secondary/20 p-4">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <User className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Owner</h4>
                            <p className="font-mono text-xs text-muted-foreground mt-1">
                              {fileDetails.owner}
                            </p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-neon-blue mt-0.5" />
                          <div>
                            <h4 className="font-medium">Verification Status</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              This file is verified and protected by Xinete's
                              triple-layer security protocol.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                              <span className="text-xs text-green-500">Blockchain Verified</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="pt-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-neon-pink mt-0.5" />
                        <div>
                          <h4 className="font-medium">Timeline</h4>
                          <div className="mt-4 space-y-8 relative before:absolute before:inset-y-0 before:left-[7px] before:w-[2px] before:bg-muted">
                            <div className="relative pl-6">
                              <span className="absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-primary bg-background"></span>
                              <h5 className="font-medium">File Uploaded</h5>
                              <p className="text-sm text-muted-foreground">
                                {fileDetails.uploadedAt}
                              </p>
                            </div>
                            <div className="relative pl-6">
                              <span className="absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-primary bg-background"></span>
                              <h5 className="font-medium">Last Verification</h5>
                              <p className="text-sm text-muted-foreground">
                                {fileDetails.lastVerified}
                              </p>
                            </div>
                            <div className="relative pl-6">
                              <span className="absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-neon-green bg-background"></span>
                              <h5 className="font-medium">Current Verification</h5>
                              <p className="text-sm text-muted-foreground">
                                {new Date().toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>About Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How it works</h3>
              <p className="text-sm text-muted-foreground">
                Each file uploaded to Xinete receives a unique Content Identifier (CID).
                This CID is then registered on our blockchain along with a cryptographic hash
                of the file contents, timestamp, and ownership details.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Verification results</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="text-sm"><strong>Valid</strong>: File exists and matches its blockchain record</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                  <span className="text-sm"><strong>Tampered</strong>: File has been modified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
                  <span className="text-sm"><strong>Unregistered</strong>: CID not found on blockchain</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPage;
