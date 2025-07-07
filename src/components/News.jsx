import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import { toast } from 'react-toastify'

const News = () => {
	const [news, setNews] = useState([])
	const [title, setTitle] = useState("")
	const [desc, setDesc] = useState("")
	const [open, setOpen] = useState(false)
	const [editId, setEditId] = useState(null)

	const getAllNews = async () => {
		try {
			const { data } = await axios.get(API_URL + "/news/get-all")
			console.log(data);
			
			if (data.success) {
				setNews(data.data)
			}
		} catch (error) {
			console.log("Types errors: " + error.message || error.msg)
		}
	}

	const addOrUpdateNews = async () => {
		try {
			if (editId) {
				// Update
				const { data } = await axios.put(API_URL + `/news/update/${editId}`, { title, desc })
				if (data.success) {
					toast.success("News updated!")
					resetForm()
					getAllNews()
				}
			} else {
				// Add
				const { data } = await axios.post(API_URL + "/news/add", { title, desc })
				console.log(data);
				
				if (data.success) {
					toast.success("News created!")
					resetForm()
					getAllNews()
				}
			}
		} catch (error) {
			console.log("Errors: " + error.message || error.msg)
		}
	}

	const deleteNews = async (id) => {
		try {
			const { data } = await axios.delete(API_URL + `/news/delete/${id}`)
			if (data.success) {
				toast.success("News deleted!")
				getAllNews()
			}
		} catch (error) {
			console.log("Delete error: " + error.message || error.msg)
		}
	}

	const resetForm = () => {
		setTitle("")
		setDesc("")
		setEditId(null)
		setOpen(false)
	}

	const handleEdit = (item) => {
		setTitle(item.title)
		setDesc(item.desc)
		setEditId(item._id)
		setOpen(true)
	}

	useEffect(() => {
		getAllNews()
	}, [])

	return (
		<div className='p-8 bg-gray-50 min-h-screen'>
			<h1 className='text-3xl font-bold mb-6 text-center'>News Components</h1>
			<div className='flex justify-center mb-8'>
				<button
					onClick={() => setOpen(true)}
					className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'>
					Add News
				</button>
			</div>

			{open && (
				<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
					<div className='bg-white p-6 rounded shadow-md w-full max-w-md'>
						<h2 className='text-xl font-semibold mb-4'>{editId ? "Edit News" : "Add News"}</h2>
						<input
							type="text"
							placeholder='Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='w-full mb-3 px-3 py-2 border rounded'
						/>
						<textarea
							placeholder='Description'
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							className='w-full mb-3 px-3 py-2 border rounded'
							rows={4}
						></textarea>
						<div className='flex justify-between'>
							<button
								onClick={addOrUpdateNews}
								className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'>
								{editId ? "Update" : "Submit"}
							</button>
							<button
								onClick={resetForm}
								className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition'>
								Close
							</button>
						</div>
					</div>
				</div>
			)}

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{news.map((item) => (
					<div
						key={item._id}
						className='bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition flex flex-col justify-between'
					>
						<div className='p-4'>
							<h1 className='text-lg font-bold mb-2'>{item.title}</h1>
							<p className='text-gray-700'>{item.desc}</p>
						</div>
						<div className='flex justify-between p-4 border-t'>
							<button
								onClick={() => handleEdit(item)}
								className='px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm'>
								Edit
							</button>
							<button
								onClick={() => deleteNews(item._id)}
								className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm'>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default News
