import { LoginForm } from "forms/login_form";
import { RegisterForm } from "forms/register_form";
import { useState } from "react";
import { display_type } from "types";
import "css/Authorisation.css";

export const Authorisation = () => {
  const [display, set_display] = useState<display_type>("login");

  const change_display = (display: display_type) => {
    set_display(display);
  };

  switch (display) {
    case "login":
      return <LoginForm change_display={change_display} />;
    case "register":
      return <RegisterForm change_display={change_display} />;
  }
};
