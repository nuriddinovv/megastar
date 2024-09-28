import { useEffect, useState } from "react";
import {
  clientsFetchData,
  ItemsFetchData,
  ordersFetchData,
} from "../../database/Api";
import { SpinnerCircular, SpinnerInfinity } from "spinners-react";
import { Message } from "primereact/message";
// CSS
import "./sale.css";
import incrementLogo from "../../assets/ic_plus.png";
import decrementLogo from "../../assets/ic_minus.png";

export default function Sale() {
  // All data
  const [clients, setClients] = useState(null);
  const [orders, setOrders] = useState(null);
  const [items, setItems] = useState([]);
  const [cardName, setCardName] = useState(null);
  const [priceList, setPriceList] = useState(null);

  // CART
  const [cart, setCart] = useState([]);

  // Selected item
  const [currentItem, setCurrentItem] = useState(null);
  const [itemCount, setItemCount] = useState(1);
  console.log(currentItem);

  // SEND ORDERS
  function handleOrdersPost() {
    ordersFetchData((CardCode = cardName), (allProducts = cart));
  }

  // Filter
  const [search, setSearch] = useState("");
  const filteredData = items.filter((item) =>
    item.ItemName.toLowerCase().includes(search.toLowerCase())
  );

  // error
  const [error, setError] = useState("");

  // FETCH ---------------------------------------------
  const fetchData = async () => {
    try {
      // CLIENTS
      const allClients = await clientsFetchData();
      setClients(allClients);

      // ITEMS
      const allItems = await ItemsFetchData();
      setItems(allItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    if (error) {
      const timer = setTimeout(() => {
        setError(""); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <div className="bg-gray-100 h-[100vh] w-full overflow-y-hidden grid grid-cols-3 gap-3 p-2">
        <>
          <div className="bg-white rounded p-4 w-full flex flex-col">
            <div className="w-full flex flex-col gap-3">
              <select
                onChange={(e) => setCardName(e.target.value)}
                className={`w-full p-2 rounded outline-none ${
                  cardName === null
                    ? "border border-red-500"
                    : "border border-green-500"
                }`}
              >
                <option selected disabled>
                  Выберите клиент...
                </option>
                {clients?.map((item, i) => (
                  <option key={i} value={item.CardCode}>
                    {item.CardName}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setPriceList(e.target.value)}
                className={`w-full p-2 rounded outline-none ${
                  priceList === null
                    ? "border border-red-500"
                    : "border border-green-500"
                }`}
              >
                <option selected disabled>
                  Выберите прайс-лист...
                </option>
                <option value="retail">Розница</option>
                <option value="wholesale">Оптом</option>
              </select>
            </div>
            <div className="flex gap-3 mt-3">
              <input
                className="w-full flex-auto border rounded p-1"
                type="text"
                disabled
                value={currentItem?.ItemName}
              />

              <div className="flex gap-3">
                <div className="flex items-center justify-center">
                  <button
                    className="flex items-center justify-center w-9 rounded h-9"
                    disabled={!currentItem}
                    onClick={() => {
                      if (itemCount < currentItem.QuantityOnStockByCurrentWhs) {
                        // Maxsus miqdorni cheklash
                        setItemCount((prevCount) => prevCount + 1);
                      } else {
                        setError("Miqdor maksimumdan oshmasin");
                      }
                    }}
                  >
                    <img src={incrementLogo} alt="+" />
                  </button>

                  <input
                    min={1}
                    max={currentItem?.QuantityOnStockByCurrentWhs}
                    disabled={!currentItem}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value > currentItem.QuantityOnStockByCurrentWhs) {
                        // Maksimumni tekshirish
                        setError("Miqdor maksimumdan oshmasin");
                      } else if (value < 1) {
                        // Kamida 1 bo'lishi kerak
                        setError("Item count can't be less than 1");
                      } else {
                        setError(""); // Xatolikni tozalash
                        setItemCount(value);
                      }
                    }}
                    className="w-[50px] h-9 countItem outline-none items-center text-center"
                    type="number"
                    value={itemCount}
                  />

                  <button
                    className="flex items-center justify-center w-9 rounded h-9"
                    disabled={!currentItem}
                    onClick={() => {
                      if (itemCount > 1) {
                        setItemCount((prevCount) => prevCount - 1);
                      } else {
                        setError("Item count can't be less than 1");
                      }
                    }}
                  >
                    <img src={decrementLogo} alt="-" />
                  </button>
                </div>
              </div>
            </div>
            {error && (
              <div className="z-30 absolute w-full flex items-center justify-center h-[20vh]">
                <Message
                  className="bg-red-200 rounded-lg p-4 flex items-center gap-2 w-fit text-red-500"
                  severity="error"
                  text={error}
                />
              </div>
            )}
            <div className="">
              <p className="my-3 text-2xl font-bold text-center">TOVARLAR</p>
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
                className="border p-2 w-full mb-2"
                placeholder="Search item..."
              />
              {cardName ? (
                <>
                  {items.length === 0 ? (
                    <div className="flex items-center justify-center w-full h-[68vh]">
                      <SpinnerCircular
                        size={130}
                        thickness={180}
                        speed={100}
                        color="rgba(0, 0, 0, 1)"
                        secondaryColor="rgba(0, 0, 0, 0.22)"
                      />
                    </div>
                  ) : filteredData.length > 0 ? (
                    <ul className="h-[68vh] overflow-y-scroll flex flex-col gap-1 bg-gray-100 p-2 border">
                      {filteredData.map((item, i) => (
                        <li
                          onClick={() => {
                            item.QuantityOnStockByCurrentWhs > 0
                              ? setCurrentItem(item)
                              : console.log("mumknmas");
                          }}
                          className="border-b bg-white p-1 flex flex-col gap-1 cursor-pointer"
                          key={i}
                        >
                          <div>{item.ItemName}</div>
                          <div
                            className={`py-1 px-2 ${
                              item.QuantityOnStockByCurrentWhs === 0
                                ? "bg-red-200"
                                : "bg-green-200"
                            } w-fit rounded`}
                          >
                            Магазин : {item.QuantityOnStockByCurrentWhs}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center justify-center w-full h-[68vh]">
                      <p>Topilmadi</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-[68vh]">
                  <p>Выберите клиент...</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded p-4"></div>
          <div className="bg-white rounded p-4"></div>
        </>
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          className={`absolute flex items-center justify-center bottom-0 left-0 h-[100vh] w-full ${
            clients ? "hidden" : ""
          }`}
        >
          <SpinnerInfinity
            size={130}
            thickness={180}
            speed={100}
            color="rgba(0, 0, 0, 1)"
            secondaryColor="rgba(0, 0, 0, 0.22)"
          />
        </div>
      </div>
    </>
  );
}
