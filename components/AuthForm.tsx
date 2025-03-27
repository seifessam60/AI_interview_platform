"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "@/components/FormField";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signIn, signUp } from "@/lib/actions/auth.action";

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const isSignIn = type === "sign-in";
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });
        if (!result?.success) {
          toast.error(result?.message);
        }
        toast.success("Account created successfully, Please Sign In.");
        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const idToken = await userCredentials.user.getIdToken();
        if (!idToken) {
          toast.error("Failed to sign in, something went wrong.");
          return;
        }
        await signIn({ email, idToken });
        toast.success("Signed In Successfully.");
        router.push("/");
      }
    } catch (e) {
      console.log(e);
      toast.error(`There was an error: ${e}`);
    }
  }
  return (
    <div className={"card-border lg:min-w-[566px]"}>
      <div className={"flex flex-col gap-6 card py-14 px-10"}>
        <div className={"flex flex-row gap-2 justify-center"}>
          <Image src={"/logo.svg"} alt={"logo"} width={38} height={32} />
          <h2 className={"text-primary-100"}>PrepWise</h2>
        </div>
        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name={"name"}
                label={"Name"}
                placeholder={"Enter Your Name"}
              />
            )}
            <FormField
              control={form.control}
              name={"email"}
              label={"Email"}
              placeholder={"Enter Your Email"}
              type={"email"}
            />
            <FormField
              control={form.control}
              name={"password"}
              label={"Password"}
              placeholder={"Enter Your Password"}
              type={"password"}
            />
            <Button className={"btn"} type="submit">
              {isSignIn ? "Sign in" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <p className={"text-center"}>
          {isSignIn ? "No account yet?" : "Already have an account?"}{" "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className={"font-bold ml-1 text-user-primary"}
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};
export default AuthForm;
