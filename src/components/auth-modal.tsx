"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";

import { signInAction } from "@/actions/signin-action";
import { signUpAction } from "@/actions/signup-action";
import {
  SignInSchema,
  SignUpSchema,
  signInSchema,
  signUpSchema,
} from "@/utils/validations/auth.schema";

type AuthMode = "signin" | "signup";

export function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const { update } = useSession();

  const signInForm = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", fName: "", lName: "" },
  });

  const handleSignIn = async (data: SignInSchema) => {
    const result = await signInAction(data);
    if (result.error) {
      console.error(result.error);
    } else {
      update();
      onClose();
    }
  };

  const handleSignUp = async (data: SignUpSchema) => {
    const result = await signUpAction(data);
    if (result.error) {
      console.error(result.error);
    } else {
      update();
      onClose();
    }
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{mode === "signin" ? "Sign In" : "Sign Up"}</ModalHeader>
        <ModalBody>
          {mode === "signin" ? (
            <form
              className="flex flex-col gap-4"
              onSubmit={signInForm.handleSubmit(handleSignIn)}
            >
              <Controller
                name="email"
                control={signInForm.control}
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
                control={signInForm.control}
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
                Sign In
              </Button>
            </form>
          ) : (
            <form
              className="flex flex-col gap-4"
              onSubmit={signUpForm.handleSubmit(handleSignUp)}
            >
              <Controller
                name="fName"
                control={signUpForm.control}
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
                control={signUpForm.control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    label="Last Name"
                    isInvalid={!!error?.message}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={signUpForm.control}
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
                control={signUpForm.control}
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
                Sign Up
              </Button>
            </form>
          )}
          <Button variant="bordered" onPress={() => signIn("github")}>
            <IconBrandGithub /> Continue with GitHub
          </Button>
          <Button variant="bordered" onPress={() => signIn("google")}>
            <IconBrandGoogle /> Continue with Google
          </Button>
          <Link href="#" onPress={toggleMode}>
            {mode === "signin"
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </Link>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
