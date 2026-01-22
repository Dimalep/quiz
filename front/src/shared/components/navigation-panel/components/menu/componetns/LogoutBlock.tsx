import type { CSSProperties } from "react";
import { useAuthContext } from "../../../../AuthProvider";

export default function LogoutBlock() {
  const { logout } = useAuthContext();

  return (
    <div style={styles.logoutBlock}>
      <div style={styles.logoutButton} onClick={() => logout()}>
        Logout
      </div>
    </div>
  );
}

const styles = {
  logoutBlock: {
    position: "absolute",
    height: "10%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    borderTop: "1px solid black",
    bottom: "50px",
    alignItems: "center",
  } as CSSProperties,
  logoutButton: {
    display: "flex",
    backgroundColor: "blue",
    borderRadius: "10px",
    height: 50,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    cursor: "pointer",
  } as CSSProperties,
};
