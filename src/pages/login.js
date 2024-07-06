import React, { useEffect } from "react";
import { useRouter } from "next/router";

import SEO from "@components/seo";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import LoginArea from "@components/login-register/login-area";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticate = localStorage.getItem("auth");
    if (isAuthenticate) {
      router.push("/user-dashboard");
    }
  }, [router]);
  return (
    <Wrapper>
      <SEO pageTitle={"Login"} />
      <Header style_2={true} />
      <LoginArea/>
      <Footer/>
    </Wrapper>
  );
}
 