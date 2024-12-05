"use client";
import { useState } from "react";
import Image from "next/image"
import { Plus, Edit, Trash2, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function PsikotestManagement() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "Apa ibu kota Indonesia?",
      answers: ["Jakarta", "Surabaya", "Bandung", "Yogyakarta"],
      correctAnswer: 0,
    },
    {
      id: 2,
      text: "Berapa hasil dari 7 x 8?",
      answers: ["54", "56", "58", "60"],
      correctAnswer: 1,
    },
  ])

  const [editingQuestion, setEditingQuestion] = useState(null)

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: "",
      answers: ["", "", "", ""],
      correctAnswer: 0,
    }
    setEditingQuestion(newQuestion)
  }

  const handleEditQuestion = (question) => {
    setEditingQuestion({ ...question })
  }

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const handleSaveQuestion = (question) => {
    if (question.id > questions.length) {
      setQuestions([...questions, question])
    } else {
      setQuestions(questions.map((q) => (q.id === question.id ? question : q)))
    }
    setEditingQuestion(null)
  }

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0] && editingQuestion) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditingQuestion({
          ...editingQuestion,
          image: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    (<div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manajemen Psikotest Online</h1>
      <Button onClick={handleAddQuestion} className="mb-4">
        <Plus className="mr-2 h-4 w-4" /> Tambah Pertanyaan
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Pertanyaan</TableHead>
            <TableHead>Gambar</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question, index) => (
            <TableRow key={question.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{question.text}</TableCell>
              <TableCell>
                {question.image && (
                  <Image
                    src={question.image}
                    alt={`Gambar untuk pertanyaan ${index + 1}`}
                    width={50}
                    height={50}
                    className="object-cover" />
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditQuestion(question)}
                  className="mr-2">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteQuestion(question.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={editingQuestion !== null}
        onOpenChange={() => setEditingQuestion(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingQuestion && editingQuestion.id > questions.length
                ? "Tambah Pertanyaan"
                : "Edit Pertanyaan"}
            </DialogTitle>
          </DialogHeader>
          {editingQuestion && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="question">Pertanyaan:</label>
                <Textarea
                  id="question"
                  value={editingQuestion.text}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      text: e.target.value,
                    })
                  } />
              </div>
              <div className="grid gap-2">
                <label htmlFor="image">Gambar:</label>
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden" />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('image')?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Unggah Gambar
                  </Button>
                  {editingQuestion.image && (
                    <Image
                      src={editingQuestion.image}
                      alt="Preview"
                      width={50}
                      height={50}
                      className="object-cover" />
                  )}
                </div>
              </div>
              {editingQuestion.answers.map((answer, index) => (
                <div key={index} className="grid gap-2">
                  <label htmlFor={`answer-${index}`}>Jawaban {index + 1}:</label>
                  <Input
                    id={`answer-${index}`}
                    value={answer}
                    onChange={(e) => {
                      const newAnswers = [...editingQuestion.answers]
                      newAnswers[index] = e.target.value
                      setEditingQuestion({
                        ...editingQuestion,
                        answers: newAnswers,
                      })
                    }} />
                </div>
              ))}
              <div className="grid gap-2">
                <label htmlFor="correctAnswer">Jawaban Benar:</label>
                <select
                  id="correctAnswer"
                  value={editingQuestion.correctAnswer}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      correctAnswer: parseInt(e.target.value),
                    })
                  }
                  className="border rounded p-2">
                  {editingQuestion.answers.map((_, index) => (
                    <option key={index} value={index}>
                      Jawaban {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={() => handleSaveQuestion(editingQuestion)}>
                Simpan
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>)
  );
}

