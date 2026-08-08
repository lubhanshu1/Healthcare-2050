import React, { useState, useEffect } from 'react';

const PatientFollowUp = () => {
    // Initial sample records to satisfy the "visible follow-up state on a sample record" deliverable
    const initialRecords = [
        {
            id: 'REC-2050-A1X',
            patient: 'Anonymous Cohort A',
            diagnosis: 'Stage 2 Hypertension',
            triage: 'ELEVATED',
            status: 'PENDING',
            note: 'Awaiting secondary cardiac vector analysis.'
        },
        {
            id: 'REC-2050-B4Y',
            patient: 'Anonymous Cohort B',
            diagnosis: 'Cellular Degradation (0.045%)',
            triage: 'CRITICAL',
            status: 'IN-TREATMENT',
            note: 'Initiated Swarm Variant 8-B protocol.'
        }
    ];

    const [records, setRecords] = useState([]);
    const [editStates, setEditStates] = useState({});
    const [saveFlashes, setSaveFlashes] = useState({});

    // Load from local storage or use defaults
    useEffect(() => {
        const saved = localStorage.getItem('healthcare_followup_records');
        if (saved) {
            setRecords(JSON.parse(saved));
        } else {
            setRecords(initialRecords);
        }
    }, []);

    // Handle typing in the input fields
    const handleEditChange = (id, field, value) => {
        setEditStates(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    // Save the update, satisfying the "Saved update" deliverable
    const saveUpdate = (id) => {
        const currentEdit = editStates[id];
        if (!currentEdit) return; // Nothing changed

        setRecords(prevRecords => {
            const updatedRecords = prevRecords.map(rec => {
                if (rec.id === id) {
                    return {
                        ...rec,
                        status: currentEdit.status || rec.status,
                        note: currentEdit.note !== undefined ? currentEdit.note : rec.note
                    };
                }
                return rec;
            });

            // Persist to local storage
            localStorage.setItem('healthcare_followup_records', JSON.stringify(updatedRecords));
            return updatedRecords;
        });

        // Trigger green flash animation for visual feedback
        setSaveFlashes(prev => ({ ...prev, [id]: true }));
        setTimeout(() => {
            setSaveFlashes(prev => ({ ...prev, [id]: false }));
        }, 2000);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'RESOLVED': return '#10b981'; // Green
            case 'IN-TREATMENT': return '#38bdf8'; // Blue
            case 'CONTACTED': return '#f59e0b'; // Yellow
            default: return '#ef4444'; // Red for Pending
        }
    };

    return (
        <div style={{ width: '100%', fontFamily: '"Courier New", Courier, monospace' }}>
            <p style={{ color: 'gray', marginBottom: '24px', lineHeight: '1.6', fontSize: '0.9rem' }}>
                Secure Clinical Triage Portal. Update patient follow-up statuses and append clinician notes directly to active diagnostic records.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {records.map(record => {
                    const editState = editStates[record.id] || {};
                    const currentStatus = editState.status || record.status;
                    const currentNote = editState.note !== undefined ? editState.note : record.note;
                    const isFlashing = saveFlashes[record.id];

                    return (
                        <div key={record.id} style={{
                            backgroundColor: '#050508',
                            border: `1px solid ${isFlashing ? '#10b981' : 'rgba(6,182,212,0.3)'}`,
                            borderRadius: '8px',
                            padding: '20px',
                            transition: 'border 0.3s ease',
                            boxShadow: isFlashing ? '0 0 15px rgba(16,185,129,0.2)' : 'none'
                        }}>

                            {/* Top row: Record Info & Current Status Badge */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed #1e293b', paddingBottom: '12px', marginBottom: '16px' }}>
                                <div>
                                    <div style={{ color: '#06b6d4', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>{record.id}</div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{record.patient}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    {/* VISIBLE FOLLOW-UP STATE */}
                                    <div style={{
                                        color: getStatusColor(record.status),
                                        fontWeight: 'bold',
                                        fontSize: '0.85rem',
                                        letterSpacing: '1px',
                                        padding: '4px 10px',
                                        backgroundColor: 'rgba(255,255,255,0.03)',
                                        border: `1px solid ${getStatusColor(record.status)}`,
                                        borderRadius: '4px'
                                    }}>
                                        STATUS: {record.status}
                                    </div>
                                    {isFlashing && <div style={{ color: '#10b981', fontSize: '0.65rem', marginTop: '6px', animation: 'fadeIn 0.3s' }}>UPDATE SAVED ✓</div>}
                                </div>
                            </div>

                            {/* Middle row: Diagnosis / Triage info (Requirement constraint) */}
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', fontSize: '0.8rem' }}>
                                <div>
                                    <span style={{ color: '#64748b' }}>DIAGNOSIS:</span> <span style={{ color: '#cffafe' }}>{record.diagnosis}</span>
                                </div>
                                <div>
                                    <span style={{ color: '#64748b' }}>TRIAGE:</span> <span style={{ color: record.triage === 'CRITICAL' ? '#ef4444' : '#f59e0b', fontWeight: 'bold' }}>[{record.triage}]</span>
                                </div>
                            </div>

                            {/* Bottom row: The Edit Fields (Status Field, Note Field, Save Update) */}
                            <div style={{ backgroundColor: '#020204', padding: '16px', borderRadius: '6px', border: '1px solid #111827' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>

                                    {/* STATUS FIELD */}
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', color: '#06b6d4', fontSize: '0.7rem', marginBottom: '8px', letterSpacing: '1px' }}>UPDATE STATUS</label>
                                        <select
                                            value={currentStatus}
                                            onChange={(e) => handleEditChange(record.id, 'status', e.target.value)}
                                            style={{
                                                width: '100%', padding: '10px', backgroundColor: '#09090e',
                                                border: '1px solid #1e293b', color: '#cffafe',
                                                fontFamily: '"Courier New", monospace', fontSize: '0.8rem',
                                                outline: 'none'
                                            }}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="CONTACTED">CONTACTED</option>
                                            <option value="IN-TREATMENT">IN-TREATMENT</option>
                                            <option value="RESOLVED">RESOLVED</option>
                                        </select>
                                    </div>

                                    {/* NOTE FIELD */}
                                    <div style={{ flex: 2 }}>
                                        <label style={{ display: 'block', color: '#06b6d4', fontSize: '0.7rem', marginBottom: '8px', letterSpacing: '1px' }}>CLINICIAN NOTE</label>
                                        <input
                                            type="text"
                                            value={currentNote}
                                            onChange={(e) => handleEditChange(record.id, 'note', e.target.value)}
                                            placeholder="Append follow-up notes here..."
                                            style={{
                                                width: '100%', padding: '10px', backgroundColor: '#09090e',
                                                border: '1px solid #1e293b', color: '#cffafe',
                                                fontFamily: '"Courier New", monospace', fontSize: '0.8rem',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    {/* SAVE UPDATE BUTTON */}
                                    <div style={{ flex: '0 0 auto', alignSelf: 'flex-end' }}>
                                        <button
                                            onClick={() => saveUpdate(record.id)}
                                            style={{
                                                padding: '10px 16px', backgroundColor: 'rgba(6,182,212,0.1)',
                                                border: '1px solid #06b6d4', color: '#06b6d4',
                                                cursor: 'pointer', fontFamily: '"Courier New", monospace',
                                                fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#06b6d4'; e.currentTarget.style.color = '#000'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(6,182,212,0.1)'; e.currentTarget.style.color = '#06b6d4'; }}
                                        >
                                            SAVE UPDATE
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PatientFollowUp;