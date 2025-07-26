import axios from 'axios'
import React, { useState } from 'react'
import { API_URL } from '../config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const login = async (e) => {
		e.preventDefault()
		try {
			const { data } = await axios.post(API_URL + "/user/login", {
				email,
				password
			})
			if (data.succsess) {
				localStorage.setItem("token", data.token)
				navigate("/")
			}
		} catch (error) {
			toast.error(error.response?.data?.message || error.response?.data?.msg || "Login error")
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
				<form onSubmit={login} className="space-y-4">
					<div>
						<label className="block text-gray-700 mb-1">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="you@example.com"
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700 mb-1">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="********"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login
