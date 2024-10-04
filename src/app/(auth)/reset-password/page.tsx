"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import useToast from "@/shared/helpers/useToast";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import authApi from "@/services/auth.service";
import InputPassword from "@/components/Form/InputPassword";

const ResetPassword: React.FC = () => {

  const [loading, setLoading] = React.useState(false)

  const { resetPassword } = authApi()

  const router = useRouter()

  const params = useSearchParams()

  const { toastSuccess } = useToast()

  const [credentials] = React.useState({
    email: "",
    password: "",
    password_confirmation: "",
    token: "",
  })

  const { handleChange, errors, handleSubmit, values, setFieldValue } = useFormik({
    initialValues: credentials,
    validationSchema: Yup.object({
      email: Yup.string().email("Email invalide").required("Email requis"),
      token: Yup.string().required("Token requis"),
      password: Yup.string().required("Mot de passe requis"),
      password_confirmation: Yup.string().required("Confirmation mot de passe requis").oneOf([Yup.ref("password"), null], "Les mots de passe ne sont pas identiques"),
    }),
    onSubmit: (values) => {
      setLoading(true)
      resetPassword(values).then((response: any) => {
        toastSuccess(response.message)
        router.push("/sign-in")
      }).finally(() => setLoading(false))
    }
  })

  React.useEffect(() => {
    const token = String(params.get("token"));
    const email = String(params.get("email"));
    if (token && email) {
      setFieldValue("token", token, false)
      setFieldValue("email", email, false)
    }
  }, [])

  return (
    <div className="flex flex-col w-full">
      <h2 className="mb-9 text-2xl text-center font-bold text-black dark:text-white sm:text-title-xl2">
        Réinitialiser mot de passe
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <InputPassword label="Mot de passe" name="password" placeholder="Mot de passe" value={values.password} onChange={handleChange} errors={errors.password} required />

        <InputPassword label="Confirmer mot de passe" name="password_confirmation" placeholder="Confirmer mot de passe" value={values.password_confirmation} onChange={handleChange} errors={errors.password_confirmation} required />

        <Button type="submit" onClick={() => handleSubmit()} variant="default" className="w-full" loading={loading}>
          Réinitialiser
        </Button>

        <div className="flex items-center justify-centerw-full space-x-4">
          <div className="h-[1px] w-full bg-slate-300" />
          <span>ou</span>
          <div className="h-[1px] w-full bg-slate-300" />
        </div>

        <div className="text-center">
          <Link href="/sign-in" className="text-primary">
            Se connecter
          </Link>
        </div>
      </form>
    </div>
  );
};

export default function ResetPasswordWrapper() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}