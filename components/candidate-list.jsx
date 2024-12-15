"use client";
import { useState } from "react";
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
import { KandidatDetailDialog } from "./candidate-detail-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dummyKandidats = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  nik: `32${(i + 1).toString().padStart(14, "0")}`,
  nama: `Kandidat ${i + 1}`,
  kotaLahir: ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"][
    Math.floor(Math.random() * 5)
  ],
  tanggalLahir: `199${Math.floor(Math.random() * 9) + 1}-${(
    Math.floor(Math.random() * 12) + 1
  )
    .toString()
    .padStart(2, "0")}-${(Math.floor(Math.random() * 28) + 1)
    .toString()
    .padStart(2, "0")}`,
  gender: Math.random() > 0.5 ? "Laki-laki" : "Perempuan",
  alamatKtp: `Jl. Contoh No. ${i + 1}, ${
    ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"][
      Math.floor(Math.random() * 5)
    ]
  }`,
  alamatDomisili: `Jl. Domisili No. ${i + 1}, ${
    ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"][
      Math.floor(Math.random() * 5)
    ]
  }`,
  pendidikan: [
    "S1 Teknik Informatika",
    "S1 Sistem Informasi",
    "D3 Manajemen Informatika",
    "S2 Ilmu Komputer",
  ][Math.floor(Math.random() * 4)],
  skillKeahlian: `${
    ["JavaScript", "Python", "Java", "C++", "PHP"][
      Math.floor(Math.random() * 5)
    ]
  }, ${
    ["React", "Angular", "Vue", "Node.js", "Django"][
      Math.floor(Math.random() * 5)
    ]
  }`,
  lamaPengalaman: `${Math.floor(Math.random() * 10) + 1} tahun`,
  foto: `/foto-kandidat-${i + 1}.jpg`,
  cv: `/cv-kandidat-${i + 1}.pdf`,
  ktp: `/ktp-kandidat-${i + 1}.pdf`,
  kartuKeluarga: `/kk-kandidat-${i + 1}.pdf`,
  skck: `/skck-kandidat-${i + 1}.pdf`,
  referensiKerja: `/referensi-kandidat-${i + 1}.pdf`,
  status: [
    "Aplikasi",
    "Screening",
    "Wawancara",
    "Tes Teknis",
    "Penawaran",
    "Diterima",
  ][Math.floor(Math.random() * 6)],
  notes: {},
}));

export function KandidatList({ kandidats, setKandidats }) {
  const [selectedKandidat, setSelectedKandidat] = useState(null);
  const [filters, setFilters] = useState({
    nik: "",
    nama: "",
    skillKeahlian: "",
    gender: "all",
    ageRange: { min: "", max: "" },
    experience: { min: "", max: "" },
  });

  if (kandidats.length === 0) {
    // Initialize with dummy data if no candidates are present
    setKandidats(dummyKandidats);
  }

  const filteredKandidats = kandidats.filter((kandidat) => {
    const age =
      new Date().getFullYear() - new Date(kandidat.tanggalLahir).getFullYear();
    const experience = parseInt(kandidat.lamaPengalaman.split(" ")[0]);

    return (
      kandidat.nik.includes(filters.nik) &&
      kandidat.nama.toLowerCase().includes(filters.nama.toLowerCase()) &&
      kandidat.skillKeahlian
        .toLowerCase()
        .includes(filters.skillKeahlian.toLowerCase()) &&
      (filters.gender === "all" || kandidat.gender === filters.gender) &&
      (filters.ageRange.min === "" || age >= parseInt(filters.ageRange.min)) &&
      (filters.ageRange.max === "" || age <= parseInt(filters.ageRange.max)) &&
      (filters.experience.min === "" ||
        experience >= parseInt(filters.experience.min)) &&
      (filters.experience.max === "" ||
        experience <= parseInt(filters.experience.max))
    );
  });

  const handleSelectKandidat = (kandidat) => {
    setSelectedKandidat(kandidat);
  };

  const handleUpdateStatus = (id, newStatus, notes) => {
    setKandidats((prevKandidats) =>
      prevKandidats.map((k) =>
        k.id === id ? { ...k, status: newStatus, notes } : k
      )
    );
  };

  return (
    <Card className='h-[calc(100vh-200px)] flex flex-col'>
      <CardHeader>
        <CardTitle>Daftar Kandidat</CardTitle>
        <div className='grid md:grid-cols-3 gap-4 grid-cols-1'>
          <div>
            <Label htmlFor='nik'>NIK</Label>
            <Input
              id='nik'
              placeholder='Cari berdasarkan NIK'
              value={filters.nik}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, nik: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor='nama'>Nama</Label>
            <Input
              id='nama'
              placeholder='Cari berdasarkan nama'
              value={filters.nama}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, nama: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor='skillKeahlian'>Skill Keahlian</Label>
            <Input
              id='skillKeahlian'
              placeholder='Cari berdasarkan skill'
              value={filters.skillKeahlian}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  skillKeahlian: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label htmlFor='gender'>Gender</Label>
            <Select
              value={filters.gender}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, gender: value }))
              }>
              <SelectTrigger id='gender'>
                <SelectValue placeholder='Pilih gender' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Semua</SelectItem>
                <SelectItem value='Laki-laki'>Laki-laki</SelectItem>
                <SelectItem value='Perempuan'>Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Rentang Usia</Label>
            <div className='flex space-x-2'>
              <Input
                placeholder='Min'
                type='number'
                value={filters.ageRange.min}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    ageRange: { ...prev.ageRange, min: e.target.value },
                  }))
                }
              />
              <Input
                placeholder='Max'
                type='number'
                value={filters.ageRange.max}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    ageRange: { ...prev.ageRange, max: e.target.value },
                  }))
                }
              />
            </div>
          </div>
          <div>
            <Label>Pengalaman (tahun)</Label>
            <div className='flex space-x-2'>
              <Input
                placeholder='Min'
                type='number'
                value={filters.experience.min}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    experience: { ...prev.experience, min: e.target.value },
                  }))
                }
              />
              <Input
                placeholder='Max'
                type='number'
                value={filters.experience.max}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    experience: { ...prev.experience, max: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex-grow overflow-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIK</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Pendidikan</TableHead>
              <TableHead>Skill Keahlian</TableHead>
              <TableHead>Lama Pengalaman</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredKandidats.map((kandidat) => (
              <TableRow
                key={kandidat.id}
                className='cursor-pointer hover:bg-secondary'
                onClick={() => handleSelectKandidat(kandidat)}>
                <TableCell>{kandidat.nik}</TableCell>
                <TableCell>{kandidat.nama}</TableCell>
                <TableCell>{kandidat.pendidikan}</TableCell>
                <TableCell>{kandidat.skillKeahlian}</TableCell>
                <TableCell>{kandidat.lamaPengalaman}</TableCell>
                <TableCell>{kandidat.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {selectedKandidat && (
        <KandidatDetailDialog
          kandidat={selectedKandidat}
          onClose={() => setSelectedKandidat(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </Card>
  );
}
