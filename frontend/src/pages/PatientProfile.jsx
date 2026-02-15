import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../api';
import { FaUserInjured, FaNotesMedical, FaIdBadge, FaCalendarAlt, FaBiohazard, FaPlusCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PatientProfile = () => {
    const { id } = useParams();

    const [patient, setPatient] = useState(null);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const data = await API.get(`/api/patients/${id}`);
                if (mounted) setPatient({ patientId: data.patientId || data.PatientId || 0, name: data.name || data.Name || '', age: data.age || data.Age || 0, disease: data.disease || data.Disease || '' });
            } catch (err) {
                console.error('Failed to load patient', err);
            }
        };
        load();
        return () => { mounted = false; };
    }, [id]);

    if (!patient) return <div className="min-vh-100 d-flex align-items-center justify-content-center">Loading...</div>;

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
                    <span className="badge bg-primary rounded-pill px-3 py-2">Doctor View</span>
                </div>
            </nav>

            <div className="container py-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="row justify-content-center"
                >
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-lg glass-card overflow-hidden">
                            <div className="bg-primary p-5 text-white text-center">
                                <div className="bg-white text-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center shadow-lg" style={{ width: '100px', height: '100px' }}>
                                    <FaUserInjured size={50} />
                                </div>
                                <h1 className="fw-bold mb-1">{patient.name}</h1>
                                <p className="opacity-90 lead mb-0">Patient Record</p>
                            </div>

                            <div className="card-body p-5">
                                <div className="d-flex flex-column gap-4">
                                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
                                        <div className="bg-white p-2 rounded text-primary shadow-sm"><FaIdBadge /></div>
                                        <div>
                                            <small className="text-muted d-block">Patient ID</small>
                                            <span className="fw-bold">#PT-{patient.id}</span>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
                                        <div className="bg-white p-2 rounded text-primary shadow-sm"><FaCalendarAlt /></div>
                                        <div>
                                            <small className="text-muted d-block">Age</small>
                                            <span className="fw-bold">{patient.age} Years</span>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
                                        <div className="bg-white p-2 rounded text-danger shadow-sm"><FaBiohazard /></div>
                                        <div>
                                            <small className="text-muted d-block">Disease</small>
                                            <span className="fw-bold text-danger">{patient.disease}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 d-grid gap-3">
                                        <Link to="/create-prescription" className="btn btn-primary btn-lg rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2">
                                            <FaPlusCircle /> Create Prescription
                                        </Link>
                                        <Link to="/search-patients" className="btn btn-outline-secondary rounded-pill py-2">Back to Patient Search</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PatientProfile;
