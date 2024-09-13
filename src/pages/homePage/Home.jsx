import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import {
  TbNumber12Small,
  TbNumber25Small,
  TbShoppingCartCog,
  TbShoppingCartDollar,
  TbShoppingCartX,
} from "react-icons/tb";
import { IoReceiptOutline } from "react-icons/io5";
import { FaCashRegister, FaUsers } from "react-icons/fa";
import { BsBasket3 } from "react-icons/bs";
import { LiaSitemapSolid } from "react-icons/lia";
import { TfiWallet } from "react-icons/tfi";
import { LuWarehouse } from "react-icons/lu";

export default function Home() {
  const modules = [
    { path: "/", text: "Продажа", logo: <TbShoppingCartDollar /> },
    { path: "/", text: "Чеки", logo: <IoReceiptOutline /> },
    { path: "/", text: "Отложка", logo: <TbShoppingCartCog /> },
    { path: "/", text: "Клиенты", logo: <FaUsers /> },
    { path: "/products", text: "Товары", logo: <BsBasket3 /> },
    { path: "/", text: "Возврат", logo: <TbShoppingCartX /> },
    { path: "/", text: "Зарплата Менеджеров", logo: <LiaSitemapSolid /> },
    { path: "/", text: "", logo: <FaCashRegister /> },
    { path: "/", text: "Оплата", logo: <TfiWallet /> },
    { path: "/", text: "Склад ", logo: <LuWarehouse /> },
    { path: "/", text: "Просроченные чеки", logo: <TbNumber25Small /> },
    { path: "/", text: "Жалобы клиентов", logo: <TbNumber12Small /> },
  ];
  return (
    <div>
      <Navbar />
      <section className="container flex flex-wrap justify-between gap-y-3 flex-1 my-4">
        {modules.map((item, index) => {
          return (
            <div
              key={index}
              className="border min-w-[20vw] h-72 cursor-pointer p-4 text-center"
            >
              <Link
                to={`${item.path}`}
                className="flex flex-col justify-between items-center w-full h-full"
              >
                <span className="text-[180px]">{item.logo}</span>
                <h1>{item.text}</h1>
              </Link>
              <div className=""></div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
