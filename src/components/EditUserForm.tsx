import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

function EditUserForm() {
	const { userId } = useParams();
	const { users, editUser } = useUserContext();
	const navigate = useNavigate();

	const userToEdit = users.find((user) => user.id.toString() === userId);

	const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
	const [empty, setEmpty] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [data, setData] = useState({
		username: userToEdit?.username || "",
		name: userToEdit?.name || "",
		email: userToEdit?.email || "",
		phone: userToEdit?.phone || "",
	});

	const submitEditing = async (e: FormEvent) => {
		e.preventDefault();

		if (loadingEdit) return;
		setLoadingEdit(true);

		if (userToEdit) {
			if (
				data.username === "" ||
				data.name === "" ||
				data.email === "" ||
				data.phone === ""
			) {
				setEmpty(true);
				setLoadingEdit(false);
			} else {
				try {
					await editUser({ ...userToEdit, ...data });
					navigate("/");
				} catch {
					// show popup that says cannot edit user and ask user to try again
					console.log("Cannot edit user.");
					setError(true);
				} finally {
					setLoadingEdit(false);
				}
			}
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		// If not a valid user id navigate to home page
		if (!userToEdit) {
			navigate("/");
		}
	}, [userToEdit, navigate]);

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-900">
			<div className="w-full max-w-md p-6 bg-gray-800 shadow-md rounded-lg">
				<h1 className="text-2xl font-semibold text-center text-cerise-red-500 mb-4">
					Edit User
				</h1>
				<form onSubmit={submitEditing} className="flex flex-col gap-4">
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
						{loadingEdit ? "Saving..." : "Save"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default EditUserForm;
