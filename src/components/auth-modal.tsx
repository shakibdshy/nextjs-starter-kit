"use client";

import { useState } from "react";

import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";

import { signInAction } from "@/actions/signin-action";
import { signUpAction } from "@/actions/signup-action";
import { SignInSchema, SignUpSchema } from "@/utils/validations/auth.schema";

import { AuthForm } from "./auth-form";

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
    setMode((prevMode) => (prevMode === "signin" ? "signup" : "signin"));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{mode === "signin" ? "Sign In" : "Sign Up"}</ModalHeader>
        <ModalBody>
          <AuthForm
            mode={mode}
            // TODO: Add error handling
            // @ts-expect-error Fix this
            onSubmit={mode === "signin" ? handleSignIn : handleSignUp}
          />
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
