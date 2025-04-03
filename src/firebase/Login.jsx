// import { signInWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth } from "./Firebase";
// import { toast } from "react-toastify";
// import Signin from "./Signin";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log("User logged in Successfully");
//       navigate("/home");
//       toast.success("User logged in Successfully", {
//         position: "top-center",
//       });
//     } catch (error) {
//       console.log(error.message);
      
//       toast.error(error.message, {
//         position: "bottom-center",
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h3>
      
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2">Email address</label>
//         <input
//           type="email"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
      
//       <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
//         <input
//           type="password"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
      
//       <div className="mb-6">
//         <button 
//           type="submit" 
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
//         >
//           Sign In
//         </button>
//       </div>
      
//       <p className="text-sm text-center text-gray-600 mb-4">
//         New user <a href="/register" className="text-blue-500 hover:text-blue-700">Register Here</a>
//       </p>
      
//       <div className="mt-4">
//        <Signin/>
//       </div>
//     </form>
//   );
// }

// export default Login;

// import { signInWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth } from "./Firebase";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Signin from "./Signin";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const getErrorMessage = (errorCode) => {
//     switch (errorCode) {
//       case "auth/invalid-email":
//         return "Invalid email format.";
//       case "auth/user-not-found":
//         return "User not found. Please check your email.";
//       case "auth/wrong-password":
//         return "Incorrect password. Try again.";
//       case "auth/too-many-requests":
//         return "Too many login attempts. Try again later.";
//       default:
//         return "An error occurred. Please try again.";
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       toast.success("User logged in Successfully", { position: "top-center" });
//       navigate("/home");
//     } catch (error) {
//       toast.error(getErrorMessage(error.code), { position: "bottom-center" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h3>
      
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2">Email address</label>
//         <input
//           type="email"
//           autoComplete="off"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
      
//       <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
//         <input
//           type="password"
//           autoComplete="off"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
      
//       <div className="mb-6">
//         <button 
//           type="submit" 
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
//           disabled={loading}
//         >
//           {loading ? "Signing In..." : "Sign In"}
//         </button>
//       </div>
      
//       <p className="text-sm text-center text-gray-600 mb-4">
//         New user? <a href="/register" className="text-blue-500 hover:text-blue-700">Register Here</a>
//       </p>
      
//       <div className="mt-4">
//         <Signin />
//       </div>
//     </form>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import { auth, provider } from './Firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          width: '100%', 
          maxWidth: 400,
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontFamily: "cursive",
            mb: 3
          }}
        >
          scheduleMe
        </Typography>
        
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleEmailSignIn}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>

        <div className="flex items-center my-4">
  <div className="flex-grow border-t border-gray-300"></div>
  <span className="px-3 text-gray-500 text-sm">or continue</span>
  <div className="flex-grow border-t border-gray-300"></div>
</div>
        <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            <Link to='/register'>
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Link>
           
          </Button>
         
        <Button
          variant="outlined"
          fullWidth
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign in with Google'}
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;