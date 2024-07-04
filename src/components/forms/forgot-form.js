import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// internal
import Email from "@svg/email";
import { useResetPasswordMutation } from "src/redux/features/auth/authApi";
import ErrorMessage from "@components/error-message/error";
import { notifyError, notifySuccess } from "@utils/toast";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";

const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const ForgotForm = () => {
  const [loading, setloading] = useState(false);
  const [resetPassword, { }] = useResetPasswordMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit = (data) => {
    setloading(true)
    resetPassword({
      verifyEmail: data.email,
    }).then((result) => {
      console.log(result);
      if (result?.error) {
        setloading(false)
        notifyError(result?.error?.data?.message)
      }
      else {
        setloading(false)
        notifySuccess(result.data?.message);
      }
    });
    reset();
  };
  return (
    <>
      {
        loading == true && <LoadingSpinner />
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login__input-wrapper">
          <div className="login__input-item">
            <div className="login__input">
              <input {...register("email")} type="email" placeholder="Email" />
              <span>
                <Email />
              </span>
            </div>
            <ErrorMessage message={errors.email?.message} />
          </div>
        </div>
        <div className="login__btn">
          <button type="submit" className="tp-btn w-100">
            Send Request
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgotForm;
