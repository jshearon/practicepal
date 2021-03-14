import React, { useState, createRef } from "react"
import { Link } from "react-router-dom"
import "./Auth.scss"

export const Register = (props) => {

  const passwordDialog = createRef()

  const initialFormData = Object.freeze({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    profileImage: "",
  });

  const [formData, setFormData] = useState(initialFormData);
  const [formImg, setFormImg] = useState();
  const [previewImg, setPreviewImg] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleImg = (e) => {
    setFormImg(e.target.files[0])
    setPreviewImg(URL.createObjectURL(e.target.files[0]))
  }

  const handleRegister = (e) => {
      e.preventDefault()

      const formEnc  = new FormData();

      for(const key in formData) {
        formEnc.append(key, formData[key]);
      }

      formEnc.append('profileImage', formImg)

          return fetch("http://127.0.0.1:8000/register", {
              method: "POST",
              body: formEnc
          })
              .then(res => res.json())
              .then(res => {
                  if ("token" in res) {
                      localStorage.setItem("pp_token", res.token)
                      props.history.push("/")
                  }
              })
  }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={handleChange} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={handleChange} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input onChange={handleChange} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input onChange={handleChange} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input onChange={handleChange} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="profileImage"> Profile Image </label>
                    <input type="file" id="profileImage" name="profileImage" onChange={handleImg} />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <img id="target" src={previewImg} alt="target for profile pic" />
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
