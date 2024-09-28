import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Controller, UseFormReturn, useForm } from "react-hook-form";

import {
  SignInSchema,
  SignUpSchema,
  signInSchema,
  signUpSchema,
} from "@/utils/validations/auth.schema";

type AuthFormProps = {
  mode: "signin" | "signup";
  onSubmit: (data: SignInSchema | SignUpSchema) => void;
};

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const formMethods = useForm<SignInSchema | SignUpSchema>({
    resolver: zodResolver(mode === "signin" ? signInSchema : signUpSchema),
    defaultValues:
      mode === "signin"
        ? { email: "", password: "" }
        : { fName: "", lName: "", email: "", password: "" },
  });

  const { handleSubmit, control } = formMethods;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {mode === "signup" && (
        <>
          <Controller
            name="fName"
            control={control as UseFormReturn<SignUpSchema>["control"]}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                label="First Name"
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="lName"
            control={control as UseFormReturn<SignUpSchema>["control"]}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                label="Last Name"
                isInvalid={!!error?.message}
                errorMessage={error?.message}
              />
            )}
          />
        </>
      )}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label="Email"
            type="email"
            isInvalid={!!error?.message}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label="Password"
            type="password"
            isInvalid={!!error?.message}
            errorMessage={error?.message}
          />
        )}
      />
      <Button type="submit" color="primary">
        {mode === "signin" ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
}
