import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage(params) {
      const storageUser = await AsyncStorage.getItem("@finToken");

      if (storageUser) {
        const reponse = await api
          .get("/me", {
            headers: {
              Authorization: `Bearer ${storageUser}`,
            },
          })
          .catch(() => {
            setUser(null);
          });

        api.defaults.headers["Authorization"] = `Bearer ${storageUser}`;
        setUser(reponse.data);
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signUp(email, password, name) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/users", {
        name: name,
        password: password,
        email: email,
      });

      setLoadingAuth(false);

      navigation.goBack();
    } catch (error) {
      console.log("error when signing up", error);
      setLoadingAuth(false);
    }
  }

  async function signIn(email, password) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      const { id, name, token } = response.data;

      const data = {
        id,
        name,
        token,
        email,
      };

      await AsyncStorage.setItem("@finToken", token);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
      });

      setLoadingAuth(false);
    } catch (error) {
      console.log("Error Sign", error);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUp,
        signIn,
        signOut,
        loadingAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
