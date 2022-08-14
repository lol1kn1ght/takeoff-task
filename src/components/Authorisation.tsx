import { Login_form } from "forms/login_form";
import { Component, ReactNode } from "react";
import { display_type } from "types";

type state_type = {
  display: display_type;
};

export class Authorisation extends Component {
  state: state_type = {
    display: "login",
  };

  render(): ReactNode {
    switch (this.state.display) {
      case "login":
        return <Login_form />;
      case "register":
        return <Login_form />;
    }
  }
}
