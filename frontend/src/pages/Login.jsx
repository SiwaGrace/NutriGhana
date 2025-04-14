import { SlSocialGoogle } from "react-icons/sl";
import { FaApple, FaLock, FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { toast } from "react-toastify"; // ✅ Toastify import
// import { auth } from "../component/firebase";

const authForms = [
  {
    type: "signUp",
    title: "Begin your nutrition journey!",
    buttonText: "Sign up",
    alternateLink: {
      text: "Already have an account?",
      actionText: "Sign in here",
      actionType: "signIn",
    },
    fields: [
      {
        type: "text",
        name: "name",
        placeholder: "Name",
        icon: (
          <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500" />
        ),
        required: true,
      },
      {
        type: "email",
        name: "email",
        placeholder: "Email",
        icon: (
          <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500" />
        ),
        required: true,
      },
      {
        type: "password",
        name: "password",
        placeholder: "Password",
        icon: (
          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500" />
        ),
        required: true,
      },
    ],
  },
  {
    type: "signIn",
    title: "Continue your nutrition journey!",
    buttonText: "Sign in",
    alternateLink: {
      text: "Don't have an account?",
      actionText: "Sign up",
      actionType: "signUp",
    },
    fields: [
      {
        type: "email",
        name: "email",
        placeholder: "Email",
        icon: (
          <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500" />
        ),
        required: true,
      },
      {
        type: "password",
        name: "password",
        placeholder: "Password",
        icon: (
          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500" />
        ),
        required: true,
      },
    ],
  },
];

const Login = () => {
  const [authType, setAuthType] = useState("signIn");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const currentForm = authForms.find((form) => form.type === authType);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  }, [authType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAuthSwitch = (newAuthType) => {
    setAuthType(newAuthType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      let userCredential;
      if (authType === "signUp") {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Signed up successfully!");
        console.log("User registered:", userCredential.user);
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Signed in successfully!");
        console.log("User signed in:", userCredential.user);
      }

      navigate("/ProfileSetup");
    } catch (error) {
      console.error("Authentication error:", error.message);
      toast.error(error.message || "Authentication failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      <div className="flex flex-col items-center text-center w-full sm:w-4/5 md:w-1/2 lg:w-1/3 p-6 space-y-2 font-Manrope">
        <h1 className="text-4xl sm:text-3xl font-bold">NutriGhana</h1>
        <h2 className="text-xl font-bold text-gray-800">{currentForm.title}</h2>

        {/* Social Buttons */}
        <div className="w-full space-y-4">
          <button className="flex items-center justify-center w-full bg-yellow-500 text-white font-semibold py-6 sm:py-5 rounded-full shadow-md space-x-3 cursor-pointer">
            <SlSocialGoogle className="h-5 w-5" />
            <span>{currentForm.buttonText} with Google</span>
          </button>
          <button className="flex items-center justify-center w-full border border-gray-300 py-6 sm:py-5 rounded-full shadow-md space-x-3 cursor-pointer">
            <FaApple className="h-5 w-5" />
            <span>{currentForm.buttonText} with Apple</span>
          </button>
        </div>

        {/* Email/Password Form */}
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          {currentForm.fields.map((field, index) => (
            <div key={index} className="relative w-full">
              {field.icon}
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                required={field.required}
                className="w-full p-5 pl-12 border-1 border-black rounded-full focus:outline-none focus:ring-2"
              />
            </div>
          ))}
          <button
            type="submit"
            className="flex items-center justify-center w-full bg-blue-500 text-white font-medium py-4 sm:py-5 rounded-full shadow-md cursor-pointer"
          >
            {currentForm.buttonText}
          </button>
        </form>

        {/* Switch Auth Type */}
        <div className="text-xl text-gray-700 mt-2">
          <p>{currentForm.alternateLink.text}</p>
          <button
            onClick={() =>
              handleAuthSwitch(currentForm.alternateLink.actionType)
            }
            className="text-blue-600 font-medium cursor-pointer"
          >
            {currentForm.alternateLink.actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
