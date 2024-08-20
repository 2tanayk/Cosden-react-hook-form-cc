import { useForm } from "react-hook-form";

function App() {
  // the register function to hook our form to react-hook-form

  // the handleSubmit function to handle our form submissions, it does various tasks such as validation,
  // preventing default etc.

  // errors to access validation errors in the form
  // isSubmitting is true if the form is submitting

  // setError to programmatically set an error in out form

  //defaultValues can be passed to set default values to some fields
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "2tanaykamath@gmail.com",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      // dummy api call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // throw new Error();
      console.log(data);
    } catch (error) {
      // you can either set an error for a specific field for eg. email/password in our case
      // or for the entire form by setting it to root
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/* you can set fields that are required, add regex too using pattern etc. 
        (you can explore the various fields)*/}
        {/* required can also be set to a string i.e the error message that is to be used */}
        <input
          {...register("email", {
            required: "Email is required",
            // pattern: /^[^@]+@[^@]+\.[^@]+$/,
            validate: (value) => {
              if (!value.includes("@")) {
                return "Email must include @";
              }

              return true;
            },
          })}
          type="text"
          placeholder="Email"
        />
        {errors.email && (
          <div style={{ color: "red" }}>{errors.email.message}</div>
        )}
      </div>
      <div>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: 8,
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <div style={{ color: "red" }}>{errors.password.message}</div>
        )}
      </div>
      <div>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.root && (
          <div style={{ color: "red" }}>{errors.root.message}</div>
        )}
      </div>
    </form>
  );
}

export default App;
