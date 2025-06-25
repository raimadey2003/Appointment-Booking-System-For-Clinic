import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PatientAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://appointment-booking-system-for-clinic.onrender.com/api/auth/${isLogin ? "patient-login" : "patient-register"}`;
    

    try {
      const res = await axios.post(url, form);
      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        navigate("/patient");
      } else {
        alert("🎉 Registered successfully! You can now login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Panel: Login Form */}
      <div style={styles.leftPanel}>
        {isLogin && (
          <>
            <h2 style={styles.title}>👤 Patient Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="email"
                placeholder="📧 Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="password"
                placeholder="🔐 Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                🔓 Login
              </button>
            </form>
          </>
        )}
      </div>

      {/* Right Panel: Register Form */}
      <div style={styles.rightPanel}>
        {!isLogin && (
          <>
            <h2 style={styles.title}>📝 Patient Register</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="👤 Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="email"
                placeholder="📧 Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="password"
                placeholder="🔐 Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                ☑️ Register
              </button>
            </form>
          </>
        )}
      </div>

      {/* Sliding Green Panel */}
      <div
        style={{
          ...styles.slidePanel,
          transform: isLogin ? "translateX(0%)" : "translateX(-100%)",
        }}
      >
        <div style={styles.panelContent}>
          <h3>{isLogin ? "New Here?" : "👋 Welcome Back!"}</h3>
          <p style={{ lineHeight: "1.5", margin: "10px 0" }}>
            {isLogin
              ? "Click below to register and start booking appointments."
              : "Already have an account? Login now!"}
          </p>
          <button onClick={toggleMode} style={styles.panelButton}>
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "950px",
    height: "600px",
    margin: "60px auto",
    position: "relative",
    borderRadius: "12px",
    boxShadow: "0 0 25px rgba(0,0,0,0.15)",
    overflow: "hidden",
    display: "flex",
  },

  leftPanel: {
    width: "50%",
    padding: "40px 30px",
    backgroundColor: "#fff",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  rightPanel: {
    width: "50%",
    padding: "40px 30px",
    backgroundColor: "#fff",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  slidePanel: {
    width: "50%",
    height: "100%",
    // background: "linear-gradient(135deg, #4caf50, #2e7d32)",
    background: "linear-gradient(135deg, #42a5f5, #0d47a1)",

    position: "absolute",
    top: 0,
    left: "50%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.6s ease-in-out",
    zIndex: 3,
  },

  panelContent: {
    textAlign: "center",
    padding: "0 20px",
  },

  panelButton: {
    backgroundColor: "white",
    // color: "#4caf50",
    color: "#0d47a1",
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "20px",
    fontSize: "15px",
  },

  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },

//   button: {
//     padding: "12px",
//     // backgroundColor: "#4caf50",
//     backgroundColor:"rgba(12, 100, 188, 0.8)",
//     color: "white",
//     fontWeight: "bold",
//     border: "none",
//     borderRadius: "6px",
//     fontSize: "16px",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
// "button:hover": {
//         backgroundColor: "rgb(9, 44, 219)",
//         transform: "scale(2.03)",              // slight grow effect
//   boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
//     },
button: {
  padding: "12px",
  backgroundColor: "rgba(12, 100, 188, 0.8)",
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
  transition: "all 0.3s ease-in-out", // smooth animation
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
},

"button:hover": {
  backgroundColor: "rgb(9, 44, 219)",
  transform: "scale(1.03)",              // slight grow effect
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
},

};



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function PatientAuth() {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setForm({ name: "", email: "", password: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = `http://localhost:5050/api/auth/${isLogin ? "patient-login" : "patient-register"}`;

//     try {
//       const res = await axios.post(url, form);
//       if (isLogin) {
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("role", res.data.role);
//         navigate("/patient");
//       } else {
//         alert("🎉 Registered successfully! You can now login.");
//         setIsLogin(true);
//       }
//     } catch (err) {
//       alert(err.response?.data?.error || "Something went wrong.");
//     }
//   };

//   return (
//     <div style={styles.bg}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>{isLogin ? "👤 Patient Login" : "📝 Patient Register"}</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="🧑 Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//               style={styles.input}
//             />
//           )}
//           <input
//             type="email"
//             placeholder="📧 Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             required
//             style={styles.input}
//           />
//           <input
//             type="password"
//             placeholder="🔐 Password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             required
//             style={styles.input}
//           />
//           <button type="submit" style={styles.button}>
//             {isLogin ? "🔓 Login" : "✅ Register"}
//           </button>
//         </form>
//         <p style={styles.switchText}>
//           {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
//           <button onClick={toggleMode} style={styles.switchBtn}>
//             {isLogin ? "Register" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   bg: {
//     minHeight: "100vh",
//     background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     background: "#fff",
//     padding: "40px 30px",
//     borderRadius: "15px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
//     width: "100%",
//     maxWidth: "400px",
//     textAlign: "center",
//   },
//   title: {
//     marginBottom: "25px",
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "#333",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   input: {
//     padding: "12px 14px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "15px",
//     outline: "none",
//   },
//   button: {
//     padding: "12px",
//     backgroundColor: "#007bff",
//     color: "white",
//     fontWeight: "bold",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "16px",
//     cursor: "pointer",
//     transition: "0.3s ease",
//   },
//   switchText: {
//     marginTop: "20px",
//     fontSize: "14px",
//   },
//   switchBtn: {
//     background: "none",
//     border: "none",
//     color: "#007bff",
//     cursor: "pointer",
//     textDecoration: "underline",
//     fontSize: "14px",
//   },
// };
