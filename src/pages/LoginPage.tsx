// pages/LoginPage.tsx
import { useState } from "react";
// import jwt_decode from "jwt-decode";
// import {jwt_decode} from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { useLogin } from "../hooks/useAuthHook";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const { login: storeToken } = useAuth();
  const { mutate, isPending, isError, error } = useLogin();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setFormError("Username and password are required");
      return;
    }

    // mutate(form, {
    //   onSuccess: (data) => {
    //     storeToken(data.token);
    //     navigate("/dashboard"); // Redirect after login
    //   },
    //   onError: () => {
    //     setFormError("Invalid credentials");
    //   },
    // });
    mutate(form, {
      onSuccess: (data) => {
        console.log("Login successful:", data.token);
        if (!data?.token) {
          setFormError("Invalid response from server");
          return;
        }

        // Decode JWT to get userId from 'sub'
        type JwtPayload = { sub: number; user: string; iat: number };
        // const decoded = jwt_decode<JwtPayload>(data.token);
        const decoded = jwtDecode<JwtPayload>(data.token);
        const userId = decoded.sub;

        storeToken(data.token, userId) // ✅ Pass userId
        navigate("/dashboard");
          // .then(() => navigate("/dashboard"))
          // .catch(() => setFormError("Failed to initialize session"));
      },
      onError: (err) => {
        setFormError("Invalid credentials");
        console.log("Login failed", err);
      },
    });
    console.log("Form submitted:", form);
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-6">
      <h2 className="text-xl font-bold text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
      {formError && (
        <p className="text-red-500 text-sm text-center">{formError}</p>
      )}
    </div>
  );
};

export default LoginPage;
// import { useState } from "react";
// import { useLogin } from "../hooks/useAuthHook";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const LoginPage = () => {
//   const { login: storeToken } = useAuth();
//   const { mutate, isPending } = useLogin();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ username: "", password: "" });
//   const [formError, setFormError] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError(""); // Clear previous errors

//     const { username, password } = form;

//     if (!username || !password) {
//       setFormError("Username and password are required");
//       return;
//     }

//     mutate(form, {
//       onSuccess: (data) => {
//         if (!data?.token || !data?.user?.id) {
//           setFormError("Invalid response from server");
//           return;
//         }

//         storeToken(data.token, data.user.id)
//           .then(() => navigate("/dashboard"))
//           .catch(() => setFormError("Failed to initialize session"));
//       },
//       onError: (err: any) => {
//         const message =
//           err?.response?.data?.message || "Invalid credentials or server error";
//         setFormError(message);
//       },
//     });
//   };

//   return (
//     <div className="max-w-sm mx-auto mt-20 space-y-6">
//       <h2 className="text-xl font-bold text-center">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input
//           placeholder="Username"
//           value={form.username}
//           onChange={(e) => setForm({ ...form, username: e.target.value })}
//         />
//         <Input
//           placeholder="Password"
//           type="password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <Button type="submit" disabled={isPending} className="w-full">
//           {isPending ? "Logging in..." : "Login"}
//         </Button>
//       </form>
//       {formError && (
//         <p className="text-red-500 text-sm text-center">{formError}</p>
//       )}
//     </div>
//   );
// };

// export default LoginPage;
