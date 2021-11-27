import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

function MenuBar() {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
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
