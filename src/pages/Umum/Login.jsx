import { useState } from "react";
import { postLogin } from "../../services/authentication.service";
import Modal from "../../components/Modal";
import Cookies from "js-cookie";

function Login() {
  const [messageValidationField, setMessageValidationField] = useState({});
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  // console.log(JSON.parse(Cookies.get("user")));

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value || null;
    const password = e.target.password.value || null;

    const data = {
      email,
      password,
    };


    postLogin(
      (dataAuth) => {
        console.log(dataAuth);
        setMessageAlert("Berhasil Login");
        setShowModalAlert(true);
        Cookies.set("user", JSON.stringify(dataAuth), {
          expires: 1,
          secure: true,
        });
      },
      (errors) => {
        console.log("masuk");
        if (typeof errors == "object") {
          setMessageValidationField(errors);
        } else if (typeof errors == "string") {
          setMessageAlert(errors);
          setShowModalAlert(true);
        }
      },
      data
    );
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            className='w-full p-1 my-1 border-2 border-slate-300 rounded-md' 
            placeholder='Email'/>
            <span className="text-red-500">{messageValidationField?.Email}</span>
        </div>
        <div>
        <input
            type="password"
            name="password"
            className='w-full p-1 my-1 border-2 border-slate-300 rounded-md' 
            placeholder='Password'/>
            <span className="text-red-500">{messageValidationField?.Password}</span>
        </div>
        <button className="w-full p-1 my-1 bg-[#B0C5A4] rounded-md px-2 text-white hover:bg-[#8ea67f]">Login</button>
      </form>
      <div className="w-full text-center">
        <p>Belum punya akun? <a className="text-blue-700" href="/register">Daftar disini</a></p>
      </div>
      <Modal
        onClose={() => {
          setShowModalAlert(false);
          location.reload();
        }}
        visible={showModalAlert}
        title="Pemberitahuan"
      >
        {messageAlert}
      </Modal>
    </div>
  );
}

export default Login;
