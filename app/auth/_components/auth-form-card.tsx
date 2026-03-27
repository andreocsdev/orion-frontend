"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/app/_lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { SignInWithGoogle } from "./sign-in-with-google";

type Mode = "login" | "register";

const loginSchema = z.object({
  email: z.email("Informe um e-mail valido"),
  password: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Informe seu nome"),
    email: z.email("Informe um e-mail valido"),
    password: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas nao conferem",
  });

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export function AuthFormCard() {
  const [mode, setMode] = useState<Mode>("login");
  const [serverError, setServerError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const isLogin = mode === "login";

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const activeForm = useMemo(
    () => (isLogin ? loginForm : registerForm),
    [isLogin, loginForm, registerForm],
  );

  async function onLogin(values: LoginValues) {
    setServerError(null);
    setFeedback(null);

    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/home`,
    });

    if (error) {
      setServerError(
        error.message ||
          "Não foi possível entrar no momento. Por favor, tente novamente.",
      );
    }
  }

  async function onRegister(values: RegisterValues) {
    setServerError(null);
    setFeedback(null);

    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/home`,
    });

    if (error) {
      setFeedback({
        type: "error",
        message:
          error.message ||
          "Não foi possível criar sua conta no momento. Por favor, tente novamente.",
      });
      return;
    }

    registerForm.reset();
    loginForm.reset({ email: values.email, password: "" });
    setMode("login");
    setFeedback({
      type: "success",
      message:
        "Sua conta foi criada com sucesso. Você já pode fazer login para continuar.",
    });
  }

  return (
    <Card className="w-full max-w-md border-white/30 bg-white/95 py-0 shadow-xl backdrop-blur">
      <CardHeader className="px-4 pt-4 pb-0">
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setServerError(null);
              setFeedback(null);
            }}
            className={`h-9 rounded-lg text-sm font-medium transition-colors ${
              isLogin
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setServerError(null);
              setFeedback(null);
            }}
            className={`h-9 rounded-lg text-sm font-medium transition-colors ${
              !isLogin
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Criar conta
          </button>
        </div>
        <CardTitle className="text-center text-lg pt-2">
          {isLogin ? "Entrar na sua conta" : "Criar sua conta"}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {isLogin ? (
          <form
            className="space-y-3"
            onSubmit={loginForm.handleSubmit(onLogin)}
          >
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                E-mail
              </label>
              <Input
                placeholder="nome@dominio.com"
                type="email"
                {...loginForm.register("email")}
              />
              {loginForm.formState.errors.email ? (
                <p className="text-xs text-red-500">
                  {loginForm.formState.errors.email.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Senha
              </label>
              <Input
                placeholder="••••••••"
                type="password"
                {...loginForm.register("password")}
              />
              {loginForm.formState.errors.password ? (
                <p className="text-xs text-red-500">
                  {loginForm.formState.errors.password.message}
                </p>
              ) : null}
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={activeForm.formState.isSubmitting}
            >
              {activeForm.formState.isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        ) : (
          <form
            className="space-y-3"
            onSubmit={registerForm.handleSubmit(onRegister)}
          >
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Nome
              </label>
              <Input
                placeholder="Nome completo"
                type="text"
                {...registerForm.register("name")}
              />
              {registerForm.formState.errors.name ? (
                <p className="text-xs text-red-500">
                  {registerForm.formState.errors.name.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                E-mail
              </label>
              <Input
                placeholder="nome@dominio.com"
                type="email"
                {...registerForm.register("email")}
              />
              {registerForm.formState.errors.email ? (
                <p className="text-xs text-red-500">
                  {registerForm.formState.errors.email.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Senha
              </label>
              <Input
                placeholder="••••••••"
                type="password"
                {...registerForm.register("password")}
              />
              {registerForm.formState.errors.password ? (
                <p className="text-xs text-red-500">
                  {registerForm.formState.errors.password.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Confirmar senha
              </label>
              <Input
                placeholder="••••••••"
                type="password"
                {...registerForm.register("confirmPassword")}
              />
              {registerForm.formState.errors.confirmPassword ? (
                <p className="text-xs text-red-500">
                  {registerForm.formState.errors.confirmPassword.message}
                </p>
              ) : null}
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={activeForm.formState.isSubmitting}
            >
              {activeForm.formState.isSubmitting ? "Criando..." : "Criar conta"}
            </Button>
          </form>
        )}

        {feedback ? (
          <div
            className={`mt-3 rounded-xl border px-3 py-2 text-sm ${
              feedback.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <div className="flex items-start gap-2">
              {feedback.type === "success" ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
              )}
              <p>{feedback.message}</p>
            </div>
          </div>
        ) : null}

        {serverError ? (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <p>{serverError}</p>
            </div>
          </div>
        ) : null}

        <div className="my-4 h-px bg-border" />
        <div className="flex justify-center">
          <SignInWithGoogle />
        </div>
      </CardContent>
    </Card>
  );
}
