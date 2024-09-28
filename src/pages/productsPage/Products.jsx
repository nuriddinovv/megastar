import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { SpinnerCircular } from "spinners-react";
import { Pagination } from "antd";
import { ItemsFetchData } from "../../database/Api";

export default function Products() {
  const [itemsData, setItemsData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const result = await ItemsFetchData();
      setItemsData(result);

      setLoading(false);
    } catch {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = itemsData.filter((item) =>
    item.ItemName.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-gray-100">
      <div className="container">
        <h1 className="text-center text-3xl py-4">Товары</h1>
        <div className="max-w-md mx-auto rounded-lg border px-3 bg-white">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Поиск товаров..."
              className="w-full outline-none p-2"
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              value={search}
            />
            <span className="ml-2 cursor-pointer">
              <IoSearchOutline />
            </span>
          </div>
        </div>
        {loading ? (
          <span className="h-[80vh] flex items-center justify-center">
            <SpinnerCircular
              size={70}
              thickness={155}
              speed={100}
              color="rgba(0, 0, 0, 1)"
              secondaryColor="rgba(0, 0, 0, 0.3)"
            />
          </span>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredData.length > 0 ? (
          <>
            <ul className="my-4 flex flex-col gap-2">
              {paginatedData.map((item, index) => (
                <li key={index} className="p-3 border-b bg-white rounded">
                  <div className="flex justify-between">
                    <span>
                      {(currentPage - 1) * itemsPerPage + index + 1} |{" "}
                      {item.ItemName}
                    </span>
                    <span>Magazin: {item.QuantityOnStockByCurrentWhs}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Pagination
              current={currentPage}
              total={filteredData.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
              showSizeChanger={false}
              className="py-4 mx-auto w-fit"
            />
          </>
        ) : (
          <p className="text-center">Tovarlar topilmadi</p>
        )}
      </div>
    </div>
  );
}
