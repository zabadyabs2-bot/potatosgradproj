import React from 'react';
import { Link } from 'react-router-dom';
import { FaNotesMedical, FaPrescriptionBottleAlt, FaUserMd, FaCalendarAlt, FaDownload, FaPrint } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ViewPrescriptions = () => {
    // Mock data for the demo
    const prescriptions = [
        { id: 1, medication: 'Amoxicillin 500mg', doctor: 'Dr. Sarah Johnson', date: '2025-12-15', dosage: '1 tablet twice daily', duration: '7 days', status: 'Active' },
        { id: 2, medication: 'Lisinopril 10mg', doctor: 'Dr. Michael Chen', date: '2025-11-20', dosage: '1 tablet once daily', duration: '30 days', status: 'Completed' },
        { id: 3, medication: 'Ibuprofen 400mg', doctor: 'Dr. Sarah Johnson', date: '2025-10-05', dosage: 'As needed for pain', duration: '14 days', status: 'Expired' },
    ];

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
                </div>
            </nav>

            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold bg-gradient-primary display-4 mb-3">My Prescriptions</h1>
                    <p className="text-muted lead">View and manage your digital medical prescriptions.</p>
                </div>

                <div className="row g-4">
                    {prescriptions.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="col-12"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="card border-0 shadow-sm glass-card overflow-hidden">
                                <div className="row g-0">
                                    <div className={`col-md-1 ${item.status === 'Active' ? 'bg-success' : item.status === 'Completed' ? 'bg-primary' : 'bg-secondary'} opacity-75`}></div>
                                    <div className="col-md-11">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                                                <div>
                                                    <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                                                        <FaPrescriptionBottleAlt className="text-primary" /> {item.medication}
                                                    </h4>
                                                    <p className="text-muted mb-3 d-flex align-items-center gap-2">
                                                        <FaUserMd /> Prescribed by: <span className="fw-semibold text-primary">{item.doctor}</span>
                                                    </p>
                                                    <div className="d-flex gap-4 flex-wrap">
                                                        <div className="small">
                                                            <span className="text-muted">Dosage:</span> <span className="fw-bold">{item.dosage}</span>
                                                        </div>
                                                        <div className="small">
                                                            <span className="text-muted">Duration:</span> <span className="fw-bold">{item.duration}</span>
                                                        </div>
                                                        <div className="small">
                                                            <span className="text-muted">Date:</span> <span className="fw-bold">{item.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <span className={`badge rounded-pill mb-3 px-3 py-2 ${item.status === 'Active' ? 'bg-success' : item.status === 'Completed' ? 'bg-primary' : 'bg-secondary'}`}>
                                                        {item.status}
                                                    </span>
                                                    <div className="d-flex gap-2">
                                                        <button className="btn btn-light btn-sm rounded-circle shadow-sm" title="Download PDF"><FaDownload /></button>
                                                        <button className="btn btn-light btn-sm rounded-circle shadow-sm" title="Print"><FaPrint /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default ViewPrescriptions;
