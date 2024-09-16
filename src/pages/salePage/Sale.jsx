import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosRemove, IoMdAdd } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { SpinnerCircular } from "spinners-react";

export default function Sale() {
  // <--- --->

  const [itemsData, setItemsData] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await axios.get(`http://212.83.191.99:5000/items`);
      setItemsData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Data fetching error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredData = itemsData.filter((item) =>
    item.ItemName.toLowerCase().includes(search.toLowerCase())
  );
  // <--- --->

  // CLIENT AND PRICELIST SELECT
  const onChangeClient = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangePriceList = (value) => {
    console.log(`selected ${value}`);
  };

  // DISABLED INP VALUE
  const [inpValue, setInpValue] = useState("");
  const [amount, setAmount] = useState(1);
  useEffect(() => {
    setAmount(1);
  }, [inpValue]);

  return (
    <div className="bg-gray-100 h-[100vh] py-2 overflow-y-hidden">
      <div className="container grid gap-5 grid-cols-3">
        <div className="bg-white rounded-3xl p-3 flex flex-col gap-3">
          <Select
            className="w-full"
            placeholder="Выберите клиент..."
            optionFilterProp="label"
            onChange={onChangeClient}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
          <Select
            className="w-full "
            placeholder="Выберите прайс-лист..."
            optionFilterProp="label"
            onChange={onChangePriceList}
            options={[
              {
                value: "Retail",
                label: "Розница ",
              },
              {
                value: "wholesale",
                label: "Оптом",
              },
            ]}
          />
          <div className="h-[83vh]">
            <div className="flex bg-gray-100 px-3 py-1 rounded-md ">
              <input type="text" value={inpValue} disabled className="w-full" />
              <button
                onClick={() => {
                  setInpValue("");
                }}
              >
                X
              </button>
            </div>
            <div className="flex justify-around">
              <div className="flex flex-col items-center">
                <p className="text-[14px]">Кол-во</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setAmount((e) => e + 1);
                    }}
                    className="w-7 h-7 flex items-center justify-center border-green-500 text-green-500 border-4 rounded-lg"
                  >
                    <IoMdAdd />
                  </button>
                  <p>{amount}</p>
                  <button
                    onClick={() => {
                      setAmount((prevAmount) => Math.max(1, prevAmount - 1));
                    }}
                    className="w-7 h-7 flex items-center justify-center border-red-500 text-red-500 border-4 rounded-lg"
                  >
                    <IoIosRemove />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p className="text-[14px]">Цена</p>
                <p>20000</p>
              </div>
            </div>
            <div className="pt-3">
              <div className="max-w-md mx-auto rounded-lg border px-3 bg-white">
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
              {loading ? (
                <span className="h-[60vh] flex items-center justify-center">
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
                  <ul className="my-4 h-[60vh] overflow-y-scroll overflow-x-hidden w-full ">
                    {filteredData.map((item, index) => (
                      <li
                        key={index}
                        className="p-2 border-b w-full cursor-pointer"
                        onClick={() => {
                          setInpValue(item.ItemName);
                        }}
                      >
                        {item.ItemName}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-center">Tovarlar topilmadi</p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          laudantium eveniet libero beatae ipsum. Tenetur quas numquam dolore
          perferendis laboriosam, libero consectetur asperiores dolor officiis
          ex non molestias quasi. Beatae.
        </div>
        <div className="bg-white rounded-3xl p-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          laudantium eveniet libero beatae ipsum. Tenetur quas numquam dolore
          perferendis laboriosam, libero consectetur asperiores dolor officiis
          ex non molestias quasi. Beatae.
        </div>
      </div>
    </div>
  );
}
