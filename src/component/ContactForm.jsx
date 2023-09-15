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

const optionss = [
    {
        value: '',
        label: '-- Select Profession--',
    },
    {
        value: 'Working Professional',
        label: 'Working Professional',
    },
    {
        value: 'College Student',
        label: 'College Student',
    },
    {
        value: 'Dropper or School Student',
        label: 'Dropper or School Student',
    },
]

const optionsss = [
    {
        value: '',
        label: '-- Select Option--',
    },
    {
        value: 'Every Sunday & All the Programs',
        label: 'Every Sunday & All the Programs',
    },
    {
        value: 'Only about Functions',
        label: 'Only about Functions',
    },
]

function ContactForm() {

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [prof , setProf] = useState("");
    const [chanting, setChanting] = useState("");
    const [rem,setRem] = useState("");
    const [numberExists, setNumberExists] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const selectOptions = options.map(({ value, label }, idx) => (
        <option key={idx} value={value}> {label}</option>
    ))
    
    const selectOptionss = optionss.map(({ value, label }, idx) => (
        <option key={idx} value={value}> {label}</option>
    ))

    const selectOptionsss = optionsss.map(({ value, label }, idx) => (
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
                prof: prof,
                chanting: chanting,
                rem: rem,
            }
            await setDoc(docRef, data);

        } catch (err) {
            console.error(err);
            alert(err.message);
        }
        setName("");
        setPhoneNumber("");
        setLocation("");
        setProf("");
        setChanting("");
        setRem("");
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
                    <div className="tel">
                        <input
                            type='tel'
                            id='phoneNumber'
                            name='phoneNumber'
                            placeholder='Enter number here...'
                            value={phoneNumber}
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <button onClick={doesNumberExist} className="buttone">Exists?</button>
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

                <div>
                    <label htmlFor='Prof'>Profession</label> <br />
                    <select name='prof' required value={prof} onChange={(e) => setProf(e.target.value)} id='prof'>
                        {selectOptionss}
                    </select>
                </div>
                
                <div>
                    <label htmlFor='Chanting'>Chanting Rounds: </label><br />
                    <input
                        type='text'
                        id='Chanting'
                        name='Chanting'
                        placeholder='Enter rounds of chanting..'
                        value={chanting}
                        required
                        onChange={(e) => setChanting(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='rem'>Would you like to be reminded about functions at Iskcon Temple?</label> <br />
                    <select name='rem' required value={rem} onChange={(e) => setRem(e.target.value)} id='rem'>
                        {selectOptionsss}
                    </select>
                </div>

                <input type="submit" className="button" />
            </form>

        </div>
    )
}

export default ContactForm
