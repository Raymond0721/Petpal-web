import { fetchWithoutToken, fetchWithToken } from "./utils";

export const registerUser = async (userData) => {
  const formData = new FormData();

  for (const key in userData) {
    formData.append(key, userData[key]);
  }
  try {
    const response = await fetchWithoutToken(
      `/accounts/register/`,
      "POST",
      formData,
    );

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  const response = await fetchWithoutToken(`/accounts/auth/`, "POST", {
    username,
    password,
  });

  const responseData = await response.json();
  if (response.ok) {
    localStorage.setItem("accessToken", responseData?.access);
    localStorage.setItem("refreshToken", responseData?.refresh);
    const userData = await getUserInfo(responseData?.user_id);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    console.log("curr user: ", JSON.parse(localStorage.getItem("currentUser")));
    return responseData?.user_id;
  } else {
    console.error("Login failed:", responseData.error);
    throw new Error(responseData.error || "Login failed");
  }
};

export const getUserInfo = async (userId) => {
  try {
    const response = await fetchWithToken(`/accounts/${userId}/`);

    return await response.json();
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};