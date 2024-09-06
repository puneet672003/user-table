import { Link } from "react-router-dom";
import User from "./User";
import { useUserContext } from "../hooks/useUserContext";

function UserList() {
	const { users, error, loading } = useUserContext();

	if (loading)
		return (
			<div className="flex justify-center items-center min-h-screen bg-gray-900">
				<div className="w-12 h-12 border-t-4 border-cerise-red-500 border-solid rounded-full animate-spin"></div>
			</div>
		);

	if (error)
		return (
			<div className="text-center text-cerise-red-500 py-4">
				<p className="text-lg font-semibold">{error}</p>
			</div>
		);

	return (
		<div className="container mx-auto bg-gray-800 shadow-md rounded-lg p-4">
			{/* Table visible on medium and larger screens */}
			<table className="hidden md:min-w-full md:bg-gray-900 md:rounded-lg md:table md:visible">
				<thead className="bg-cerise-red-600 text-gray-200">
					<tr>
						<th className="py-3 px-4 text-left">Name</th>
						<th className="py-3 px-4 text-left">Email</th>
						<th className="py-3 px-4 text-left">Phone</th>
						<th className="py-3 px-4 text-left">Actions</th>
					</tr>
				</thead>
				<tbody className="text-gray-300">
					{/* Row for the "Create User" link */}
					<tr className="w-full">
						<td colSpan={4} className="py-4 px-6">
							<div className="flex justify-center">
								<Link
									to="/create"
									className="w-1/2 text-center p-4 bg-cerise-red-700 text-white text-xl rounded-lg"
								>
									Create User
								</Link>
							</div>
						</td>
					</tr>

					{/* User rows */}
					{users.map((user, index) => (
						<User key={user.id} user={user} index={index} />
					))}
				</tbody>
			</table>

			{/* Div visible only on small screens */}
			<div className="block md:hidden">
				{/* Create User button for small screens */}
				<div className="flex justify-center mb-4">
					<Link
						to="/create"
						className="w-full text-center p-4 bg-cerise-red-700 text-white text-xl rounded-lg"
					>
						Create User
					</Link>
				</div>

				{/* User cards for small screens */}
				{users.map((user, index) => (
					<div key={user.id} className="rounded-lg mb-4 text-gray-300">
						<User user={user} index={index} />
					</div>
				))}
			</div>
		</div>
	);
}

export default UserList;
