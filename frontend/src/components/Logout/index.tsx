import { Button, Col } from "react-bootstrap";
import style from "./style.module.scss";
import Router from "next/router";
import { FiLogOut } from "react-icons/fi";

export function LogOut() {
  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.reload(false);
  };
  return (
    <>
      <Col xs={12} md={1}>
        <Button
          variant="danger"
          size="sm"
          style={{
            width: "1.5rem",
            height: "1.5rem",
            padding: "0",
            marginLeft: "2%",
            marginTop: ".75rem",
          }}
          onClick={logout}
        >
          <FiLogOut />
        </Button>
      </Col>
    </>
  );
}
