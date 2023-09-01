import { useState } from "react"
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../firebase'


const options = [
    {
        value: '',
        label: '-- Select Location--',
    },
    {
        value: 'Talwandi',
        label: 'Talwandi',
    },
    {
        value: 'Shrinath Puram',
        label: 'Shrinath Puram',
    },
    {
        value: 'Mahaveer nagar 1st, 2nd, 3rd, vistar',
        label: 'Mahaveer nagar 1st, 2nd, 3rd, vistar',
    },
    {
        value: 'Keshavpura',
        label: 'Keshavpura',
    },
    {
        value: 'Bajrang Nagar',
        label: 'Bajrang Nagar',
    },
    {
        value: 'Other',
        label: 'Other',
    },
]

function ContactForm() {

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [numberExists, setNumberExists] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const selectOptions = options.map(({ value, label }, idx) => (
        <option key={idx} value={value}> {label}</option>
    ))

    const submit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "devotee", phoneNumber);
            const data = {
                name: name,
                phoneNumber: phoneNumber,
                location: location,
            }
            await setDoc(docRef, data);

        } catch (err) {
            console.error(err);
            alert(err.message);
        }
        setName("");
        setPhoneNumber("");
        setLocation("");
    }

    const doesNumberExist = async (e) => {
        e.preventDefault();
        const docRef = doc(db, "devotee", phoneNumber);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setNumberExists(true);
        } else {
            setNumberExists(false);
        }
        setIsAlertVisible(true);
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 3000);
    }

    return (
        <div>
            <form className="form">
                {isAlertVisible && (
                    numberExists ?
                        <div>
                            <strong style={{ color: "green" }}>Number Exist!</strong>
                        </div> :
                        <div>
                            <strong style={{ color: "red" }}>Number Does Not Exist!</strong>
                        </div>
                    )
                }
                <div>
                    <label htmlFor='Name'>Number: </label><br />
                    <div className="number-field">
                        <input
                            type='tel'
                            id='phoneNumber'
                            name='phoneNumber'
                            placeholder='Enter number here...'
                            value={phoneNumber}
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <button onClick={doesNumberExist} className="button">Exists?</button>
                    </div>
                </div>
            </form>
            <form onSubmit={submit} className="form">

                <div><label htmlFor='Name'>Name: </label><br />
                    <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        placeholder='Name'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='Location'>Location</label> <br />
                    <select name='location' required value={location} onChange={(e) => setLocation(e.target.value)} id='location'>
                        {selectOptions}
                    </select>

                </div>
                <input type="submit" className="button" />
            </form>

        </div>
    )
}

export default ContactForm
