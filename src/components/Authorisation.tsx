import { LoginForm } from "forms/login_form";
import { RegisterForm } from "forms/register_form";
import { Component, ReactNode } from "react";
import { display_type } from "types";
import "css/Authorisation.css";

type state_type = {
  display: display_type;
};

export class Authorisation extends Component {
  state: state_type = {
    display: "login",
  };

  change_display(display: display_type) {
    this.setState({
      display,
    });
  }

  render(): ReactNode {
    switch (this.state.display) {
      case "login":
        return <LoginForm change_display={this.change_display.bind(this)} />;
      case "register":
        return <RegisterForm />;
    }
  }
}
