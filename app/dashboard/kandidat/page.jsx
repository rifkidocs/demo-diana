"use client";
import { useState } from "react";
import { KandidatList } from "../../../components/kandidat-list";
import { KandidatManagement } from "../../../components/kandidat-management";
import { KandidatDetail } from "../../../components/kandidat-detail";
import { StatusNotification } from "../../../components/status-notification";

export default function KandidatPage() {
  const [selectedKandidat, setSelectedKandidat] = useState(null);
  const [kandidats, setKandidats] = useState([]);

  const handleSelectKandidat = (kandidat) => {
    setSelectedKandidat(kandidat);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setKandidats((prevKandidats) =>
      prevKandidats.map((k) => (k.id === id ? { ...k, status: newStatus } : k))
    );
    setSelectedKandidat((prev) =>
      prev && prev.id === id ? { ...prev, status: newStatus } : prev
    );
  };

  const handleUpdateNotes = (id, notes) => {
    setKandidats((prevKandidats) =>
      prevKandidats.map((k) => (k.id === id ? { ...k, notes } : k))
    );
    setSelectedKandidat((prev) =>
      prev && prev.id === id ? { ...prev, notes } : prev
    );
  };

  return (
    <div className='container mx-auto overflow-hidden'>
      <h1 className='text-2xl font-bold mb-6'>Manajemen Kandidat</h1>
      <div className='mb-6'>
        <StatusNotification
          title='Pembaruan Status'
          description='John Doe telah memasuki tahap Wawancara. Silakan tinjau dan persiapkan jadwal wawancara.'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <div className='lg:col-span-2'>
          <KandidatList
            onSelectKandidat={handleSelectKandidat}
            kandidats={kandidats}
            setKandidats={setKandidats}
          />
        </div>
        <div className='lg:col-span-2'>
          {selectedKandidat ? (
            <KandidatDetail
              kandidat={selectedKandidat}
              onUpdateStatus={handleUpdateStatus}
              onUpdateNotes={handleUpdateNotes}
            />
          ) : (
            <KandidatManagement />
          )}
        </div>
      </div>
    </div>
  );
}
