import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router";

import "./Login.styles.css";
import logoImage from "../../assets/logo.svg";

import { useNotification } from "../../hooks/useNotification";

import { webApi } from "../../webservice/api";
import { useAuth } from "../../hooks/useAuth";

export function LoginPage() {
  const { setSigned } = useAuth();
  const { showMessage } = useNotification();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  function handleLogin(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    // Resetando mensagens de erro
    setFieldErrors({});

    // Validações dos campos
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = "O campo e-mail é obrigatório.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "O email inserido não é válido.";
    }

    if (!password) errors.password = "O campo Senha é obrigatório.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    signIn();
  };

  async function signIn() {
    setIsLoading(true);

    try {
      const { data } = await webApi.post("/auth/login", {
        email,
        password,
      });

      if (data.token && data.userId) {
        setSigned(data.token, data.userId);
      }
      
    } catch(error) {
      showMessage("Erro ao fazer login", true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page">
      <img src={logoImage} alt="Logo" className="imagem" />
      <div className="login-container">
        <div className="title">Login</div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
            />
            {fieldErrors.email && (
              <p className="field-error">{fieldErrors.email}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {fieldErrors.password && (
              <p className="field-error">{fieldErrors.password}</p>
            )}
          </div>
          <div className="esqueceu-senha">
            <a href="">Esqueceu a senha?</a>
          </div>
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "LOGIN"}
          </Button>
          <div className="criar-conta">
            Não possui uma conta?<Link to="/register"> Criar</Link>
          </div>
        </form>
      </div>
      <footer className="final">© 2024 - Sistema</footer>
    </div>
  );
}
