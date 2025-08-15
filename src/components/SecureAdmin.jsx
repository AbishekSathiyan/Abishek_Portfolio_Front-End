import React, { useState } from "react";
import AdminPage from "./AdminPage";   // neenga already use panra admin UI
import AdminAuth from "./AdminAuth";   // OTP verify component

const SecureAdmin = () => {
  const [isVerified, setIsVerified] = useState(false);

  // ✅ If OTP verify aana, AdminPage show pannum
  // ❌ Illa na, OTP page show pannum
  return isVerified ? (
    <AdminPage />
  ) : (
    <AdminAuth onSuccess={() => setIsVerified(true)} />
  );
};

export default SecureAdmin;
