"use client";
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const recruitmentSteps = [
  "Aplikasi",
  "Screening",
  "Wawancara",
  "Tes Teknis",
  "Penawaran",
  "Diterima"
]

export function KandidatDetailDialog({
  kandidat,
  onClose,
  onUpdateStatus
}) {
  const [currentStatus, setCurrentStatus] = useState(kandidat.status)
  const [notes, setNotes] = useState(kandidat.notes || {})
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("")

  const handleNoteChange = (stage, note) => {
    setNotes(prev => ({ ...prev, [stage]: note }))
  }

  const handleStatusChangeRequest = (status) => {
    setSelectedStatus(status)
    setIsConfirmOpen(true)
  }

  const handleConfirmStatusChange = () => {
    setCurrentStatus(selectedStatus)
    onUpdateStatus(kandidat.id, selectedStatus, notes)
    setIsConfirmOpen(false)
  }

  return (
    (<Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{kandidat.nama} - Detail Kandidat</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nik">NIK</Label>
            <Input id="nik" value={kandidat.nik} readOnly />
          </div>
          <div>
            <Label htmlFor="nama">Nama (Sesuai KTP)</Label>
            <Input id="nama" value={kandidat.nama} readOnly />
          </div>
          <div>
            <Label htmlFor="kotaLahir">Kota Lahir</Label>
            <Input id="kotaLahir" value={kandidat.kotaLahir} readOnly />
          </div>
          <div>
            <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
            <Input id="tanggalLahir" value={kandidat.tanggalLahir} readOnly />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" value={kandidat.gender} readOnly />
          </div>
          <div>
            <Label htmlFor="alamatKtp">Alamat (Sesuai KTP)</Label>
            <Input id="alamatKtp" value={kandidat.alamatKtp} readOnly />
          </div>
          <div>
            <Label htmlFor="alamatDomisili">Alamat (Domisili)</Label>
            <Input id="alamatDomisili" value={kandidat.alamatDomisili} readOnly />
          </div>
          <div>
            <Label htmlFor="pendidikan">Pendidikan</Label>
            <Input id="pendidikan" value={kandidat.pendidikan} readOnly />
          </div>
          <div>
            <Label htmlFor="skillKeahlian">Skill Keahlian</Label>
            <Input id="skillKeahlian" value={kandidat.skillKeahlian} readOnly />
          </div>
          <div>
            <Label htmlFor="lamaPengalaman">Lama Pengalaman Sesuai Skill</Label>
            <Input id="lamaPengalaman" value={kandidat.lamaPengalaman} readOnly />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label>Dokumen</Label>
          <div className="grid grid-cols-2 gap-4">
            <Button asChild>
              <a href={kandidat.foto} target="_blank" rel="noopener noreferrer">Lihat Foto</a>
            </Button>
            <Button asChild>
              <a href={kandidat.cv} target="_blank" rel="noopener noreferrer">Lihat CV</a>
            </Button>
            <Button asChild>
              <a href={kandidat.ktp} target="_blank" rel="noopener noreferrer">Lihat KTP</a>
            </Button>
            <Button asChild>
              <a href={kandidat.kartuKeluarga} target="_blank" rel="noopener noreferrer">Lihat Kartu Keluarga</a>
            </Button>
            <Button asChild>
              <a href={kandidat.skck} target="_blank" rel="noopener noreferrer">Lihat SKCK</a>
            </Button>
            <Button asChild>
              <a href={kandidat.referensiKerja} target="_blank" rel="noopener noreferrer">Lihat Referensi Kerja</a>
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Label>Status Rekrutmen: {currentStatus}</Label>
          <div className="flex space-x-2 mt-2">
            {recruitmentSteps.map((step) => (
              <Button
                key={step}
                variant={step === currentStatus ? "default" : "outline"}
                onClick={() => handleStatusChangeRequest(step)}
                disabled={step === currentStatus}>
                {step}
              </Button>
            ))}
          </div>
        </div>
        <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Perubahan Status</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin mengubah status kandidat dari "{currentStatus}" menjadi "{selectedStatus}"?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmStatusChange}>Konfirmasi</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>)
  );
}

