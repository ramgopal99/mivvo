"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Award, Download, Share2, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface CertificateProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  completionDate?: string;
}

const Certificate: React.FC<CertificateProps> = ({
  isOpen,
  onClose,
  courseName,
  completionDate
}) => {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'Student';

  const [isGenerating, setIsGenerating] = React.useState(false);
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);

  const generateCertificate = React.useCallback(async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate certificate");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("Failed to generate certificate. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [userName]);

  // Generate PDF when modal opens
  React.useEffect(() => {
    if (isOpen && !pdfUrl) {
      generateCertificate();
    }
  }, [isOpen, pdfUrl, generateCertificate]);

  // Cleanup PDF URL when modal closes
  React.useEffect(() => {
    if (!isOpen && pdfUrl) {
      window.URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  }, [isOpen, pdfUrl]);

  const handleDownload = async () => {
    if (!pdfUrl) {
      await generateCertificate();
      return;
    }

    // Create a temporary link element to trigger download
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${userName}-${courseName.replace(/\s+/g, "-")}-certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    // For now, just show a placeholder. In a real implementation, this would open share options
    console.log('Share certificate functionality to be implemented');
    alert('Certificate sharing feature will be available soon!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full w-[95vw] h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-primary">
            Course Completion Certificate
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* PDF Display */}
          <div className="flex-1 min-h-0">
            {isGenerating ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-lg text-muted-foreground">Generating your certificate...</p>
                </div>
              </div>
            ) : pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full border rounded-lg"
                title="Certificate PDF"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">Failed to load certificate</p>
                  <Button
                    onClick={generateCertificate}
                    className="mt-4"
                    variant="outline"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 justify-center">
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-base sm:text-lg px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              {isGenerating ? "Generating..." : "Download Certificate"}
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              className="flex items-center justify-center gap-2 text-base sm:text-lg px-6 py-3"
            >
              <Share2 className="w-5 h-5" />
              Share Achievement
            </Button>

            <Button
              onClick={onClose}
              variant="outline"
              className="flex items-center justify-center gap-2 text-base sm:text-lg px-6 py-3"
            >
              <X className="w-5 h-5" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Certificate;
