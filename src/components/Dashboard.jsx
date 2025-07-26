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
		<div>
			<h2>Dashboard</h2>
			<p>Welcome , {user ? user.name : "Guest"}</p>
			<p>Your emil , {user ? user.email : "N/A"}</p>
			<p>Your role , {user ? user.role : "N/A"}</p>
			<p>
				Accaunt created:{""}
				{user ? new Date(user.createdAt).toLocaleString() : "N/A"}
			</p>
			<p>
				Accaunt updated:{""}
				{user ? new Date(user.updatedAt).toLocaleString() : "N/A"}
			</p>
       <p>
				<Link to="/news">view news</Link>
			 </p>

      <button onClick={() => {
				 localStorage.removeItem("token")
				 navigate("/login")
			}}>  
				Logout
			</button>
		</div>
	)
}

export default Dashboard