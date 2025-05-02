
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { MdClose } from 'react-icons/md'
const apiKey = import.meta.env.VITE_API_BASE_URL;

const AddModal = ({ onClose, type, noteData, refresh }) => {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    const url =
      type === 'edit'
        ? `${apiKey}/Notes/update/${noteData._id}`
        : `${apiKey}/Notes/add`

    const method = type === 'edit' ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      refresh()
      onClose()
      toast.success(
        type === 'edit' ? 'Note updated successfully!' : 'Note added successfully!'
      )
    } else {
      alert('Something went wrong!')
    }
  }

  useEffect(() => {
    if (type === 'edit' && noteData) {
      reset(noteData)
    }
  }, [noteData, type, reset])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-auto relative"
    >
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-200"
        onClick={onClose}
      >
        <MdClose size={24} />
      </button>

      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        {type === 'edit' ? 'Edit Note' : 'Add New Note'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700">Name</label>
          <input
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            {...register('name', { required: true })}
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Course</label>
          <input
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your course"
            {...register('course', { required: true })}
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Grade</label>
          <input
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your grade"
            {...register('grade', { required: true })}
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Contact</label>
          <input
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter your contact"
            {...register('contact', { required: true })}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition duration-300"
          type="submit"
        >
          {type === 'edit' ? 'Update Note' : 'Add Note'}
        </motion.button>
      </form>
    </motion.div>
  )
}

export default AddModal

