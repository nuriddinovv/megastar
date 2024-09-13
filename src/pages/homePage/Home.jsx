import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

export default function Home() {
  const modules = [
    { path: "/", text: "Продажа" },
    { path: "/", text: "Чеки" },
    { path: "/", text: "Отложка" },
    { path: "/", text: "Клиенты" },
    { path: "/products", text: "Товары" },
    { path: "/", text: "Возврат" },
    { path: "/", text: "Зарплата Менеджеров" },
    { path: "/", text: "" },
    { path: "/", text: "Оплата" },
    { path: "/", text: "Склад " },
    { path: "/", text: "Просроченные чеки" },
    { path: "/", text: "Жалобы клиентов" },
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
                <img src="https://www.picsum.photos/200/200" alt="" />
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
