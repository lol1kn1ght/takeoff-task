import { get_userdata } from "hooks/get_userdata";
import { Navigate } from "react-router-dom";
import "css/Dashboard.css";
import { Contact } from "components/Contact";

export const Dashboard = () => {
  const { is_auth, contacts } = get_userdata();
  if (!is_auth) return <Navigate to={"/"} />;

  const contacts_fields = [];

  if (!contacts || !contacts[0])
    contacts_fields.push(
      <div className='contact-field' key={0}>
        Ваш список контактов пуст :(
      </div>
    );

  if (contacts) {
    for (const contact of contacts) {
      contacts_fields.push(<Contact contact={contact} />);
    }
  }
  return (
    <div className='dashboard-container'>
      <div className='dashboard-title-container'>
        <div>Ваш список контактов:</div>
        <button className='dashboard-button create-button'>
          Создать контакт
        </button>
      </div>

      <div className='dashboard-contancts-container'>{contacts_fields}</div>
    </div>
  );
};
