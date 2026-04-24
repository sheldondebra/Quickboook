import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebaseconfig'
import { Trash } from 'lucide-react';


const NoteCard = ({ note }) => {

  const [deleting , setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const formDate = (timeSamp) => {
    if(!timeSamp) return 'Just Now'

    const date = timeSamp.toDate();
    return new Intl.DateTimeFormat('en-US',{
      month:'short',
      day: 'numeric',
      year: 'numeric',
      hour:'numeric',
      minute:'numeric'
    }).format(date)
  }

  const handleDelete = async () => {
    if(!confirmDelete){
      setConfirmDelete(true);
      setTimeout(()=>setConfirmDelete(false), 3000)
      return;
    }

    try{
      setDeleting(true);
      await deleteDoc(doc(db, 'notes', note.id))
    }catch(err){
      console.log('Error Deleting Note: ' + err)
      setDeleting(false)
      setConfirmDelete(false)
    }
  }





  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className='p-4'>
        <div className="flex justify-between  items-start mb-2">
          <h3 className='text-lg font-medium text-gray-900 line-clamp-1'>{note.title}</h3>
          <button onClick={handleDelete} disabled={deleting} className={`text-sm flex items-center justify-center p-1 rounded-full transition-colors ${confirmDelete ? 'bg-red-400 text-red-600' : 'text-gray-400  hover:text-red-500 hover:bg-red-50'}` }>
            <Trash className="w-4 h-4" />
          </button>
        </div>
        <div>
          {note.content || <span> No Content </span>}
        </div>
        <div>{formDate(note.createdAt)}</div>
      </div>
    </div>
  );
}

export default NoteCard
