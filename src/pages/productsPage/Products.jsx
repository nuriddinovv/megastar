import axios from "axios";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { SpinnerCircular } from "spinners-react";

export default function Products() {
  const [itemsData, setItemsData] = useState([]);
  const [search, setSearch] = useState("");

  // All items
  const fetchData = async () => {
    try {
      const response = await axios.get("http://212.83.191.99:5000/items");
      setItemsData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // Filter by search input
  const filteredData = itemsData.filter((item) =>
    item.ItemName.toLowerCase().includes(search.toLowerCase())
  );

  console.log(search);

  return (
    <div className="container">
      <h1 className="text-center text-3xl my-4">Товары</h1>
      <div className="max-w- mx-auto rounded-lg border px-3">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Поиск товаров..."
            className="w-full outline-none p-2"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          <span className="ml-2 cursor-pointer">
            <IoSearchOutline />
          </span>
        </div>
      </div>
      {itemsData.length > 0 ? (
        <ul className="my-4">
          {filteredData.map((item, index) => (
            <li key={index} className="p-2 border-b">
              {item.ItemName}
            </li>
          ))}
        </ul>
      ) : (
        <span className="h-[80vh] flex items-center justify-center">
          <SpinnerCircular
            size={70}
            thickness={155}
            speed={100}
            color="rgba(0, 0, 0, 1)"
            secondaryColor="rgba(0, 0, 0, 0.3)"
          />
        </span>
      )}
    </div>
  );
}
