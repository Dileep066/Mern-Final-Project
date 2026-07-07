export default function ListCard({ data, onDelete, onEdit }) {
 return (<>
 <div className="mb-2 flex items-center justify-between rounded bg-white px-2 py-4 text-slate-900 shadow">
    <div>
        <h3 className="font-bold text-slate-900">{data.name}</h3>
        </div>
    <div className="text-sm text-slate-700">{data.email}</div>
    <div className="text-sm text-slate-700">{data.age}</div>
    
</div>
<div className="flex gap-2">
    <button onClick={() => onEdit(data._id)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
        Edit
    </button>
    <button onClick={() => onDelete(data._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Delete
    </button>
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        View
    </button>
</div>
        

 </>);
}