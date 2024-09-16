import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Sahifa topilmadi
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Uzr, siz izlagan sahifa mavjud emas.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-700 transition duration-300"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default PageNotFound;
