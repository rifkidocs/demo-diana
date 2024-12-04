"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function ExcelImportSimulation() {
  const { toast } = useToast();
  const [file, setFile] = useState(null); // Tidak perlu tipe di JavaScript

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (file) {
      // Simulasi proses impor
      setTimeout(() => {
        toast({
          title: "Impor Berhasil",
          description: `File ${file.name} telah berhasil diimpor.`,
        });
        setFile(null);
      }, 2000);
    } else {
      toast({
        title: "Error",
        description: "Pilih file Excel terlebih dahulu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      <Input
        type='file'
        accept='.xlsx, .xls'
        onChange={handleFileChange}
        className='max-w-sm'
      />
      <Button onClick={handleImport}>Impor Excel</Button>
    </div>
  );
}
