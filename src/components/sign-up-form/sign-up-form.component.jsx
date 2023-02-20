import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form-styles.scss';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
}
from "../../utils/firebase/firebase.utils";

const defaultFormValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormField] = useState(defaultFormValues)
  const { displayName, email, password, confirmPassword } = formFields;

  console.log("Inputs: ",formFields)

  const resetFormFields = () => {
    setFormField(defaultFormValues)
  }

  const handlerChange = (event) => {
    const { name, value } = event.target;
      setFormField( {...formFields, [name]:value } )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

      if(password !== confirmPassword){
        alert("paswords do not match");
        return;
      }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, {displayName});
      alert('User created')
      resetFormFields();
    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use')
      }else{
        console.log("Error in user creation: ", error)
      }
    }

  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up width your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type='text'
          required
          onChange={handlerChange}
          name='displayName'
          value={displayName}
        />

         <FormInput
          label="Email"
          type="email"
          onChange={handlerChange}
          value={email}
          name="email"
          required
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handlerChange}
          value={password}
          name="password"
          required
        />
        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handlerChange}
          value={confirmPassword}
          name="confirmPassword"
          required
        />


        <Button
          // buttonType='google'
          type="submit"
        >Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;