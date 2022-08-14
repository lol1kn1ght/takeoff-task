import { is } from "immer/dist/internal";
import { Component, FormEvent, ReactNode } from "react";
import { display_type } from "types";

type field_type = {
  value?: string;
  wrong?: boolean;
};

type state_type = {
  username: field_type;
  password: field_type;
};

type elem_name_type = "username" | "password";

type props_type = {
  change_display: (display: display_type) => void;
};

export class LoginForm extends Component<props_type> {
  state: state_type = {
    password: {},
    username: {},
  };

  handle_change(event: FormEvent<HTMLInputElement>) {
    const elem_name = event.currentTarget.name as elem_name_type;
    const value = event.currentTarget.value;

    if (value === "")
      return this.setState({
        [elem_name]: {
          wrong: true,
        },
      });

    this.setState({
      [elem_name]: {
        value,
        wrong: false,
      },
    });
  }

  async login() {
    console.log("LOGIN");
  }

  is_wrong() {
    const { password, username } = this.state;

    let is_wrong = true;

    if (password.wrong === undefined || username.wrong === undefined) {
      is_wrong = true;
    } else is_wrong = password.wrong || username.wrong;

    return is_wrong;
  }

  render(): ReactNode {
    return (
      <div className='authorisation-container'>
        <div className='authorisation-title-container'>Авторизация</div>

        <div className='authorisation-forms-container'>
          <input
            className={this.state.username.wrong ? "error" : undefined}
            type='text'
            name='username'
            onInput={this.handle_change.bind(this)}
            placeholder='Введите ваш юзернейм'
          />
          <input
            className={this.state.password.wrong ? "error" : undefined}
            type='password'
            name='password'
            onInput={this.handle_change.bind(this)}
            placeholder='Введите ваш пароль'
          />
        </div>

        <div className='authorisation-buttons-container'>
          <button
            className='authorisation-next-button'
            onClick={this.login.bind(this)}
            disabled={this.is_wrong()}>
            Войти
          </button>
          <div
            className='authorisation-change-display'
            onClick={() => this.props.change_display("register")}>
            Нет аккаунта? Создайте его!
          </div>
        </div>
      </div>
    );
  }
}
