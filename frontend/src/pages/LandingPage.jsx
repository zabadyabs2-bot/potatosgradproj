import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaNotesMedical, FaUserMd, FaUserInjured } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white shadow-sm">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                        <div className="bg-primary text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <FaNotesMedical />
                        </div>
                        <span className="fw-bold text-primary">Health Hub</span>
                    </Link>
                    <div className="d-flex gap-3">
                        <Link to="/login" className="btn btn-outline-primary rounded-pill px-4">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-primary rounded-pill px-4 text-white">
                            Register
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section flex-grow-1 d-flex align-items-center justify-content-center pt-5 mt-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <motion.h1
                            className="display-3 fw-bold bg-gradient-primary mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Health Hub Portals
                        </motion.h1>
                        <motion.p
                            className="lead text-muted mb-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Please select your portal to continue.
                        </motion.p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        {/* Doctor Portal - Searches Patients */}
                        <motion.div
                            className="col-md-5"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <Link to="/search-patients" className="text-decoration-none">
                                <div className="card border-0 shadow-lg hover-lift p-5 text-center glass-card h-100">
                                    <div className="display-1 text-primary mb-4">
                                        <FaUserMd />
                                    </div>
                                    <h2 className="fw-bold text-dark mb-3">Doctor Portal</h2>
                                    <p className="text-muted">Search for patients to manage records and create prescriptions.</p>
                                    <div className="btn btn-primary rounded-pill px-5 mt-3">Search Patients</div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Patient Portal - Searches Doctors */}
                        <motion.div
                            className="col-md-5"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <Link to="/search-doctors" className="text-decoration-none">
                                <div className="card border-0 shadow-lg hover-lift p-5 text-center glass-card h-100">
                                    <div className="display-1 text-primary mb-4">
                                        <FaUserInjured />
                                    </div>
                                    <h2 className="fw-bold text-dark mb-3">Patient Portal</h2>
                                    <p className="text-muted">Search for doctors to view profiles and find specialists.</p>
                                    <div className="btn btn-primary rounded-pill px-5 mt-3">Search Doctors</div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <footer className="py-4 text-center text-muted">
                <small>&copy; 2025 Health Hub Medical System. All rights reserved.</small>
            </footer>
        </div>
    );
};

export default LandingPage;
