import { contact_type } from "types";
import { ReactComponent as Delete } from "../svg/delete.svg";
import { ReactComponent as Edit } from "../svg/edit.svg";
type props_type = {
  contact: contact_type;
};

export const Contact = (props: props_type) => {
  const { contact } = props;

  const copy = () => {
    navigator.clipboard.writeText(contact.number);
    alert(`Вы скопировали номер +${contact.number}`);
  };

  return (
    <div className='contact-field' onClick={copy}>
      <div className='contact-info-container'>
        <div className='contact-name'>{contact.name}</div>
        <div className='contact-number'>(+{contact.number})</div>
      </div>
      <div className='contact-buttons-container'>
        <Delete className='contact-button delete-button' />
        <Edit className='contact-button edit-button' />
      </div>
    </div>
  );
};
