function HeaderKhusus({ breadcrumbs }) {
  return (
    <nav className="flex w-full h-20 bg-[#FFF7D4] shadow-lg items-center justify-between px-12">
      <div className="font-bold text-lg">{breadcrumbs}</div>
      <div>Icon / Image</div>
    </nav>
  );
}

export default HeaderKhusus;
