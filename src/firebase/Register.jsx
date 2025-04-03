
import React, { useState } from "react";
import { auth, db } from "./Firebase"; 
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
     
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const fullName = `${fname} ${lname}`.trim();

      await updateProfile(user, { displayName: fullName });
      console.log("User created:", user.uid);
      toast.success("Account created successfully!", { position: "top-center" });
  
    
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        displayName: fullName,
        photo: "",
        createdAt: new Date().toISOString(),
      }, { merge: true });
  
     
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration error:", error);
  
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Email is already in use. Try another email.", { position: "bottom-center" });
      } else if (error.code === 'auth/invalid-email') {
        toast.error("Invalid email format.", { position: "bottom-center" });
      } else if (error.code === 'auth/weak-password') {
        toast.error("Password should be at least 6 characters long.", { position: "bottom-center" });
      } else if (error.code === 'auth/network-request-failed') {
        toast.error("Network error. Check your internet connection.", { position: "bottom-center" });
      } else {
        toast.error("Registration failed. Try again.", { position: "bottom-center" });
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h3>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">First name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Last name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Email address</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>

        <button 
          type="submit" 
          className={`w-full ${isLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out`}
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already registered? <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;