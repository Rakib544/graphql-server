import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

function MenuBar() {
  const [activeItem, setActiveItem] = useState("home");

  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);

  useEffect(() => {
    setActiveItem(path);
  }, [path]);

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
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default MenuBar;
