"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false)
	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try { 
			setLoading(true);
			const res = await axios.post("/api/login", { email, password }, {withCredentials: true, headers: { "Content-Type": "application/json" },});
			const data = res.data
			console.log(data);
			if(data.message === "Login successful") {
				console.log(`Redirecting to: /${data.slug}/hr/forms`); // Debugging log
				toast.success(data.message);
				router.replace(`/${data.slug}/hr/forms`)
				return;
			}
			toast(data.message);
			// router.push()
		} catch (error:any) {
			console.log(error);
			toast.error(error.response?.data?.message || "An error occurred during login");
		} finally {

			setEmail("");
			setPassword("");
			setLoading(false);
		}

		// Handle login logic here

	}

	return (
		<main className="flex items-center justify-center h-screen bg-neutral-50">
			<div className="h-screen fixed left-0 top-0 w-[2%] hidden lg:block">
				<div className="bg-[#FF967C] w-full h-[70vh] flex items-end"></div>
				<div className="bg-[#5D8DE3] w-full h-[20vh] flex items-end"></div>
				<div className="bg-[#091037] w-full h-[10vh]"></div>
      </div>
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
				<h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
				<form className="space-y-4" onSubmit={handleSubmit} method="POST">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email address
						</label>
						<input
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							id="email"
							name="email"
							type="email"
							required
							className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							id="password"
							name="password"
							type="password"
							required
							className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<button
						type="submit"
						className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
				<p className="text-sm text-center text-gray-600">
					Don&apos;t have an account?{" "}
					<Link href="/get-started" className="text-blue-500 hover:underline">
						Sign up
					</Link>
				</p>
			</div>
			<Toaster/>
		</main>
	);
}

export default Login;
