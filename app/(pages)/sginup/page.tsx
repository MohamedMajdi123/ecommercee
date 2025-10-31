"use client";
import { useState } from "react";
import { setCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const res = await fetch("/api/createuser", { // تأكد من أن تشير إلى /api/signup
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password, resetPassword }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("User created successfully!");
      setCookie("token", data.token);
      setCookie("user", JSON.stringify(data.userData));
      router.push("/");
    } else {
      setMessage(data.message || "Something went wrong!"); // تحسين الرسالة في حالة الخطأ
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Account</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="resetPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="resetPassword"
            value={resetPassword}
            onChange={(e) => setResetPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;