import { useParams } from "react-router-dom";


function ContactDetail() {
  const { name } = useParams();


  return (
    <div style={{ padding: "20px" }}>
      <h2>Contact Details</h2>
      <p>Contact Name: {name}</p>
      {/* You can fetch or filter contacts using this name */}
    </div>
  );
}


export default ContactDetail;
