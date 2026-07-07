export default function ProductCard({ data, onDelete, onEdit }) {
  return (
    <>
      <div className="mb-2 rounded-lg bg-white px-3 py-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{data.product_name}</h3>
            <p className="mt-1 text-sm text-slate-500">{data.description}</p>
          </div>
          <div className="text-right text-sm font-semibold text-slate-700">₹{data.price}</div>
        </div>
      </div>
      <div className="mb-5 flex gap-2">
        <button onClick={() => onEdit(data._id)} className="rounded-lg bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600">
          Edit
        </button>
        <button onClick={() => onDelete(data._id)} className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
          Delete
        </button>
      </div>
    </>
  );
}