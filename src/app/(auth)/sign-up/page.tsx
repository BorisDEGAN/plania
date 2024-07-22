"use client";

import React from "react";
import Link from "next/link";
import InputText from "@/components/Form/InputText";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import InputPassword from "@/components/Form/InputPassword";
import * as Yup from "yup";
import authApi from "@/services/auth.service";
import useToast from "@/shared/helpers/useToast";
import useCookie from "@/shared/helpers/useCookie";
import { useRouter } from "next-nprogress-bar";
import { authUserSelector } from "@/stores/useUserStore";
import { useSetRecoilState } from "recoil";

const SignUp: React.FC = () => {

  const [loading, setLoading] = React.useState(false)

  const { toastSuccess } = useToast()

  const setAuthUser = useSetRecoilState(authUserSelector);

  const { setCookie } = useCookie()

  const router = useRouter()

  const [credentials] = React.useState({
    firstname: 'azobo',
    lastname: 'azobo',
    email: 'azobo@yopmail.fr',
    password: 'password',
    password_confirmation: 'password',
  })

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: credentials,
    validationSchema: Yup.object({
      firstname: Yup.string().required("Prénom requis"),
      lastname: Yup.string().required("Nom requis"),
      email: Yup.string().email("Email invalide").required("Email requis"),
      password: Yup.string().required("Mot de passe requis"),
      password_confirmation: Yup.string().required("Confirmation mot de passe requis").oneOf([Yup.ref("password"), null], "Les mots de passe ne sont pas identiques"),
    }),
    onSubmit: (values) => {
      setLoading(true)

      authApi().signUp(values).then((response: any) => {
        toastSuccess(response.message)

        authApi().signIn({email: values.email, password: values.password}).then((response: any) => {
          toastSuccess(response.message)

          setCookie("auth_token", response.data.token)

          setAuthUser(response.data.user)

          router.push("/")
        })

      }).finally(() => setLoading(false))
    }
  })

  return (
    <div className="w-full flex flex-col">
      <h2 className="mb-9 text-2xl text-center font-bold text-black dark:text-white sm:text-title-xl2">
        Inscrivez-vous sur Plania
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <InputText name="firstname" label="Prénom" placeholder="Prénom" value={values.firstname} onChange={handleChange} errors={errors} required />

        <InputText name="lastname" label="Nom" placeholder="Nom" value={values.lastname} onChange={handleChange} errors={errors} required />

        <InputText name="email" label="Email" placeholder="Email" value={values.email} onChange={handleChange} errors={errors} required />

        <InputPassword name="password" label="Mot de passe" placeholder="Mot de passe" value={values.password} onChange={handleChange} errors={errors} required />

        <InputPassword name="password_confirmation" label="Confirmer mot de passe" placeholder="Confirmer mot de passe" value={values.password_confirmation} onChange={handleChange} errors={errors} required />

        <Button type="submit" variant="default" className="w-full" loading={loading}>
          Créer un compte
        </Button>

        <div className="text-center">
          <p>
            Vous avez deja un compte ?{" "}
            <Link href="/sign-in" className="text-primary">
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
