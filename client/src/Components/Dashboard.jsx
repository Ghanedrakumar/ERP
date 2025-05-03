
import React, { useState, useEffect } from 'react'
import { MdAdd } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { FaTrash } from 'react-icons/fa'
import Modal from 'react-modal'
import AddModal from './AddModal.jsx'
import { toast } from 'react-toastify'

const apiKey = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [openAddModal, setOpenAddModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })

  const [allNotes, setAllNotes] = useState([])

  const getAllNotes = async () => {
    try {
      const response = await fetch(`${apiKey}/Notes/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result = await response.json()
      if (response.ok) {
        setAllNotes(result.notes)
      } else {
        alert("Failed to fetch notes")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to fetch notes")
    }
  }

  const deleteNote = async (note) => {
    try {
      const response = await fetch(`${apiKey}/Notes/delete/${note._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        toast.success("Note deleted successfully")
        getAllNotes()
      } else {
        alert("Failed to delete note")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to delete note")
    }
  }

  const handleEdit = (note) => {
    setOpenAddModal({
      isShown: true,
      type: "edit",
      data: note,
    });
  }


  

  useEffect(() => {
    getAllNotes()
  }, [])

  return (
    <div className=' '>
<span className='flex justify-center items-center font-bold shadow-amber-50  text-3xl mb-15 mt-15'>Student Dashboard</span>

<div className='font-bold  text-2xl p-5 underline '>
  Total Count: {allNotes.length}
</div>

      {allNotes.length > 0 ? (
        <div className="overflow-x-auto p-5">
          <table className="table-auto w-full border border-black shadow-lg bg-white rounded-lg">
            <thead className="bg-green-300">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Grade</th>
                <th className="border px-4 py-2 text-left">Course</th>
                <th className="border px-4 py-2 text-left">Contact</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allNotes.map((note, ) => (
                <tr key={note._id}>
                  <td className="border px-4 py-2">{note.name}</td>
                  <td className="border px-4 py-2">{note.grade}</td>
                  <td className="border px-4 py-2">{note.course}</td>
                  <td className="border px-4 py-2">{note.contact}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-15 ml-10">
                      <button
                        className="w-10 h-10 rounded-full flex justify-center items-center text-white bg-blue-500 hover:bg-blue-700"
                        onClick={() => handleEdit(note)}
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full flex justify-center items-center text-white bg-red-500 hover:bg-red-700"
                        onClick={() => deleteNote(note)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center mt-10'>
          <h1 className='text-2xl font-bold'>No Notes Found</h1>
          <p className='text-lg'>Click the button below to add a new note</p>
        </div>
      )}

      <div className='fixed bottom-5 right-5'>
        <button
          onClick={() => setOpenAddModal({ isShown: true, type: "add", data: null })}
          className='h-20 w-20 rounded-full text-white bg-blue-500 hover:bg-blue-700 text-2xl p-2 flex justify-center items-center'
        >
          <MdAdd />
        </button>
      </div>

      <Modal
        isOpen={openAddModal.isShown}
        onRequestClose={() => setOpenAddModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add Modal"
        className="w-[40%] max-md:w-[90%] max-h-3/4 rounded-md mx-auto mt-20 p-5 shadow-lg"
      >
        <AddModal
          onClose={() => setOpenAddModal({ isShown: false, type: "add", data: null })}
          noteData={openAddModal.data}
          type={openAddModal.type}
          refresh={getAllNotes}
        />
      </Modal>
    </div>
  )
}

export default Dashboard
