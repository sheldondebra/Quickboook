import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import NoteForm from "../components/NoteForm";
import { CircleAlert, StickyNote } from "lucide-react";
import NoteCard from "../components/NoteCard";

const Dashboard = () => {
  const [notes, setNotes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);

    const notesQuery = query(
      collection(db, "notes"),
      where("userId", "==", currentUser.uid), 
    );

    const unsubscribe = onSnapshot(
      notesQuery,
      (snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // sort newest first
        notesData.sort((a, b) => {
          const timeA = a.createdAt?.toMillis() || 0;
          const timeB = b.createdAt?.toMillis() || 0;
          return timeB - timeA;
        });

        setNotes(notesData);
        setLoading(false);
      },
      (err) => {
        console.log("Error fetching notes", err);
        setError("Failed to load notes");
        setLoading(false);
      },
    );

    return () => unsubscribe(); 
  }, [currentUser]);

  // if (loading) return <p>Loading notes...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Notes</h1>
          <p>Create and manage your personal notes</p>
        </div>
        <NoteForm />
        {error && (
          <div className="flex items-center gap-2 bg-red-300 p-4 rounded-md mb-6 text-red-700">
            <CircleAlert className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-indigo-600">Loading Notes...</div>
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <StickyNote className=" h-12 w-12 text-gray-400 mx-auto mb-3"/>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
            <p className=" text-gray-600 mb-4">Create your first note to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
