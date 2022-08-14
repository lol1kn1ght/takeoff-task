export type user_type = {
  id: number | null;
  username: number | null;
  password: string | null;
  contacts: contact_type[] | null;
};

export type contact_type = {
  id: number;
  name: string;
  number: string;
};

export type display_type = "login" | "register";
