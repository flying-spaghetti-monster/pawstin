function Footer() {
  const year = new Date(Date.now()).getFullYear();

  return (
    <div className="bg-[#212529] text-[#ffffff]">
      <footer className="container mx-auto text-center py-6">
        <small className="text-sm">Copyright &copy; Your Website {year}</small>
      </footer>
    </div>
  );
}

export default Footer;
