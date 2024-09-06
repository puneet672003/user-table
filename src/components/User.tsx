import { Link } from "react-router-dom";
import { User as UserType } from "../types";
import { useUserContext } from "../hooks/useUserContext";
import { useState } from "react";

interface UserProps {
	user: UserType;
	index: number;
}

function User({ user, index }: UserProps) {
	const { deleteUser } = useUserContext();
	const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

	const handleDelete = async () => {
		setLoadingDelete(true);

		try {
			await deleteUser(user.id);
		} catch {
			console.log("can't delete user.");
		} finally {
			setLoadingDelete(false);
		}
	};

	return (
		<tr
			className={`${
				index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
			} md:table-row flex flex-col md:flex-row border-b border-gray-600 md:border-none`}
		>
			{/* Mobile Card Layout */}
			<div className="p-4 md:hidden flex flex-col md:flex-row md:items-center md:space-x-4 w-full border-b border-gray-600 md:border-none relative">
				<div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full items-center">
					<img
						src={`https://api.multiavatar.com/${user.username}.png`}
						alt={`user-${user.username}-png`}
						className="w-16 h-16 rounded-full mb-2 md:mb-0"
					/>
					<div className="flex flex-col items-center md:items-start w-full text-center md:text-left">
						<span className="text-cerise-red-500 text-xl font-semibold">
							{user.name}
						</span>
						<span className="text-gray-300 mt-1">{user.email}</span>
						<span className="text-gray-300 mt-1">{user.phone}</span>
					</div>

					<div className="absolute top-0 right-0 flex flex-row">
						<Link
							to={`/edit/${user.id}`}
							className="text-blue-400 hover:underline m-1"
						>
							Edit
						</Link>
						{loadingDelete ? (
							<div className="flex justify-between m-1">
								<div className="w-6 h-6 border-t-4 border-cerise-red-500 border-solid rounded-full animate-spin"></div>
							</div>
						) : (
							<button
								onClick={handleDelete}
								className="text-red-500 hover:text-red-400 m-1"
							>
								Delete
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Table Columns */}
			<td className="p-4 text-gray-300 hidden md:table-cell">
				<div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full items-center">
					<img
						src={`https://api.multiavatar.com/${user.username}.png`}
						alt={`user-${user.username}-png`}
						className="w-16 h-16 rounded-full mb-2 md:mb-0"
					/>
					<span className="text-white text-xl font-semibold">{user.name}</span>
				</div>
			</td>
			<td className="p-4 text-gray-300 hidden md:table-cell">{user.email}</td>
			<td className="p-4  text-gray-300 hidden md:table-cell">{user.phone}</td>
			<td className="p-4  text-gray-300 hidden md:table-cell">
				<div className="flex">
					<Link
						to={`/edit/${user.id}`}
						className="text-blue-400 hover:underline m-2"
					>
						Edit
					</Link>

					{loadingDelete ? (
						<div className="flex justify-between m-2">
							<div className="w-6 h-6 border-t-4 border-cerise-red-500 border-solid rounded-full animate-spin"></div>
						</div>
					) : (
						<button
							onClick={handleDelete}
							className="text-red-500 hover:text-red-400 m-2"
						>
							Delete
						</button>
					)}
				</div>
			</td>
		</tr>
	);
}

export default User;
