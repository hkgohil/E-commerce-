import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../components/common/form";
import { registerUser } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const registerFormControls = [
  {
    id: "userName",
    name: "userName",
    label: "Username",
    placeholder: "Enter your username",
    type: "text",
    componentType: "input",
  },
  {
    id: "email",
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        navigate("/auth/login");
      } else {
        toast.error(data?.payload?.message);
      }
    });
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Create new account
          </h1>
          <p className="mt-2 text-black">
            Already have an account
            <Link
              className="font-medium ml-2 text-black hover:underline hover:text-gray-700"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthRegister;