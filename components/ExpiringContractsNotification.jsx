'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export default function ExpiringContractsNotification() {
  const [expiringContracts, setExpiringContracts] = useState(0)

  useEffect(() => {
    // Simulasi pengecekan kontrak yang akan habis
    // Dalam implementasi nyata, Anda akan mengambil data ini dari backend
    setExpiringContracts(2)
  }, [])

  if (expiringContracts === 0) return null

  return (
    (<Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Peringatan</AlertTitle>
      <AlertDescription>
        Terdapat {expiringContracts} kontrak karyawan yang akan habis dalam 30 hari ke depan.
      </AlertDescription>
    </Alert>)
  );
}

