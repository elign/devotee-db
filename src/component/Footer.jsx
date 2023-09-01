import SocialShare from "./SocialShare";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
export default function Footer() {
  const { user } = useContext(UserContext);

  return (
    <>
      {/*Footer container*/}
      <footer className=" border-t-2 border-gray-500 mt-10 flex flex-col items-center gap-4 lg:flex-row lg:gap-0 justify-center lg:justify-between text-center bg-black"
      >
        <div></div>
        <img className="w-1/3 lg:w-1/6" src="https://www.pngkey.com/png/full/248-2486695_iskcon-of-richmond-lotous-feet-of-radha-krishna.png" />
        {/*Copyright section*/}
        <div className="flex gap-3">
          <a className="hover:text-gray-400 duration-300" href="tel:+918778034315" >+91 87780 34315</a>
          <a className="hover:text-gray-400 duration-300" href="mailto:kyrospictures.com" >kyrospictures@gmail.com</a>
        </div>
        <SocialShare />


        <a className="text-whitehite" href="https://kyrospictures.com/">
          © 2023 Copyright :
          {" "} ISKCON Kota
        </a>
        <div>{user ? user.name : ""}</div>
      </footer>
    </>
  );
}