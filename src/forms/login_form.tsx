import axios from "axios";
import { loading_plate } from "components/Loading";
import { Use_app_dispatch } from "hooks/redux-hooks";
import { useState } from "react";
import { set_user } from "store/slices/user_slice";
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
  user_data?: user_type;
};

type elem_name_type = "username" | "password";

type props_type = {
  change_display: (display: display_type) => void;
};

export const LoginForm = (props: props_type) => {
  const dispatch = Use_app_dispatch();

  const [loading, set_loading] = useState(false);
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [error, set_error] = useState("");

  const login = async () => {
    if (!username || !password)
      return set_error("Вы не заполнили необходимые поля!");

    set_loading(true);

    const request_link = `http://localhost:3001/users?username=${username}&password=${password}`;
    const login_response = await axios.get(request_link);

    const user_data = (login_response.data as user_type[] | undefined[])[0];

    if (!user_data) {
      set_error("Юзернейм или пароль неверный");
      set_loading(false);
      return;
    }

    dispatch(set_user(user_data));
    set_loading(false);
  };

  const is_wrong = () => {
    let is_wrong = true;

    if (!password || !username) is_wrong = true;
    else is_wrong = false;
    return is_wrong;
  };

  if (loading) return <>{loading_plate}</>;

  return (
    <div className='authorisation-container'>
      <div className='authorisation-title-container'>
        <div>Авторизация</div>
      </div>

      <div className='authorisation-forms-container'>
        <input
          type='text'
          name='username'
          onChange={(e) => {
            set_username(e.target.value);
            set_error("");
          }}
          placeholder='Введите ваш юзернейм'
          value={username}
        />
        <input
          type='password'
          name='password'
          onChange={(e) => {
            set_password(e.target.value);
            set_error("");
          }}
          placeholder='Введите ваш пароль'
          value={password}
        />

        <div className='authorisation-error-message'>{error}</div>
      </div>

      <div className='authorisation-buttons-container'>
        <button
          className='authorisation-next-button'
          onClick={login}
          disabled={is_wrong()}>
          Войти
        </button>
        <div
          className='authorisation-change-display'
          onClick={() => props.change_display("register")}>
          Нет аккаунта? Создайте его!
        </div>
      </div>
    </div>
  );
};
