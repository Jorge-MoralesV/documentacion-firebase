export function Alert({ message }) {
  return (
    <div className="bg-danger text-red-700 px-4 py-3 rounded relative mb-2 text-center text-white">
      <span className="sm:inline block">{message}</span>
    </div>
  )
}
