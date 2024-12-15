"use client";
import { useState } from "react"
import { KandidatList } from "./components/kandidat-list"
import { StatusNotification } from "./components/status-notification"

const dummyKandidats = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  nik: `32${(i + 1).toString().padStart(14, '0')}`,
  nama: `Kandidat ${i + 1}`,
  kotaLahir: ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"][Math.floor(Math.random() * 5)],
  tanggalLahir: `199${Math.floor(Math.random() * 9) + 1}-${(Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0')}-${(Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0')}`,
  gender: Math.random() > 0.5 ? "Laki-laki" : "Perempuan",
  alamatKtp: `Jl. Contoh No. ${i + 1}, ${["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"][Math.floor(Math.random() * 5)]}`,
  alamatDomisili: `Jl. Domisili No. ${i + 1}, ${["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"][Math.floor(Math.random() * 5)]}`,
  pendidikan: ["S1 Teknik Informatika", "S1 Sistem Informasi", "D3 Manajemen Informatika", "S2 Ilmu Komputer"][Math.floor(Math.random() * 4)],
  skillKeahlian: `${["JavaScript", "Python", "Java", "C++", "PHP"][Math.floor(Math.random() * 5)]}, ${["React", "Angular", "Vue", "Node.js", "Django"][Math.floor(Math.random() * 5)]}`,
  lamaPengalaman: `${Math.floor(Math.random() * 10) + 1} tahun`,
  foto: `/foto-kandidat-${i + 1}.jpg`,
  cv: `/cv-kandidat-${i + 1}.pdf`,
  ktp: `/ktp-kandidat-${i + 1}.pdf`,
  kartuKeluarga: `/kk-kandidat-${i + 1}.pdf`,
  skck: `/skck-kandidat-${i + 1}.pdf`,
  referensiKerja: `/referensi-kandidat-${i + 1}.pdf`,
  status: ["Aplikasi", "Screening", "Wawancara", "Tes Teknis", "Penawaran", "Diterima"][Math.floor(Math.random() * 6)],
  notes: {}
}))

export default function KandidatPage() {
  const [kandidats, setKandidats] = useState(dummyKandidats)

  return (
    (<div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manajemen Kandidat</h1>
      <div className="mb-6">
        <StatusNotification
          title="Pembaruan Status"
          description="John Doe telah memasuki tahap Wawancara. Silakan tinjau dan persiapkan jadwal wawancara." />
      </div>
      <KandidatList kandidats={kandidats} setKandidats={setKandidats} />
    </div>)
  );
}

