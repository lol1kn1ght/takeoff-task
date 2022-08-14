import { Use_app_selector } from "./redux-hooks";

export function get_auth() {
  const { contacts, id, password, username } = Use_app_selector(
    (state) => state.user
  );

  return {
    is_auth: !!id,
    contacts,
    password,
    username,
  };
}
