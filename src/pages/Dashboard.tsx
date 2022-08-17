import { get_userdata } from "hooks/get_userdata";
import { Navigate } from "react-router-dom";
import "css/Dashboard.css";
import { Contact } from "components/Contact";
import { contact_type } from "types";
import { useState } from "react";
import { Use_app_dispatch } from "hooks/redux-hooks";
import { set_user } from "store/slices/user_slice";
import axios from "axios";

export const Dashboard = () => {
  const dispatch = Use_app_dispatch();
  const user_data = get_userdata();
  const { contacts, is_auth } = user_data;

  const [contacts_arr, setContacts] = useState(contacts);
  if (!is_auth) return <Navigate to={"/"} />;

  const contacts_fields = [];

  const create_contact = async () => {
    if (!contacts) return;
    const new_contacts = [
      {
        id: new Date().getTime(),
        name: "",
        number: "",
      },
      ...contacts,
    ];

    setContacts(new_contacts);
  };

  const edit_contact = async (contact: contact_type) => {
    if (!contacts_arr) return;

    const arr_contact = contacts_arr.filter((c) => contact.id === c.id)[0];

    if (!arr_contact) return;

    const new_contact: contact_type = { ...arr_contact, ...contact };

    const contacts_copy = [...contacts_arr];
    contacts_copy[contacts_arr.indexOf(arr_contact)] = new_contact;

    dispatch(
      set_user({
        ...user_data,
        contacts: contacts_copy,
      })
    );

    await axios.patch(`http://localhost:3001/users/${user_data.id}`, {
      contacts: contacts_copy,
    });

    setContacts(contacts_copy);
  };

  const delete_contact = async (contact: contact_type) => {
    if (!contacts) return;
    const new_contacts = contacts.filter((c) => contact.id !== c.id);

    dispatch(
      set_user({
        ...user_data,
        contacts: new_contacts,
      })
    );

    await axios.patch(`http://localhost:3001/users/${user_data.id}`, {
      contacts: new_contacts,
    });

    setContacts(new_contacts);
  };

  if (!contacts_arr || !contacts_arr[0])
    contacts_fields.push(<div key={0}>У вас нет контактов :(</div>);

  if (contacts_arr) {
    for (const contact of contacts_arr) {
      contacts_fields.push(
        <Contact
          contact={contact}
          edit_contact={edit_contact}
          delete_contact={delete_contact}
          key={contact.id}
        />
      );
    }
  }
  return (
    <div className='dashboard-container'>
      <div className='dashboard-title-container'>
        <div>Ваш список контактов:</div>
        <button
          className='dashboard-button create-button'
          onClick={create_contact}>
          Создать контакт
        </button>
      </div>

      <div className='dashboard-contancts-container'>{contacts_fields}</div>
    </div>
  );
};
