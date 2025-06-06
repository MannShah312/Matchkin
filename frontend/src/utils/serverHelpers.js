    // // src/utils/serverHelpers.js

    // import { backendUrl } from "../config"; // Update path if needed

    // // --------------------
    // // ✅ Unauthenticated POST (e.g., login, signup)
    // // --------------------
    // export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    // try {
    //     const response = await fetch(`${backendUrl}${route}`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //     });

    //     const result = await response.json();
    //     return result;
    // } catch (err) {
    //     console.error("Unauth POST error:", err);
    //     return { error: "Request failed" };
    // }
    // };

    // // --------------------
    // // ✅ Authenticated POST
    // // --------------------
    // export const makeAuthenticatedPOSTRequest = async (route, body) => {
    // try {
    //     const token = getToken();
    //     const response = await fetch(`${backendUrl}${route}`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(body),
    //     });

    //     const result = await response.json();
    //     return result;
    // } catch (err) {
    //     console.error("Auth POST error:", err);
    //     return { error: "Request failed" };
    // }
    // };

    // // --------------------
    // // ✅ Authenticated GET
    // // --------------------
    // export const makeAuthenticatedGETRequest = async (route) => {
    // try {
    //     const token = getToken();
    //     const response = await fetch(`${backendUrl}${route}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //     },
    //     });

    //     const result = await response.json();
    //     return result;
    // } catch (err) {
    //     console.error("Auth GET error:", err);
    //     return { error: "Request failed" };
    // }
    // };

    // // --------------------
    // // ✅ Authenticated PUT
    // // --------------------
    // export const makeAuthenticatedPUTRequest = async (route, body) => {
    // try {
    //     const token = getToken();
    //     const response = await fetch(`${backendUrl}${route}`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(body),
    //     });
    //     return await response.json();
    // } catch (err) {
    //     console.error("Auth PUT error:", err);
    //     return { error: "Request failed" };
    // }
    // };

    // // --------------------
    // // ✅ Authenticated DELETE
    // // --------------------
    // export const makeAuthenticatedDELETERequest = async (route) => {
    // try {
    //     const token = getToken();
    //     const response = await fetch(`${backendUrl}${route}`, {
    //     method: "DELETE",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //     },
    //     });
    //     return await response.json();
    // } catch (err) {
    //     console.error("Auth DELETE error:", err);
    //     return { error: "Request failed" };
    // }
    // };

    // // --------------------
    // // 🔐 Get token from cookie
    // // --------------------
    // const getToken = () => {
    // const accessToken = document.cookie.replace(
    //     /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    //     "$1"
    // );
    // return accessToken;
    // };

    import { backendUrl } from "./config"; // Ensure this path is correct

// 🔓 Unauthenticated POST (e.g. login, signup)
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  try {
    const response = await fetch(`${backendUrl}${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Unauth POST error:", err);
    return { error: "Request failed" };
  }
};

// // 🔐 Authenticated GET
// export const makeAuthenticatedGETRequest = async (route) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${backendUrl}${route}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const result = await response.json();
//     return result;
//   } catch (err) {
//     console.error("Auth GET error:", err);
//     return { error: "Request failed" };
//   }
// };

export const makeAuthenticatedGETRequest = async (route) => {
  try {
    const token = getToken();
    const response = await fetch(`${backendUrl}${route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await response.text(); // Get raw text
    try {
      return JSON.parse(text); // Try parsing it
    } catch (err) {
      console.error("Non-JSON response:", text);
      throw new Error("Response was not valid JSON");
    }
  } catch (err) {
    console.error("Auth GET error:", err.message || err);
    throw err;
  }
};

// // 🔐 Authenticated POST
// export const makeAuthenticatedPOSTRequest = async (route, body) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${backendUrl}${route}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//     });

//     const result = await response.json();
//     return result;
//   } catch (err) {
//     console.error("Auth POST error:", err);
//     return { error: "Request failed" };
//   }
// };

// export const makeAuthenticatedPOSTRequest = async (route, body) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${backendUrl}${route}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//     });

//     const text = await response.text(); // <-- read as text first for debugging

//     try {
//       const data = JSON.parse(text);
//       if (!response.ok) {
//         console.error("POST failed:", data);
//         throw new Error(data.message || "Request failed");
//       }
//       return data;
//     } catch (jsonErr) {
//       console.error("Invalid JSON:", text);
//       throw new Error("Response was not valid JSON");
//     }
//   } catch (err) {
//     console.error("Auth POST error:", err);
//     throw err;
//   }
// };

// export const makeAuthenticatedPOSTRequest = async (route, body) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${backendUrl}${route}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//     });

//     const text = await response.text(); // Read raw response
//     try {
//       return JSON.parse(text); // Try parsing as JSON
//     } catch (jsonErr) {
//       console.error("Raw response (not JSON):", text);
//       throw new Error("Response was not valid JSON");
//     }
//   } catch (err) {
//     console.error("Auth POST error:", err);
//     throw err;
//   }
// };

// export const makeAuthenticatedPOSTRequest = async (route, body) => {
//   const token = localStorage.getItem('token');
//   try {
//     const response = await fetch(route, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token ? `Bearer ${token}` : '',
//       },
//       body: JSON.stringify(body),
//     });

//     const contentType = response.headers.get('content-type');

//     // If not OK, try to read error response properly
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP ${response.status}: ${errorText}`);
//     }

//     // Handle non-JSON (e.g., HTML or plain text) gracefully
//     if (contentType && contentType.includes('application/json')) {
//       return await response.json();
//     } else {
//       const text = await response.text();
//       throw new Error(`Expected JSON, got: ${text}`);
//     }
//   } catch (err) {
//     console.error('Auth POST error:', err.message || err);
//     throw err;
//   }
// };

export const makeAuthenticatedPOSTRequest = async (route, body) => {
  const token = getToken(); // Or localStorage.getItem('token') if you prefer
  try {
    const response = await fetch(`${backendUrl}${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON, got: ${text}`);
    }
  } catch (err) {
    console.error('Auth POST error:', err.message || err);
    throw err;
  }
};

// export const makeAuthenticatedGETRequest = async (route) => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${backendUrl}${route}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const text = await response.text(); // Get raw text
//     try {
//       return JSON.parse(text); // Try parsing it
//     } catch (err) {
//       console.error("Non-JSON response:", text);
//       throw new Error("Response was not valid JSON");
//     }
//   } catch (err) {
//     console.error("Auth GET error:", err.message || err);
//     throw err;
//   }
// };


// 🔐 Authenticated PUT
export const makeAuthenticatedPUTRequest = async (route, body) => {
  try {
    const token = getToken();
    const response = await fetch(`${backendUrl}${route}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (err) {
    console.error("Auth PUT error:", err);
    return { error: "Request failed" };
  }
};

// 🔐 Authenticated DELETE
export const makeAuthenticatedDELETERequest = async (route) => {
  try {
    const token = getToken();
    const response = await fetch(`${backendUrl}${route}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (err) {
    console.error("Auth DELETE error:", err);
    return { error: "Request failed" };
  }
};


// 🍪 Token extractor
const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return accessToken;
};