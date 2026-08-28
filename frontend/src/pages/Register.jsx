import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-cream px-6 py-16">
      <form onSubmit={handleSubmit} className="auth-card">
        <p className="eyebrow text-center">Join us</p>
        <h1 className="mt-1 text-center font-display text-2xl font-semibold text-navy-800">
          Create your account
        </h1>

        <div className="mt-6 space-y-4">
          <div>
            <label className="field-label">Name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="field-input"
            />
          </div>
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
          Create account
        </button>

        <p className="mt-5 text-center text-sm text-ink/60">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-navy-800 hover:text-gold-600">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;