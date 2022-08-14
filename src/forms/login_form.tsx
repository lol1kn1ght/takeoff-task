import axios from "axios";
import { loading_plate } from "components/Loading";
import { Component, FormEvent, ReactNode } from "react";
import { display_type, user_type } from "types";

type field_type = {
  value?: string;
  wrong?: boolean;
};

type state_type = {
  username: field_type;
  password: field_type;
  loading: false;
  error_message?: string;
};

type elem_name_type = "username" | "password";

type props_type = {
  change_display: (display: display_type) => void;
};

export class LoginForm extends Component<props_type> {
  state: state_type = {
    password: {},
    username: {},
    loading: false,
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
    this.setState({
      loading: true,
    });
    const { password, username } = this.state;

    const request_link = `http://localhost:3001/users?username=${username.value}&password=${password.value}`;
    const test_response = await axios.get(request_link);

    const user_data = (test_response.data as user_type[] | undefined[])[0];

    if (!user_data) {
      this.setState({
        error_message: "Вы указали некорректные данные! Попробуйте еще",
        loading: false,
        password: {
          wrong: true,
        },
        username: {
          wrong: true,
        },
      });
    }
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
    if (this.state.loading)
      return <div className='authorisation-container'>{loading_plate}</div>;
    return (
      <div className='authorisation-container'>
        <div className='authorisation-title-container'>
          <div>Авторизация</div>
        </div>

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
          {this.state.error_message ? (
            <div className='authorisation-error-message'>
              {this.state.error_message}
            </div>
          ) : undefined}
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
