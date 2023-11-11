import { ActivityIndicator, View } from "react-native";
import AuthRoutes from "./authRoutes";
import AppRoutes from "./app.routes";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

function Routes(params) {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f4ff",
        }}
      >
        <ActivityIndicator size={"large"} color={"#131313"} />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
