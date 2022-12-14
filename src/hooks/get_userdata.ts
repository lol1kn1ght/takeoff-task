import { Use_app_selector } from "./redux-hooks";

export function get_userdata() {
  const { contacts, id, password, username } = Use_app_selector(
    (state) => state.user
  );

  return {
    id,
    is_auth: !!id,
    contacts,
    password,
    username,
  };
}
