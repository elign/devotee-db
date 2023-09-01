import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

function Contacts() {
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.displayName);
        }
        if (loading) return;
        if (!user) return navigate("/");
    }, [user, loading]);

    useEffect(() => {
        async function fetchData() {
            const querySnapshot = await getDocs(collection(db, "devotee"));
            const tempArray = [];
            querySnapshot.forEach((doc) => {
                tempArray.push(doc.data())
            });
            setContacts(tempArray);
        }
        fetchData();
    }, [])

    return (
        <div className="dashboard">
            <table>
                <tr>
                    <th>Sr.No.</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Number</th>
                </tr>
                {
                    contacts.map((val, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.location}</td>
                                <td><a style={{textDecoration: "none"}} href={`tel:${val.phoneNumber}`}><button className="button">Call Now</button></a></td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default Contacts
