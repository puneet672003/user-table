import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

function CreateUserForm() {
	const { createUser } = useUserContext();
	const navigate = useNavigate();

	const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
	const [empty, setEmpty] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [data, setData] = useState({
		username: "",
		name: "",
		email: "",
		phone: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const submitForm = async (e: FormEvent) => {
		e.preventDefault();

		if (loadingCreate) return;
		setLoadingCreate(true);

		if (
			data.username === "" ||
			data.name === "" ||
			data.email === "" ||
			data.phone === ""
		) {
			setEmpty(true);
			setLoadingCreate(false);
		} else {
			try {
				await createUser(data);
				// Navigate to the home page on success
				navigate("/");
			} catch {
				console.log("Cannot create user.");
				setError(error);
			} finally {
				setLoadingCreate(false);
			}
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-900">
			<div className="w-full max-w-md p-6 bg-gray-800 shadow-md rounded-lg">
				<h1 className="text-2xl font-semibold text-center text-cerise-red-500 mb-4">
					Create User
				</h1>
				<form onSubmit={submitForm} className="flex flex-col gap-4">
					{/* Error message */}
					{empty && (
						<p className="text-red-500 mb-2 text-center">
							Please fill all fields
						</p>
					)}
					{error && (
						<p className="text-red-500 mb-2 text-center">
							Cannot edit user! <br />
							Please try again later.
						</p>
					)}

					{/* Form Fields */}
					<input
						type="text"
						name="username"
						onChange={handleChange}
						value={data.username}
						className={`p-2 border rounded-lg w-full bg-gray-900 text-white placeholder-gray-400 ${
							empty && !data.username ? "border-red-500" : "border-gray-600"
						}`}
						placeholder="Username"
					/>
					<input
						type="text"
						name="name"
						onChange={handleChange}
						value={data.name}
						className={`p-2 border rounded-lg w-full bg-gray-900 text-white placeholder-gray-400 ${
							empty && !data.name ? "border-red-500" : "border-gray-600"
						}`}
						placeholder="Name"
					/>
					<input
						type="text"
						name="email"
						onChange={handleChange}
						value={data.email}
						className={`p-2 border rounded-lg w-full bg-gray-900 text-white placeholder-gray-400 ${
							empty && !data.email ? "border-red-500" : "border-gray-600"
						}`}
						placeholder="Email"
					/>
					<input
						type="text"
						name="phone"
						onChange={handleChange}
						value={data.phone}
						className={`p-2 border rounded-lg w-full bg-gray-900 text-white placeholder-gray-400 ${
							empty && !data.phone ? "border-red-500" : "border-gray-600"
						}`}
						placeholder="Phone"
					/>

					{/* Submit Button */}
					<button
						type="submit"
						className="p-2 mt-4 bg-cerise-red-600 text-white rounded-lg hover:bg-cerise-red-500 transition"
					>
						{loadingCreate ? "Creating..." : "Create"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateUserForm;
