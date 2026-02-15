import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { FaUser, FaPhone, FaLock, FaEye, FaEyeSlash, FaIdCard, FaNotesMedical } from 'react-icons/fa';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        role: 'patient',
        name: '',
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
        licenseNumber: '',
        specialization: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const endpoint = formData.role === 'doctor' ? '/api/account/doctor-register' : 'account/patient-register';
            const data = await API.post(endpoint, {
                Username: formData.username,
                Password: formData.password,
                ...(formData.role === 'doctor' && { Specialization: formData.specialization }),
                ...(formData.role === 'patient' && { NationalId: formData.phone, Age: 25 })
            });
            if (data.success) {
                alert("Registration successful! Please login.");
                navigate('/login');
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-page min-vh-100 d-flex align-items-center position-relative overflow-hidden">
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
                    <div className="col-md-10 col-lg-9">
                        <div className="card border-0 shadow-lg overflow-hidden glass-card">
                            <div className="row g-0">
                                {/* Left Side - Branding (Glass Effect) */}
                                <div className="col-md-5 glass-branding text-white p-4 d-flex flex-column justify-content-center" style={{ backgroundColor: '#0288D1' }}>
                                    <div>
                                        <h2 className="fw-bold mb-3">Join Health Hub</h2>
                                        <p className="mb-3 opacity-90">
                                            Create your account to start your journey towards better health management.
                                        </p>
                                    </div>

                                    <ul className="list-unstyled mt-4">
                                        <li className="mb-2">✓ Book appointments instantly</li>
                                        <li className="mb-2">✓ Access medical records 24/7</li>
                                        <li className="mb-2">✓ Get digital prescriptions</li>
                                        <li className="mb-2">✓ Video consultation with doctors</li>
                                    </ul>
                                    <div className="mt-auto">
                                        <p className="small mb-0">Already have an account?</p>
                                        <Link to="/login" className="text-white fw-bold text-decoration-none">
                                            Sign in here →
                                        </Link>
                                    </div>
                                </div>

                                {/* Right Side - Registration Form */}
                                <div className="col-md-7 p-5 bg-white">
                                    <div className="mb-4 text-start">
                                        <h3 className="fw-bold text-dark mb-2">Create Account</h3>
                                        <p className="text-muted">Fill in your medical details to get started</p>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        {/* Role Selection */}
                                        <div className="mb-4 text-start">
                                            <label className="form-label fw-semibold">Register as:</label>
                                            <div className="d-flex gap-3 flex-wrap">
                                                {['patient', 'doctor'].map((role) => (
                                                    <div className="form-check" key={role}>
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="role"
                                                            id={`reg-${role}`}
                                                            value={role}
                                                            checked={formData.role === role}
                                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                        />
                                                        <label className="form-check-label text-capitalize" htmlFor={`reg-${role}`}>
                                                            {role}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Full Name */}
                                        <div className="mb-3 text-start">
                                            <label className="form-label fw-semibold">Full Name</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <FaUser className="text-muted" />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control border-start-0 ps-0"
                                                    placeholder="Enter your full name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    required
                                                />
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
                                                    placeholder="Choose a username"
                                                    value={formData.username}
                                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="mb-3 text-start">
                                            <label className="form-label fw-semibold">Phone Number</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <FaPhone className="text-muted" />
                                                </span>
                                                <input
                                                    type="tel"
                                                    className="form-control border-start-0 ps-0"
                                                    placeholder="Enter your phone number"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Doctor-specific fields */}
                                        {formData.role === 'doctor' && (
                                            <>
                                                <div className="mb-3 text-start">
                                                    <label className="form-label fw-semibold">License Number</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-end-0">
                                                            <FaIdCard className="text-muted" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control border-start-0 ps-0"
                                                            placeholder="Enter medical license number"
                                                            value={formData.licenseNumber}
                                                            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-3 text-start">
                                                    <label className="form-label fw-semibold">Specialization</label>
                                                    <select
                                                        className="form-select"
                                                        value={formData.specialization}
                                                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                                        required
                                                    >
                                                        <option value="">Select specialization</option>
                                                        <option value="general">General Physician</option>
                                                        <option value="cardiology">Cardiology</option>
                                                        <option value="dermatology">Dermatology</option>
                                                        <option value="pediatrics">Pediatrics</option>
                                                        <option value="orthopedics">Orthopedics</option>
                                                    </select>
                                                </div>
                                            </>
                                        )}

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
                                                    placeholder="Create a strong password"
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

                                        {/* Confirm Password */}
                                        <div className="mb-4 text-start">
                                            <label className="form-label fw-semibold">Confirm Password</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <FaLock className="text-muted" />
                                                </span>
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    className="form-control border-start-0 border-end-0 ps-0"
                                                    placeholder="Re-enter your password"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                    required
                                                />
                                                <button
                                                    className="btn bg-light border-start-0"
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <FaEyeSlash className="text-muted" /> : <FaEye className="text-muted" />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Terms & Conditions */}
                                        <div className="form-check mb-4 text-start">
                                            <input className="form-check-input" type="checkbox" id="terms" required />
                                            <label className="form-check-label small" htmlFor="terms">
                                                I agree to the <a href="#" className="text-primary text-decoration-none">Terms & Conditions</a>
                                            </label>
                                        </div>

                                        {/* Submit Button */}
                                        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-pill">
                                            Create Account
                                        </button>
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

export default Register;
