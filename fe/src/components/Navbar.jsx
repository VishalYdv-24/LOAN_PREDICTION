function Navbar() {

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h2
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          LoanAI
        </h2>

        <div className="flex gap-6">

          <button
            onClick={() => scrollToSection("emi")}
            className="hover:text-blue-600 transition"
          >
            EMI Calculator
          </button>

          <button
            onClick={() => scrollToSection("predict")}
            className="hover:text-blue-600 transition"
          >
            Loan Predictor
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;