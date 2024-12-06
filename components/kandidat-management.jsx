"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Circle } from 'lucide-react'

const recruitmentSteps = [
  "Aplikasi",
  "Screening",
  "Wawancara",
  "Tes Teknis",
  "Penawaran",
  "Diterima"
]

export function KandidatManagement() {
  const [currentStep, setCurrentStep] = useState(2)
  const [notes, setNotes] = useState({})

  const handleNoteChange = (e) => {
    setNotes(prev => ({ ...prev, [currentStep]: e.target.value }))
  }

  return (
    (<Card className="h-[calc(100vh-200px)] flex flex-col">
      <CardHeader>
        <CardTitle>Progres Rekrutmen</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto space-y-6">
        <div className="flex justify-between">
          {recruitmentSteps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              {index < currentStep ? (
                <CheckCircle className="text-primary w-6 h-6" />
              ) : index === currentStep ? (
                <Circle className="text-primary w-6 h-6" />
              ) : (
                <Circle className="text-muted w-6 h-6" />
              )}
              <span className="text-xs mt-2 text-center">{step}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}>
            Tahap Sebelumnya
          </Button>
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(recruitmentSteps.length - 1, prev + 1))}
            disabled={currentStep === recruitmentSteps.length - 1}>
            Tahap Selanjutnya
          </Button>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Status Terkini:</h3>
          <Badge variant="secondary">{recruitmentSteps[currentStep]}</Badge>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Catatan HR:</h3>
          <Textarea
            placeholder="Tambahkan catatan untuk tahap ini..."
            value={notes[currentStep] || ""}
            onChange={handleNoteChange}
            className="h-32" />
        </div>
      </CardContent>
    </Card>)
  );
}

