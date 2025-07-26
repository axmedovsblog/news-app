import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../config'
import { toast } from 'react-toastify'

const Users = () => {
	const [users, setUsers] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { data } = await axios.get(API_URL + "/user/users", {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
				setUsers(data.data)
			} catch (error) {
				toast.error(error?.response?.data?.message || error?.response?.data?.msg || "Failed to fetch users.")
				navigate("/")
			}
		}
		fetchUsers()
	}, [navigate])

	return (
		<div className="max-w-4xl mx-auto py-10 px-4">
			<h2 className="text-3xl font-bold mb-6 text-center">Users List</h2>
			<ul className="space-y-4">
				{users.map((user) => (
					<li
						key={user._id}
						className="bg-white shadow-sm p-4 rounded-lg flex items-center justify-between border hover:shadow-md transition"
					>
						<div>
							<p className="text-lg font-semibold">{user.name}</p>
							<p className="text-sm text-gray-500">{user.email}</p>
						</div>
						<Link
							to={`/user/${user._id}`}
							className="text-blue-600 font-medium hover:underline"
						>
							View
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Users
