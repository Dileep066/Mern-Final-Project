export default function OrderCard({ data, onDelete, onEdit }) {
  const userLabel = data.user?.name ? `${data.user.name} (${data.user.email})` : data.user?._id || data.user;

  return (
    <>
      <div className="mb-2 rounded-lg bg-white px-3 py-4 shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Order</h3>
              <p className="mt-1 text-sm text-slate-500">User: {userLabel}</p>
            </div>
            <div className="text-right text-sm text-slate-600">
              {data.products?.length || 0} item(s)
            </div>
          </div>

          <div className="space-y-1 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
            {data.products?.map((item, index) => (
              <div key={`${index}-${item.product?._id || item.product}`} className="flex items-center justify-between gap-4">
                <span>{item.product?.product_name || item.product?._id || item.product}</span>
                <span className="font-semibold">Qty: {item.quantity}</span>
              </div>
            ))}
          </div>
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