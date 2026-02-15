import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaNotesMedical } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        role: 'patient',
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = formData.role === 'doctor' ? '/api/account/doctor-login' : '/api/account/patient-login';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    Username: formData.username,
                    Password: formData.password
                }),
            });

            const data = await response.json();
            if (data.success) {
                // Redirect based on role
                if (formData.role === 'doctor') {
                    navigate('/search-patients');
                } else {
                    navigate('/search-doctors');
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page min-vh-100 d-flex align-items-center position-relative overflow-hidden">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white shadow-sm">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                        <div className="bg-primary text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                            <FaNotesMedical size={18} />
                        </div>
                        <span className="fw-bold text-primary">Health Hub</span>
                    </Link>
                </div>
            </nav>

            {/* Full Screen Static Background */}
            <div className="spline-background" style={{
                backgroundColor: '#F3F4F6',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0
            }}></div>

            <div className="container position-relative" style={{ zIndex: 1, marginTop: '60px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <div className="card border-0 shadow-lg overflow-hidden glass-card">
                            <div className="row g-0">
                                {/* Left Side - Branding (Glass Effect) */}
                                <div className="col-md-5 glass-branding text-white p-4 d-flex flex-column justify-content-center" style={{ backgroundColor: '#0288D1' }}>
                                    <div>
                                        <h2 className="fw-bold mb-3">Welcome Back!</h2>
                                        <p className="mb-3 opacity-90">
                                            Sign in to access your health dashboard, book appointments, and manage your medical records.
                                        </p>
                                    </div>

                                    <div className="mt-auto">
                                        <p className="small mb-0">Don't have an account?</p>
                                        <Link to="/register" className="text-white fw-bold text-decoration-none">
                                            Sign up here →
                                        </Link>
                                    </div>
                                </div>

                                {/* Right Side - Login Form */}
                                <div className="col-md-7 p-5 bg-white">
                                    <div className="mb-4 text-start">
                                        <h3 className="fw-bold text-dark mb-2">Sign In</h3>
                                        <p className="text-muted">Enter your medical credentials to continue</p>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        {/* Error Alert */}
                                        {error && (
                                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                {error}
                                                <button type="button" className="btn-close" onClick={() => setError('')}></button>
                                            </div>
                                        )}

                                        {/* Role Selection */}
                                        <div className="mb-3 text-start">
                                            <label className="form-label fw-semibold">Login as:</label>
                                            <div className="d-flex gap-3 flex-wrap">
                                                {['patient', 'doctor'].map((role) => (
                                                    <div className="form-check" key={role}>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="role"
                                                            id={`login-${role}`}
                                                            value={role}
                                                            checked={formData.role === role}
                                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                        />
                                                        <label className="form-check-label text-capitalize" htmlFor={`login-${role}`}>
                                                            {role}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Username */}
                                        <div className="mb-3 text-start">
                                            <label className="form-label fw-semibold">Username</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <FaUser className="text-muted" />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control border-start-0 ps-0"
                                                    placeholder="Enter your username"
                                                    value={formData.username}
                                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="mb-3 text-start">
                                            <label className="form-label fw-semibold">Password</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <FaLock className="text-muted" />
                                                </span>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="form-control border-start-0 border-end-0 ps-0"
                                                    placeholder="Enter your password"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    required
                                                />
                                                <button
                                                    className="btn bg-light border-start-0"
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <FaEyeSlash className="text-muted" /> : <FaEye className="text-muted" />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Remember Me & Forgot Password */}
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="remember" />
                                                <label className="form-check-label small" htmlFor="remember">
                                                    Remember me
                                                </label>
                                            </div>
                                            <a href="#" className="small text-primary text-decoration-none">
                                                Forgot Password?
                                            </a>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 py-2 fw-bold rounded-pill"
                                            disabled={loading}
                                        >
                                            {loading ? 'Signing In...' : 'Sign In'}
                                        </button>

                                        <p className="text-center text-muted small mt-3 mb-0">
                                            By signing in, you agree to our{' '}
                                            <a href="#" className="text-primary text-decoration-none">Terms & Conditions</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
