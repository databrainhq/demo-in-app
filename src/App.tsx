import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState(
    searchParams.get("token") || localStorage.getItem("token") || ""
  );
  const dashboardId =
    searchParams.get("dashboardId") ||
    localStorage.getItem("dashboardId") ||
    "";

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("dashboardId", dashboardId);
    } else if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token") as string);
    }
  }, []);

  useEffect(() => {
    if (
      !searchParams.has("token") &&
      !searchParams.has("configId") &&
      !searchParams.has("dashboardId")
    ) {
      setSearchParams((prev) => ({ ...prev, token, dashboardId }));
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <div className="w-full overflow-x-hidden">
        <dbn-dashboard
          token={token}
          dashboard-id={dashboardId}
        />
      </div>
    </div>
  );
}

export default App;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "dbn-dashboard": any;
    }
  }
}
