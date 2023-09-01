import { logout, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ContactForm from "../component/ContactForm";
function Dashboard() {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.displayName);
    }
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <div className="dashboard">
      <p className="logout" onClick={logout}>Hi {name} wanna Logout?</p>
      <ContactForm />
    </div>
  )
}

export default Dashboard
