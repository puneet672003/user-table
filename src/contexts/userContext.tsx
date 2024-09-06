import { ReactNode, createContext, useState, useEffect } from "react";
import {
	fetchUsers,
	createUser as apiCreateUser,
	editUser as apiEditUser,
	deleteUser as apiDeleteUser,
} from "../api/users";
import { User as UserType } from "../types";

interface UserContextProps {
	users: UserType[];
	loading: boolean;
	error: string | null;
	editUser: (user: UserType) => Promise<void>;
	deleteUser: (id: number) => Promise<void>;
	createUser: (user: Omit<UserType, "id">) => Promise<void>;
}

interface UserProviderProps {
	children: ReactNode;
}

export const UserContext = createContext<UserContextProps>({
	users: [],
	editUser: async () => {},
	deleteUser: async () => {},
	createUser: async () => {},
	loading: false,
	error: null,
});

export function UserProvider({ children }: UserProviderProps) {
	const [users, setUsers] = useState<UserType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		console.log("refetching");
		const fetchData = async () => {
			try {
				const fetchedUsers = await fetchUsers();
				setUsers(fetchedUsers);
			} catch (error) {
				console.error("Error fetching users:", error);
				setError("Cannot retrieve user list.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const editUser = async (user: UserType) => {
		try {
			const updatedUser = await apiEditUser(user);
			const updatedUsers = users.map((u) =>
				u.id === user.id ? updatedUser : u
			);
			setUsers(updatedUsers);
		} catch (error) {
			console.error("Error editing user:", error);
			throw new Error("Unable to edit user.");
		}
	};

	const deleteUser = async (id: number) => {
		try {
			await apiDeleteUser(id);
			const filteredUsers = users.filter((u) => u.id !== id);
			setUsers(filteredUsers);
		} catch (error) {
			console.error("Error deleting user:", error);
			throw new Error("Unable to delete user.");
		}
	};

	const createUser = async (newUser: Omit<UserType, "id">) => {
		try {
			const createdUser = await apiCreateUser(newUser);
			setUsers([...users, createdUser]);
		} catch (error) {
			console.error("Error creating user:", error);
			throw new Error("Unable to create user.");
		}
	};

	return (
		<UserContext.Provider
			value={{ users, loading, error, editUser, deleteUser, createUser }}
		>
			{children}
		</UserContext.Provider>
	);
}
