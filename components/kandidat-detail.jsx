import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const recruitmentSteps = [
  "Aplikasi",
  "Screening",
  "Wawancara",
  "Tes Teknis",
  "Penawaran",
  "Diterima",
];

export function KandidatDetail({
  kandidat,
  onUpdateStatus,
  onUpdateNotes,
  cv,
}) {
  const [currentStatus, setCurrentStatus] = useState(kandidat?.status || "");
  const [notes, setNotes] = useState(kandidat?.notes || {});

  useEffect(() => {
    if (kandidat) {
      setCurrentStatus(kandidat.status);
      setNotes(kandidat.notes || {});
    }
  }, [kandidat]);

  if (!kandidat) {
    return (
      <Card>
        <CardContent>Pilih kandidat untuk melihat detail.</CardContent>
      </Card>
    );
  }

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    onUpdateStatus(kandidat.id, newStatus);
  };

  const handleNoteChange = (step, note) => {
    const updatedNotes = { ...notes, [step]: note };
    setNotes(updatedNotes);
    onUpdateNotes(kandidat.id, updatedNotes);
  };

  return (
    <Card className='h-[calc(100vh-200px)] overflow-auto'>
      <CardHeader>
        <CardTitle>
          {kandidat.name} - {kandidat.role}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' value={kandidat.email} readOnly />
          </div>
          <div>
            <Label htmlFor='phone'>Nomor Telepon</Label>
            <Input id='phone' value={kandidat.phone} readOnly />
          </div>
        </div>
        <div>
          <Label htmlFor='experience'>Pengalaman Kerja</Label>
          <Textarea id='experience' value={kandidat.experience} readOnly />
        </div>
        <div>
          <Label htmlFor='education'>Pendidikan</Label>
          <Textarea id='education' value={kandidat.education} readOnly />
        </div>
        <div>
          <Label htmlFor='skills'>Keahlian</Label>
          <Textarea id='skills' value={kandidat.skills} readOnly />
        </div>
        <div>
          <Label htmlFor='coverLetter'>Surat Lamaran</Label>
          <div className='flex items-center space-x-2'>
            <Input id='coverLetter' value={kandidat.coverLetterPdf} readOnly />
            <Button asChild>
              <a
                href={kandidat.coverLetterPdf}
                target='_blank'
                rel='noopener noreferrer'>
                Lihat PDF
              </a>
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor='coverLetter'>Curriculum Vitae</Label>
          <div className='flex items-center space-x-2'>
            <Input id='coverLetter' value={kandidat.cv} readOnly />
            <Button asChild>
              <a href={kandidat.cv} target='_blank' rel='noopener noreferrer'>
                Lihat PDF
              </a>
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor='status'>Status Rekrutmen</Label>
          <Select onValueChange={handleStatusChange} value={currentStatus}>
            <SelectTrigger>
              <SelectValue placeholder='Pilih status' />
            </SelectTrigger>
            <SelectContent>
              {recruitmentSteps.map((step) => (
                <SelectItem key={step} value={step}>
                  {step}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Catatan per Tahap</Label>
          <Tabs defaultValue={currentStatus} className='w-full'>
            <TabsList>
              {recruitmentSteps.map((step) => (
                <TabsTrigger key={step} value={step}>
                  {step}
                </TabsTrigger>
              ))}
            </TabsList>
            {recruitmentSteps.map((step) => (
              <TabsContent key={step} value={step}>
                <Textarea
                  placeholder={`Catatan untuk tahap ${step}`}
                  value={notes[step] || ""}
                  onChange={(e) => handleNoteChange(step, e.target.value)}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
