import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseconfig';
import { PenLine } from 'lucide-react';

const NoteForm = () => {


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState('');
  const [error , setError] = useState('');
  const [success, setSucess] = useState(false);

  const {currentUser} = useAuth();


  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError('');
      setSucess(false)

      if(!title.trim()){
        setError('This is required');
        return;
      }

      try{
        setLoading(true)

        await addDoc(collection(db, 'notes'),{
          title:title.trim(),
          content:content.trim(),
          userId: currentUser.uid,
          createdAt: serverTimestamp()
        })

        setTitle('')
        setContent('')
          setSucess(true)
        
          setTimeout(()=>setSucess(false),3000)


      } catch(err){
        setError('Failed to create Note: ' + err.message)
      }finally{
        setLoading(false)
      }

      
  
  }



  return (
    <div className="bg-white  rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <PenLine className="h-5 w-5 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Add a new note</h2>
      </div>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
          {" "}
          {error}{" "}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-700 p-2 rounded-md mb-4 text-sm">
          Note created Successfully
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 ">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            maxLength={100}
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 rounded-lg"
            placeholder="Write your note here"
            rows={4}
          />
        </div>
        <button type="submit" disabled={loading} className='w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed'>
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
}

export default NoteForm
