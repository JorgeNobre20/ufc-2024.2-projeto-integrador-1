import React, { useState } from "react";
import './Login.styles.css';
import  logoImage  from "../../assets/logo.svg";
import { Link } from "react-router";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Resetando mensagens de erro
    setError("");
    setFieldErrors({});

    // Validações dos campos
    const errors: { username?: string; password?: string } = {};
    if (!username) errors.username = "O campo Usuário é obrigatório.";
    if (!password) errors.password = "O campo Senha é obrigatório.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    // Simula uma lógica de autenticação
    if (username === "admin" && password === "1234") {
      alert("Login bem-sucedido!");
      // Redirecionar para outra página, se necessário
    } else {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="login-page">
       <img src={logoImage}  alt="Logo" className="imagem" />
      <div className="login-container">
        <div className="title">Login</div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
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
          <button type="submit" className="login-button">
            LOGIN
          </button>
          <div className="criar-conta">
            Não possui uma conta?<Link to="/register"> Criar</Link>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
      <footer className="final">© 2024 - Sistema</footer>
    </div>
  );
}
