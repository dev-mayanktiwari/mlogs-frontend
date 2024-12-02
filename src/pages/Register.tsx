import Signup from "@/components/auth/Signup";
import useRegister from "@/hooks/useRegister";

const Register = () => {
  const { register, loading } = useRegister();

  const handleSubmit = async (data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => {
    await register(data.email, data.password, data.username, data.name);
  };

  return <Signup onSubmit={handleSubmit} isLoading={loading} />;
};

export default Register;
