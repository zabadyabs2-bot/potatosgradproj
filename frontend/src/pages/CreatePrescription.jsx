import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaNotesMedical, FaUserInjured, FaPrescriptionBottleAlt, FaCalendarPlus, FaClipboardList } from 'react-icons/fa';
import { motion } from 'framer-motion';
import API from '../api';

const CreatePrescription = () => {
    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const data = await API.get('/api/patients/search');
                const mapped = (data || []).map(p => ({ id: p.patientId || p.PatientId || 0, name: p.name || p.Name || '' }));
                if (mounted) setPatients(mapped);
            } catch (err) {
                console.error('Failed to load patients', err);
            }
        };
        load();
        return () => { mounted = false; };
    }, []);

    const [formData, setFormData] = useState({
        patientName: '',
        medication: '',
        dosage: '',
        duration: '',
        instructions: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.patientName) {
            alert('Please select a patient.');
            return;
        }
        console.log('Prescription Created:', formData);
        alert(`Prescription created successfully for ${formData.patientName}!`);
        navigate('/search-patients');
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
                </div>
            </nav>

            <div className="container py-5">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="row justify-content-center"
                >
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-lg glass-card">
                            <div className="card-header bg-primary text-white p-4 border-0">
                                <h3 className="fw-bold mb-0 d-flex align-items-center gap-3">
                                    <FaPrescriptionBottleAlt /> Create New Prescription
                                </h3>
                            </div>
                            <div className="card-body p-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Select Patient</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0"><FaUserInjured className="text-muted" /></span>
                                                <select
                                                    className="form-select border-start-0 ps-0"
                                                    value={formData.patientName}
                                                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                                                    required
                                                >
                                                    <option value="">Choose a patient...</option>
                                                    {patients.map(patient => (
                                                        <option key={patient.id} value={patient.name}>
                                                            {patient.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Date</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0"><FaCalendarPlus className="text-muted" /></span>
                                                <input
                                                    type="date"
                                                    className="form-control border-start-0 ps-0"
                                                    value={formData.date}
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-semibold">Medication Name</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0"><FaPrescriptionBottleAlt className="text-muted" /></span>
                                                <input
                                                    type="text"
                                                    className="form-control border-start-0 ps-0"
                                                    placeholder="e.g. Amoxicillin 500mg"
                                                    value={formData.medication}
                                                    onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Dosage</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light"
                                                placeholder="e.g. 1 tablet twice daily"
                                                value={formData.dosage}
                                                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Duration</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light"
                                                placeholder="e.g. 7 days"
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-semibold">Special Instructions</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0"><FaClipboardList className="text-muted" /></span>
                                                <textarea
                                                    className="form-control border-start-0 ps-0"
                                                    rows="4"
                                                    placeholder="Enter any specific instructions for the patient..."
                                                    value={formData.instructions}
                                                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <div className="d-flex gap-3">
                                                <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 flex-grow-1 fw-bold shadow-sm">
                                                    Issue Prescription
                                                </button>
                                                <button type="button" onClick={() => navigate(-1)} className="btn btn-outline-secondary btn-lg rounded-pill px-5 fw-bold">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CreatePrescription;
