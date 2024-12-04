'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddEmployeeButton() {
  const [open, setOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    setOpen(false)
  }

  return (
    (<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Input Karyawan Baru</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Karyawan Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nama</Label>
            <Input id="name" required />
          </div>
          <div>
            <Label htmlFor="position">Jabatan</Label>
            <Input id="position" required />
          </div>
          <div>
            <Label htmlFor="contractPeriod">Periode Kontrak</Label>
            <Input id="contractPeriod" placeholder="YYYY-MM-DD - YYYY-MM-DD" required />
          </div>
          <Button type="submit">Simpan</Button>
        </form>
      </DialogContent>
    </Dialog>)
  );
}

