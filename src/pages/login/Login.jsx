import { LoginApi } from "../../database/Api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Message } from "primereact/message";
import megastarLogo from "../../assets/mega_logo_mainpage1.png";
import sapLogo from "../../assets/powerebysaplogo.png";
import { SpinnerInfinity } from "spinners-react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await LoginApi({ username: userName, password });

      if (result && result.SessionId) {
        localStorage.setItem("SessionId", result.SessionId);
        navigate("/");
      } else {
        setError("Неверный логин или пароль");
      }
    } catch {
      setError("Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-[100vh] overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={megastarLogo} className="mx-auto w-auto" />
      </div>
      <form>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Имя пользователя
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 outline-none px-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Пароль
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-orange-400 outline-none px-2  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {error && (
              <Message
                className="bg-red-200 rounded-lg p-4 flex items-center gap-2 left-0 right-0 w-fit absolute text-red-500 top-10 mx-auto"
                severity="error"
                text={error}
              />
            )}
            <div>
              <button
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 min-h-9"
                disabled={loading}
              >
                {loading ? (
                  <SpinnerInfinity
                    size={50}
                    thickness={140}
                    speed={100}
                    color="rgba(255, 255, 255, 1)"
                    secondaryColor="rgba(255, 255, 255, 0.5)"
                  />
                ) : (
                  "Войти"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm  w-full mx-auto relative top-32">
        <img alt="Your Company" src={sapLogo} className="mx-auto w-auto " />
      </div> */}
    </div>
  );
}
