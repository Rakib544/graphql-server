import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("home");

  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);

  useEffect(() => {
    setActiveItem(path);
  }, [path, pathname]);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div>
      <Menu pointing secondary color="teal">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right">
          {user ? (
            <Menu.Item name="logout" onClick={logout} />
          ) : (
            <>
              <Menu.Item
                name="login"
                active={activeItem === "login"}
                onClick={handleItemClick}
                as={Link}
                to="/login"
              />
              <Menu.Item
                name="register"
                active={activeItem === "register"}
                onClick={handleItemClick}
                as={Link}
                to="/register"
              />
            </>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default MenuBar;
