import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      navigate('/rooms');
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-cream px-6 py-16">
      <form onSubmit={handleSubmit} className="auth-card">
        <p className="eyebrow text-center">Welcome back</p>
        <h1 className="mt-1 text-center font-display text-2xl font-semibold text-navy-800">
          Sign in to Havenstay
        </h1>

        <div className="mt-6 space-y-4">
          <div>
            <label className="field-label">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="field-input"
            />
          </div>
          <div>
            <label className="field-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="field-input"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary mt-6 w-full">
          Sign in
        </button>

        <p className="mt-5 text-center text-sm text-ink/60">
          New to Havenstay?{' '}
          <Link to="/register" className="font-medium text-navy-800 hover:text-gold-600">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;