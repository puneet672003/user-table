import axios from "axios";
import { User as UserType } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers(): Promise<UserType[]> {
    try {
        const response = await axios.get<UserType[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Cannot fetch user list!");
    }
}

export async function editUser(user: UserType): Promise<UserType> {
    try {
        const response = await axios.put<UserType>(`${API_URL}/${user.id}`, user);
        return response.data; 
    } catch (error) {
        console.error("Error editing user:", error);
        throw new Error("Cannot edit user!");
    }
}

export async function deleteUser(userId: number): Promise<void> {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`); // Delete user based on ID
        console.log("User deleted successfully:", response.data);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Cannot delete user!");
    }
}

export async function createUser(user: Omit<UserType, "id">): Promise<UserType> {
    try {
        const response = await axios.post<UserType>(API_URL, user);
        console.log("User created successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Cannot create user!");
    }
}