import React, { useState } from "react";
import "./Register.styles.css";
import logoImage from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router";
import { Button, CircularProgress } from "@mui/material";
import { webApi } from "../../webservice/api";
import { useNotification } from "../../hooks/useNotification";

export function RegisterPage() {
  const navigate = useNavigate();
  const { showMessage } = useNotification();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Resetando mensagens de erro
    setFieldErrors({ username: "", email: "", password: "" });

    // Validações dos campos
    const errors = { username: "", email: "", password: "" };

    if (!username) errors.username = "O campo Nome de usuário é obrigatório.";

    if (!email) {
      errors.email = "O campo Email é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "O email inserido não é válido.";
    }
    if (!password) {
      errors.password = "O campo Senha é obrigatório.";
    } else if (password.length < 6) {
      errors.password = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (errors.username || errors.email || errors.password) {
      setFieldErrors(errors);
      return;
    }

    registerUser();
  };

  async function registerUser() {
    setIsLoading(true);

    try {
      await webApi.post("/auth/signup", {
        username,
        email,
        password,
      });

      showMessage("Usuário cadastrado com sucesso!", false);
      navigate("/login");
    } catch {
      showMessage("Erro ao cadastrar usuário", true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="register-page">
      <img src={logoImage} alt="Logo" className="imagem" />
      <div className="register-container">
        <div className="title"> Cadastre-se</div>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Nome</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {fieldErrors.username && (
              <p className="field-error">{fieldErrors.username}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "CADASTRE-SE"}
          </Button>
          <div className="possui-conta">
            <Link to="/login">Já possui uma conta?</Link>
          </div>
        </form>
      </div>
      <footer className="final">© 2024 - Sistema</footer>
    </div>
  );
}
