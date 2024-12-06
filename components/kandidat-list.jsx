"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dummyKandidats = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Kandidat ${i + 1}`,
  role: [
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "Project Manager",
    "Data Scientist",
  ][Math.floor(Math.random() * 5)],
  status: [
    "Aplikasi",
    "Screening",
    "Wawancara",
    "Tes Teknis",
    "Penawaran",
    "Diterima",
  ][Math.floor(Math.random() * 6)],
  email: `kandidat${i + 1}@example.com`,
  phone: `08123456${(i + 1).toString().padStart(4, "0")}`,
  experience: `Pengalaman kerja ${i + 1} tahun di bidang ${
    [
      "web development",
      "mobile app development",
      "data analysis",
      "project management",
    ][Math.floor(Math.random() * 4)]
  }`,
  education: `S1 ${
    [
      "Teknik Informatika",
      "Sistem Informasi",
      "Ilmu Komputer",
      "Manajemen Informatika",
    ][Math.floor(Math.random() * 4)]
  }`,
  skills: `${
    [
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "SQL",
      "UI/UX Design",
      "Agile",
    ][Math.floor(Math.random() * 7)]
  }, ${
    ["TypeScript", "Java", "Vue.js", "Express", "MongoDB", "Figma", "Scrum"][
      Math.floor(Math.random() * 7)
    ]
  }`,
  coverLetterPdf: `/surat-lamaran-${i + 1}.pdf`,
  cv: `/curriculum-vitae-${i + 1}.pdf`,
  notes: {},
}));

export function KandidatList({ onSelectKandidat, kandidats, setKandidats }) {
  const [selectedKandidat, setSelectedKandidat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (kandidats.length === 0) {
    setKandidats(dummyKandidats);
  }

  const filteredKandidats = kandidats.filter(
    (kandidat) =>
      kandidat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kandidat.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kandidat.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectKandidat = (kandidat) => {
    setSelectedKandidat(kandidat);
    onSelectKandidat(kandidat);
  };

  return (
    <Card className='h-[calc(100vh-200px)] flex flex-col'>
      <CardHeader>
        <CardTitle>Daftar Kandidat</CardTitle>
        <Input
          placeholder='Cari kandidat...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='mt-2'
        />
      </CardHeader>
      <CardContent className='flex-grow overflow-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Posisi</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredKandidats.map((kandidat) => (
              <TableRow
                key={kandidat.id}
                className={`cursor-pointer ${
                  selectedKandidat?.id === kandidat.id ? "bg-secondary" : ""
                }`}
                onClick={() => handleSelectKandidat(kandidat)}>
                <TableCell className='flex items-center space-x-2'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${kandidat.name}`}
                    />
                    <AvatarFallback>
                      {kandidat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{kandidat.name}</span>
                </TableCell>
                <TableCell>{kandidat.role}</TableCell>
                <TableCell>{kandidat.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
