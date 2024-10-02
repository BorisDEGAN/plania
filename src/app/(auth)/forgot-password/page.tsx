"use client";

import React from "react";
import Link from "next/link";
import InputText from "@/components/Form/InputText";
import { useFormik } from "formik";
import * as Yup from "yup";
import useToast from "@/shared/helpers/useToast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import authApi from "@/services/auth.service";

const ForgotPassword: React.FC = () => {

  const [credentials] = React.useState({
    email: "",
  })

  const [loading, setLoading] = React.useState(false)

  const { forgotPassword } = authApi()

  const router = useRouter()

  const { toastSuccess } = useToast()

  const { handleChange, errors, handleSubmit, values } = useFormik({
    initialValues: credentials,
    validationSchema: Yup.object({
      email: Yup.string().email("Email invalide").required("Email requis"),
    }),
    onSubmit: (values) => {
      setLoading(true)
      forgotPassword(values).then((response: any) => {
        toastSuccess(response.message)
        router.push("/sign-in")
      }).finally(() => setLoading(false))
    }
  })


  return (
    <div className="flex flex-col w-full">
      <h2 className="mb-9 text-2xl text-center font-bold text-black dark:text-white sm:text-title-xl2">
        Mot de passe oublié
      </h2>
      {loading}
      <form onSubmit={handleSubmit} className="space-y-4">

        <InputText label="Email" name="email" placeholder="Email" value={values.email} onChange={handleChange} errors={errors.email} required />

        <Button type="submit" onClick={() => handleSubmit()} variant="default" className="w-full" loading={loading}>
          Envoyer
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

export default ForgotPassword;
