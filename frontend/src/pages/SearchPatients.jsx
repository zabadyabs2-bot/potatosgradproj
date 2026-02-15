import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaNotesMedical, FaUserInjured, FaPlusCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SearchPatients = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchPatients = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/patients/search?keyword=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // Map backend PascalCase names to frontend-friendly names
            const mapped = data.map(p => ({
                patientId: p.patientId || p.PatientId || p.PatientID || 0,
                name: p.name || p.Name || '',
                age: p.age || p.Age || 0,
                nationalId: p.nationalId || p.NationalId || ''
            }));
            setPatients(mapped);
        } catch (err) {
            setError('Failed to fetch patients. Please try again.');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPatients();
    };

    return (
        <div className="min-vh-100 bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                        <div className="bg-primary text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
                            <FaNotesMedical size={18} />
                        </div>
                        <span className="fw-bold text-primary">Health Hub</span>
                    </Link>
                    <span className="badge bg-primary rounded-pill px-3 py-2">Doctor Portal</span>
                </div>
            </nav>

            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold bg-gradient-primary display-4 mb-3">Patient Search</h1>
                    <p className="text-muted lead">Search for patients to manage their records and create prescriptions.</p>
                </div>

                <div className="row justify-content-center mb-5">
                    <div className="col-md-8">
                        <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden bg-white">
                            <span className="input-group-text border-0 bg-white ps-4">
                                <FaSearch className="text-muted" />
                            </span>
                            <input
                                type="text"
                                className="form-control border-0 py-3"
                                placeholder="Search by patient name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button onClick={handleSearch} className="btn btn-primary px-5 fw-bold">Search</button>
                        </div>
                    </div>
                </div>

                {loading && <div className="text-center"><p>Loading...</p></div>}
                {error && <div className="text-center text-danger"><p>{error}</p></div>}

                <div className="row g-4">
                    {patients.map((patient, index) => (
                        <motion.div
                            key={patient.patientId}
                            className="col-md-6 col-lg-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="card border-0 shadow-sm hover-lift h-100 glass-card">
                                <div className="card-body text-center p-4">
                                    <div className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                        <FaUserInjured size={40} className="text-primary opacity-50" />
                                    </div>
                                    <h5 className="fw-bold mb-1">{patient.name}</h5>
                                    <p className="text-muted mb-2">Age: {patient.age}</p>
                                    <p className="text-muted mb-4">National ID: {patient.nationalId}</p>
                                    <div className="d-grid gap-2">
                                        <Link to={`/patient-profile/${patient.patientId}`} className="btn btn-outline-primary rounded-pill">View Records</Link>
                                        <Link to="/create-prescription" className="btn btn-primary rounded-pill d-flex align-items-center justify-content-center gap-2">
                                            <FaPlusCircle /> Prescription
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPatients;
