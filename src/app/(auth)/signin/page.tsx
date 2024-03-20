"use client";

import React from "react";
import Link from "next/link";
import InputText from "@/components/Form/InputText";
import InputPassword from "@/components/Form/InputPassword";
import { useFormik } from "formik";
import * as Yup from "yup";
import authApi from "@/services/auth.service";
import useToast from "@/shared/helpers/useToast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SignIn: React.FC = () => {

  const [credentials] = React.useState({
    email: "",
    password: "",
  })

  const [loading, setLoading] = React.useState(false)

  const { signIn } = authApi()

  const router = useRouter()

  const { toastSuccess } = useToast()

  const { handleChange, errors, handleSubmit, values } = useFormik({
    initialValues: credentials,
    validationSchema: Yup.object({
      email: Yup.string().email("Email invalide").required("Email requis"),
      password: Yup.string().required("Mot de passe requis"),
    }),
    onSubmit: (values) => {
      console.log(values)
      setLoading(true)
      signIn(values).then((response) => {
        toastSuccess(response.message)
        router.push("/")
      }).finally(() => setLoading(false))
    }
  })


  return (
    <div className="flex flex-col w-full">
      <h2 className="mb-9 text-2xl text-center font-bold text-black dark:text-white sm:text-title-xl2">
        Se connecter à Plania
      </h2>
      {loading}
      <form onSubmit={handleSubmit} className="space-y-4">

        <InputText label="Email" name="email" placeholder="Email" value={values.email} onChange={handleChange} errors={errors.email} required />

        <InputPassword label="Mot de passe" name="password" placeholder="Mot de passe" value={values.password} onChange={handleChange} errors={errors.password} required />

        <Button type="submit" variant="default" className="w-full" loading={loading} disabled={loading}>
          Se connecter
        </Button>

        <div className="text-center">
          <p>
            Pas encore de compte ?{" "}
            <Link href="/signup" className="text-primary">
              Creer un compte
            </Link>
          </p>
        </div>
      </form>

      <Button type="submit" variant="default" className="w-full" loading={loading} disabled={loading}>
        Modal
      </Button>
    </div>
  );
};

export default SignIn;
