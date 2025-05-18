
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Upload, Download, Share2, Trash2, Filter, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for the file list
const mockFiles = [
  {
    id: "1",
    name: "project_proposal.pdf",
    type: "PDF",
    size: "2.5MB",
    cid: "QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps",
    uploadDate: "2025-04-17",
    status: "verified",
  },
  {
    id: "2",
    name: "contract_draft.docx",
    type: "DOCX",
    size: "1.2MB",
    cid: "QmT8KR5hGKdq8ynpbmj6VNvHsbEpXdWgGZA9n5trRaABut",
    uploadDate: "2025-04-16",
    status: "pending",
  },
  {
    id: "3",
    name: "financial_report_2025.xlsx",
    type: "XLSX",
    size: "3.7MB",
    cid: "QmWUkCTMskYwraXzXE3TUQysVjGGYNpn8gChh3oK7v3sQ9",
    uploadDate: "2025-04-15",
    status: "verified",
  },
  {
    id: "4",
    name: "profile_photo.jpg",
    type: "JPG",
    size: "0.8MB",
    cid: "QmZA8NTpnrQrE3mLYmGe1UHLaKDFnTeZTEYRzN9n7Dqw7v",
    uploadDate: "2025-04-14",
    status: "failed",
  },
  {
    id: "5",
    name: "system_backup.zip",
    type: "ZIP",
    size: "128MB",
    cid: "QmXd9T7HJFuTvKh4GqnvgJHbKMY3JLGEcbMgJRQAuCgfTv",
    uploadDate: "2025-04-13",
    status: "verified",
  },
];

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [files] = useState(mockFiles);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/20">
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20">
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/20">
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1>Dashboard</h1>
        <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Upload Area */}
      <Card className="glass-panel neon-border">
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="w-full max-w-md h-48 border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center p-6 transition-colors hover:border-primary cursor-pointer">
            <Upload className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center mb-2">
              Drag & drop files here, or click to select files
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Supports all file types up to 500MB
            </p>
          </div>
          <div className="mt-4 w-full max-w-md">
            <Link to="/upload">
              <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Files Table */}
      <Card className="glass-panel">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Your Files</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none sm:min-w-[200px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Files</DropdownMenuItem>
                  <DropdownMenuItem>Verified Only</DropdownMenuItem>
                  <DropdownMenuItem>Pending</DropdownMenuItem>
                  <DropdownMenuItem>Failed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Size</TableHead>
                  <TableHead className="hidden lg:table-cell">CID</TableHead>
                  <TableHead className="hidden md:table-cell">Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No files found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>{file.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">{file.type}</TableCell>
                      <TableCell className="hidden md:table-cell">{file.size}</TableCell>
                      <TableCell className="hidden lg:table-cell font-mono text-xs">
                        {file.cid.substring(0, 10)}...{file.cid.substring(file.cid.length - 6)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{file.uploadDate}</TableCell>
                      <TableCell>{getStatusBadge(file.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
