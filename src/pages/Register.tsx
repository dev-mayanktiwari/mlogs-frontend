import Signup from "@/components/auth/Signup";
import useRegister from "@/hooks/useRegister";
import { Helmet } from "react-helmet-async";

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

  return (
    <>
      <Helmet>
        <title>Register - MLOGS</title>
        <meta
          name="description"
          content="Create a new account on MLOGS to start sharing your thoughts, stories, and ideas with the world. Join now!"
        />
        <meta
          name="keywords"
          content="register, sign up, create an account, MLOGS, blogging platform"
        />
        <meta property="og:title" content="Register - MLOGS" />
        <meta
          property="og:description"
          content="Join MLOGS today! Create an account to share your blogs and become part of a passionate community of creators."
        />
        <meta
          property="og:url"
          content="https://mlogs.mayanktiwari.tech/register"
        />
        <link rel="canonical" href="/register" />
      </Helmet>
      <Signup onSubmit={handleSubmit} isLoading={loading} />

      <Signup onSubmit={handleSubmit} isLoading={loading} />
    </>
  );
};

export default Register;
