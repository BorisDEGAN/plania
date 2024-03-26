"use client";

import React from "react";
import Link from "next/link";
import InputText from "@/components/Form/InputText";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import InputPassword from "@/components/Form/InputPassword";

const SignUp: React.FC = () => {

  const [credentials] = React.useState({
    fullname: '',
    email: '',
    password: '',
    password_comfirmation: '',
  })

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: credentials,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <div className="w-full flex flex-col">
      <h2 className="mb-9 text-2xl text-center font-bold text-black dark:text-white sm:text-title-xl2">
        Inscrivez-vous à Plania
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <InputText name="fullname" label="Nom complet" placeholder="Nom complet" value={values.fullname} onChange={handleChange} required />

        <InputText name="email" label="Email" placeholder="Email" value={values.email} onChange={handleChange} required />

        <InputPassword name="password" label="Mot de passe" placeholder="Mot de passe" value={values.password} onChange={handleChange} required />

        <InputPassword name="password_comfirmation" label="Confirmer mot de passe" placeholder="Confirmer mot de passe" value={values.password_comfirmation} onChange={handleChange} required />

        <Button type="submit" variant="default" className="w-full">
          Créer un compte
        </Button>

        <div className="text-center">
          <p>
            Already have an account ?{" "}
            <Link href="/sign-in" className="text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
