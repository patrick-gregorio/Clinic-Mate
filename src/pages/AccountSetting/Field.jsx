function Field({
  label,
  value,
  onChange,
  placeholder,
  rightIcon: RightIcon,
  type = "text",
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
        />
        {RightIcon && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500"
            tabIndex={-1}
          >
            <RightIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
export default Field;
