let SessionID;

export async function LoginApi({ username, password }) {
  try {
    const response = await fetch("/api/b1s/v2/Login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CompanyDB: "MEGA_TEST3",
        Password: password,
        UserName: username,
        Language: 24,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    if (result && result.SessionId) {
      localStorage.setItem("SessionId", result.SessionId);
      SessionID = result.SessionId;
    }

    return result;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

// window.addEventListener("beforeunload", () => {
//   localStorage.removeItem("SessionId");
// });

// Items data

export const ItemsFetchData = async () => {
  try {
    const response = await fetch(
      `/api/b1s/v2/sml.svc/DISCOUNTParameters(P_WhsCode='M-SHOW1', P_Date='2024-09-19',P_PriceList=1, P_CardCode='')/DISCOUNT?$select=ItemName,ItemCode,QuantityOnStockByCurrentWhs,Price`,
      {
        headers: { Prefer: 'odata.maxpagesize="all"' },
      }
    );
    if (!response.ok) {
      throw new Error("Data fetching error");
    }
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// CLIENTS

export const clientsFetchData = async () => {
  try {
    const response = await fetch(
      "/api/b1s/v2/sml.svc/BPLIST_DEBTBYSHOP?$filter=WhsCode eq 'M-SHOW1'",
      {
        method: "GET",
        headers: {
          Cookie: `B1SESSION=${SessionID}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Data fetching error");
    }
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error("Error fetching data:acacacac", error);
    throw error;
  }
};

// ORDERS

export const ordersFetchData = async (CardCode, allProducts) => {
  try {
    const response = await fetch(
      "/api/b1s/v2/Orders?$filter=U_whs eq 'M-SHOW1'",
      {
        method: "POST",
        headers: {
          Cookie: `B1SESSION=${SessionID}`,
        },
        body: JSON.stringify({
          CardCode: CardCode,
          SalesPersonCode: 29,
          BPL_IDAssignedToInvoice: 1,
          U_whs: "M-SHOW1",
          DocumentLines: allProducts,
        }),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
