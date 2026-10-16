function SidebarItem({ icon: Icon, label, active, onClick, danger }) {
  const holder = Icon;
  console.log(holder);
  return (
    <button
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 px-5 py-4 text-left ",
        active
          ? "bg-sky-50 text-sky-900" //kapag active
          : danger
          ? "text-red-700 hover:bg-red-50 hover:rounded-xl" //kapag present si danger
          : "text-gray-700 hover:bg-gray-50 hover:rounded-xl", //hindi active
        active ? " rounded-xl border-sky-500 pl-4.5 " : "pl-5",
      ].join(" ")}
    >
      <Icon
        className={["h-5 w-5", danger ? "text-red-600" : "text-gray-600"].join(
          " "
        )}
      />
      <span className="text-[15px]">{label}</span>
    </button>
  );
}

export default SidebarItem;
