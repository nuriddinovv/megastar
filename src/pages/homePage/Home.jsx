import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

import invoiceImg from "../../assets/invoice.png";
import invoicelistImg from "../../assets/invocelist.png";
import salesordersImg from "../../assets/salesorders.png";
import businesspartnersImg from "../../assets/businesspartners.png";
import itemsmasterImg from "../../assets/itemsmaster.png";
import returnsImg from "../../assets/returns.png";
import managersalaryImg from "../../assets/managersalary.png";
import cashreportImg from "../../assets/cashreport.png";
import paymentsImg from "../../assets/payments.png";
import inventoryresquetImg from "../../assets/inventoryrequest.png";

export default function Home() {
  const modules = [
    { path: "/sale", text: "Продажа", logo: invoiceImg },
    { path: "/", text: "Чеки", logo: invoicelistImg },
    { path: "/", text: "Отложка", logo: salesordersImg },
    { path: "/", text: "Клиенты", logo: businesspartnersImg },
    { path: "/products", text: "Товары", logo: itemsmasterImg },
    { path: "/", text: "Возврат", logo: returnsImg },
    { path: "/", text: "Зарплата Менеджеров", logo: managersalaryImg },
    { path: "/", text: "Отчет о наличных", logo: cashreportImg },
    { path: "/", text: "Оплата", logo: paymentsImg },
    { path: "/", text: "Склад", logo: inventoryresquetImg },
    { path: "/", text: "Просроченные чеки" },
    { path: "/", text: "Жалобы клиентов" },
  ];

  return (
    <div className="bg-gray-100">
      <nav className="bg-orange-400">
        <div className="container flex items-center justify-center h-12">
          <h1 className="font-extrabold text-3xl text-white ">SAP</h1>
        </div>
      </nav>
      <section className="container flex flex-wrap justify-between gap-y-3 flex-1 py-4">
        {modules.map((item, index) => {
          return (
            <div
              key={index}
              className="min-w-[20vw] h-72 cursor-pointer p-4 text-center bg-white rounded-3xl hover:shadow-lg transition duration-250"
            >
              <Link
                to={item.path}
                className="flex flex-col justify-between items-center w-full h-full"
              >
                <span className="text-[180px]">
                  {item.logo ? (
                    <img src={item.logo} width={250} alt={item.text} />
                  ) : (
                    ""
                  )}
                </span>
                <h1>{item.text}</h1>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
}
