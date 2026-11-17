import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

import styles from './AuthPage.module.css';

export type AuthMode = 'login' | 'register';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

interface AuthPageProps {
  initialMode?: AuthMode;
  onLogin?: (data: LoginPayload) => Promise<void> | void;
  onRegister?: (data: RegisterPayload) => Promise<void> | void;
  onForgotPassword?: () => void;
}

export function AuthPage({
  initialMode = 'login',
  onLogin,
  onRegister,
  onForgotPassword,
}: AuthPageProps) {
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    const navigate = useNavigate();

  const isLogin = mode === 'login';

  const handleModeSwitch = (nextMode: AuthMode) => {
    setMode(nextMode);
    setError(null);
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLogin) {
      if (fullName.trim().length < 2) {
        setError('Please enter your full name.');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    try {
      setIsSubmitting(true);
      if (isLogin) {
        await onLogin?.({ email: email.trim(), password });
      } else {
        await onRegister?.({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Authentication failed. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <main className={styles.container}>
        <button className={styles.close} onClick={() => navigate('/')}>
            <X
                className={styles.closeIcon}
            />
        </button>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className={styles.subtitle}>
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Fill in your details below to get started'}
          </p>
        </header>

        {/* Top Mode Tabs */}
        <div className={styles.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={isLogin}
            className={`${styles.tab} ${isLogin ? styles.activeTab : ''}`}
            onClick={() => handleModeSwitch('login')}
          >
            Sign In
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isLogin}
            className={`${styles.tab} ${!isLogin ? styles.activeTab : ''}`}
            onClick={() => handleModeSwitch('register')}
          >
            Register
          </button>
        </div>

        {error && (
          <div className={styles.errorAlert} role="alert">
            {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.fieldGroup}>
              <label htmlFor="fullName" className={styles.label}>
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className={styles.input}
                placeholder="Your name here"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.labelRow}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              {isLogin && onForgotPassword && (
                <button
                  type="button"
                  className={styles.forgotLink}
                  onClick={onForgotPassword}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`${styles.input} ${styles.inputWithIcon}`}
                placeholder={isLogin ? '••••••••' : 'Min. 8 characters'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className={styles.fieldGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isLogin
                ? 'Signing in...'
                : 'Creating account...'
              : isLogin
              ? 'Sign In'
              : 'Create Account'}
          </button>
        </form>

        <p className={styles.footerText}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            className={styles.switchLink}
            onClick={() => handleModeSwitch(isLogin ? 'register' : 'login')}
          >
            {isLogin ? 'Register' : 'Sign In'}
          </button>
        </p>
      </section>
    </main>
  );
}
