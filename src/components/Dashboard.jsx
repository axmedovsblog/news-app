import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { API_URL } from '../config'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
	const [user, setUser] = useState(null)
	const navigate = useNavigate()

	const fetchUserData = async (token) => {
		try {
			const { data } = await axios.get(API_URL + "/user/me", {
				headers: { Authorization: `Bearer ${token}` },
			})
			setUser(data.data)
		} catch (error) {
			toast.error(error.response?.data?.message || error.response?.data?.msg)
			if (error.response.status == 401) {
				localStorage.removeItem("token")
				navigate("/login")
			}
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token")
		fetchUserData(token)
	}, [])

	return (
		<div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
			<h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Dashboard</h2>

			<p className="mb-2 text-gray-700">
				<span className="font-semibold">Welcome:</span> {user ? user.name : "Guest"}
			</p>
			<p className="mb-2 text-gray-700">
				<span className="font-semibold">Your email:</span> {user ? user.email : "N/A"}
			</p>
			<p className="mb-2 text-gray-700">
				<span className="font-semibold">Your role:</span> {user ? user.role : "N/A"}
			</p>
			<p className="mb-2 text-gray-700">
				<span className="font-semibold">Account created:</span> {user ? new Date(user.createdAt).toLocaleString() : "N/A"}
			</p>
			<p className="mb-4 text-gray-700">
				<span className="font-semibold">Account updated:</span> {user ? new Date(user.updatedAt).toLocaleString() : "N/A"}
			</p>

			<p className="mb-2">
				<Link to="/news" className="text-blue-600 hover:underline font-medium">
					View News
				</Link>
			</p>

			{user && user.role === 'admin' ? (
				<p className="mb-4">
					<Link to="/users" className="text-blue-600 hover:underline font-medium">
						View Users
					</Link>
				</p>
			) : null}

			<button
				onClick={() => {
					localStorage.removeItem("token")
					navigate("/login")
				}}
				className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
			>
				Logout
			</button>
		</div>
	)
}

export default Dashboard
