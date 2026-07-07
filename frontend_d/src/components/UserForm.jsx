import { useState } from "react";
import { createUser, updateUser } from "../user.service";

const initialState = {
    name: "",
    email: "", 
    age: "",
    };
export default function UserForm(
    {
        selectedUser,
        setSelectedUser,
        onSaved,

    }
)
{
    const [formData, setFormData] = useState(() => ({
        name: selectedUser?.name ?? "",
        email: selectedUser?.email ?? "",
        age: selectedUser?.age ?? "",
    }));
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (selectedUser) {
                await updateUser(selectedUser._id, formData);
            }
            else {
                await createUser(formData);
            }
            await onSaved();
            setFormData(initialState);
            setSelectedUser(null);

        } catch (error) {
            console.error(error);
        }
    }   
    function handleCancel() {
        setFormData(initialState);
        setSelectedUser(null);
    }                                                                                  

    return <>
    <form onSubmit={handleSubmit} className="mb-5 bg-white p-4 text-slate-900">
        
      
        <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-slate-300 p-2 text-slate-900 outline-none focus:border-blue-500"
            />
        </div>
        <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-slate-300 p-2 text-slate-900 outline-none focus:border-blue-500"
            />
        </div>
        <div className="mb-3">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Age</label>
            <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-slate-300 p-2 text-slate-900 outline-none focus:border-blue-500"
            />
        </div>
        <div className="flex gap-2">
            <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                {selectedUser ? "Update" : "Create"}
            </button>
            {selectedUser && (
                <button type="button" onClick={handleCancel} className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
                    Cancel
                </button>
            )}
        </div>
    </form>
    </>;
}