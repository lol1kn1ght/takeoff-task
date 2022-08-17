import { useState } from "react";
import { contact_type } from "types";
import { ReactComponent as Delete } from "../svg/delete.svg";
import { ReactComponent as Edit } from "../svg/edit.svg";
import { ReactComponent as Save } from "../svg/save.svg";

type contact_functions = (contact: contact_type) => void;
type props_type = {
  contact: contact_type;
  delete_contact: contact_functions;
  edit_contact: contact_functions;
};

type mod_type = "edit" | "default";

export const Contact = (props: props_type) => {
  const { contact } = props;

  const [mode, setMode] = useState<mod_type>("default");
  const [new_name, set_new_name] = useState(contact.name);
  const [new_number, set_new_number] = useState(contact.number);

  const copy = () => {
    navigator.clipboard.writeText(contact.number);
    alert(`Вы скопировали номер +${contact.number}`);
  };

  const delete_contact = () => {
    const accept = window.confirm(
      `Вы точно хотите удалить контакт ${contact.name} (${contact.number}) ?`
    );

    if (accept) props.delete_contact(contact);
  };

  const change_mode = () => {
    if (mode === "default") setMode("edit");
    else {
      setMode("default");
      set_new_name(contact.name);
      set_new_number(contact.number);
    }
  };

  if (!new_name && !new_number && mode !== "edit") setMode("edit");

  const name_plate =
    mode === "edit" ? (
      <input
        type='text'
        placeholder='Новое имя'
        name='edit_name'
        autoComplete='off'
        className='edit-field'
        value={new_name}
        onChange={(e) => set_new_name(e.target.value)}
      />
    ) : (
      <div className='contact-name' onClick={copy}>
        {contact.name}
      </div>
    );

  const number_plate =
    mode === "edit" ? (
      <input
        type='tel'
        placeholder='Новый номер'
        name='edit_number'
        className='edit-field'
        value={new_number}
        onChange={(e) => set_new_number(e.target.value)}
      />
    ) : (
      <div className='contact-number' onClick={copy}>
        (+{contact.number})
      </div>
    );

  const save = () => {
    if (!new_name || !new_number) {
      set_new_name(contact.name);
      set_new_number(contact.number);
      setMode("default");
      return;
    }

    props.edit_contact({
      ...contact,
      name: new_name,
      number: new_number,
    });

    setMode("default");
  };

  const is_edit = mode === "edit" && new_number && new_name;

  return (
    <div className='contact-field'>
      <div className='contact-info-container'>
        {name_plate}
        {number_plate}
      </div>
      <div className='contact-buttons-container'>
        {is_edit ? (
          <Save onClick={save} className='contact-button save-button' />
        ) : undefined}
        <Delete
          className='contact-button delete-button'
          onClick={delete_contact}
        />
        <Edit className='contact-button edit-button' onClick={change_mode} />
      </div>
    </div>
  );
};
