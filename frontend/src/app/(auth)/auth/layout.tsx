import { AuthLayout } from "@/components/layouts/AuthLayout";
import React from "react";

const AuthMainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default AuthMainLayout;
