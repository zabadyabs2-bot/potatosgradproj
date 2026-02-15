import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../api';
import { FaUserMd, FaStethoscope, FaNotesMedical, FaIdBadge } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DoctorProfile = () => {
    const { id } = useParams();

    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const data = await API.get(`/api/doctors/${id}`);
                if (mounted) setDoctor({ id: data.doctorId || data.DoctorId || data.DoctorID || data.DoctorId, name: data.name || data.Name || '', specialty: data.specialty || data.Specialty || '' });
            } catch (err) {
                console.error('Failed to load doctor', err);
            }
        };
        load();
        return () => { mounted = false; };
    }, [id]);

    if (!doctor) return <div className="min-vh-100 d-flex align-items-center justify-content-center">Loading...</div>;

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
                    <span className="badge bg-success rounded-pill px-3 py-2">Patient View</span>
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
                                    <FaUserMd size={50} />
                                </div>
                                <h1 className="fw-bold mb-1">{doctor.name}</h1>
                                <p className="opacity-90 lead mb-0">{doctor.specialty}</p>
                            </div>

                            <div className="card-body p-5">
                                <div className="d-flex flex-column gap-4">
                                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
                                        <div className="bg-white p-2 rounded text-primary shadow-sm"><FaIdBadge /></div>
                                        <div>
                                            <small className="text-muted d-block">Doctor ID</small>
                                            <span className="fw-bold">#DOC-{doctor.id}</span>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
                                        <div className="bg-white p-2 rounded text-primary shadow-sm"><FaStethoscope /></div>
                                        <div>
                                            <small className="text-muted d-block">Specialty</small>
                                            <span className="fw-bold">{doctor.specialty}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 text-center">
                                        <p className="text-muted small">This profile is for informational purposes. Please contact the clinic for appointments.</p>
                                        <Link to="/search-doctors" className="btn btn-outline-primary rounded-pill px-4">Back to Search</Link>
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

export default DoctorProfile;
