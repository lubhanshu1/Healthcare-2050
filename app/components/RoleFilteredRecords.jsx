import React, { useState } from 'react';

const RoleFilteredRecords = () => {
    // Current active role filter state
    const [selectedRole, setSelectedRole] = useState('ALL');

    // Comprehensive sample records mapped to different roles and access tiers
    const allRecords = [
        {
            id: 'REC-SYS-001',
            title: 'Cellular Quantum Matrix Audit',
            roleTarget: 'admin',
            classification: 'Restricted Root Access',
            date: '2026-08-08',
            details: 'System-wide entanglement stability logs and core telemetry overrides.'
        },
        {
            id: 'REC-PAT-104',
            title: 'Patient Cohort Alpha Vitals',
            roleTarget: 'user',
            classification: 'Public Health Telemetry',
            date: '2026-08-07',
            details: 'Routine blood pressure, resting heart rate, and self-reported wellness logs.'
        },
        {
            id: 'REC-AUT-502',
            title: 'Planetary Health Regulatory Directive',
            roleTarget: 'authority',
            classification: 'Global Compliance Tier 1',
            date: '2026-08-05',
            details: 'Interplanetary bio-security standards and pandemic prevention frameworks.'
        },
        {
            id: 'REC-HSP-309',
            title: 'Emergency ICU Resource Allocation',
            roleTarget: 'hospital',
            classification: 'Clinical Operations',
            date: '2026-08-08',
            details: 'Real-time bed availability, nanotherapy swarm units, and trauma triage queues.'
        },
        {
            id: 'REC-INV-881',
            title: 'Anomalous Neural Divergence Log',
            roleTarget: 'investigator',
            classification: 'Classified Research',
            date: '2026-08-03',
            details: 'Forensic analysis of synthetic neural pathways and quantum drift anomalies.'
        },
        {
            id: 'REC-REV-210',
            title: 'Peer Review: Nanobot Swarm Efficacy',
            roleTarget: 'reviewer',
            classification: 'Academic Audit',
            date: '2026-08-06',
            details: 'Double-blind evaluation of cellular degradation repair metrics across trial groups.'
        }
    ];

    // Filter records based on selected role tab
    const filteredRecords = selectedRole === 'ALL'
        ? allRecords
        : allRecords.filter(record => record.roleTarget === selectedRole);

    const roles = [
        { key: 'ALL', label: 'ALL ROLES' },
        { key: 'user', label: 'USER' },
        { key: 'admin', label: 'ADMIN' },
        { key: 'authority', label: 'AUTHORITY' },
        { key: 'hospital', label: 'HOSPITAL' },
        { key: 'investigator', label: 'INVESTIGATOR' },
        { key: 'reviewer', label: 'REVIEWER' }
    ];

    return (
        <div style={{ width: '100%', fontFamily: '"Courier New", Courier, monospace' }}>
            <p style={{ color: 'gray', marginBottom: '20px', lineHeight: '1.6', fontSize: '0.9rem' }}>
                Role-Aware Access Control Gateway. Filter and inspect secure health records scoped dynamically to authorized clearance levels.
            </p>

            {/* Role Filter Tabs (Deliverable: Role filter/tab & Demo for multiple roles) */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', borderBottom: '1px solid rgba(6,182,212,0.2)', paddingBottom: '16px' }}>
                {roles.map(role => {
                    const isActive = selectedRole === role.key;
                    return (
                        <button
                            key={role.key}
                            onClick={() => setSelectedRole(role.key)}
                            style={{
                                padding: '8px 14px',
                                backgroundColor: isActive ? '#083344' : '#050508',
                                border: `1px solid ${isActive ? '#22d3ee' : '#1e293b'}`,
                                color: isActive ? '#22d3ee' : '#64748b',
                                cursor: 'pointer',
                                fontFamily: '"Courier New", monospace',
                                fontSize: '0.75rem',
                                fontWeight: isActive ? 'bold' : 'normal',
                                letterSpacing: '1px',
                                transition: 'all 0.2s ease',
                                borderRadius: '4px'
                            }}
                        >
                            {role.label}
                        </button>
                    );
                })}
            </div>

            {/* Visible Count Header (Deliverable: Visible count) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '0.8rem', color: '#94a3b8' }}>
                <span>ACTIVE FILTER: <strong style={{ color: '#22d3ee' }}>{selectedRole.toUpperCase()}</strong></span>
                <span>MATCHING RECORDS: <strong style={{ color: '#10b981' }}>{filteredRecords.length}</strong></span>
            </div>

            {/* Scoped List Results (Deliverable: Scoped list results) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                {filteredRecords.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#475569', padding: '30px 0', fontSize: '0.85rem' }}>
                        No records found matching clearance level: {selectedRole.toUpperCase()}
                    </div>
                ) : (
                    filteredRecords.map(record => (
                        <div key={record.id} style={{
                            backgroundColor: '#050508',
                            border: '1px solid rgba(6,182,212,0.25)',
                            borderLeft: '3px solid #06b6d4',
                            borderRadius: '6px',
                            padding: '16px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.75rem' }}>
                                <span style={{ color: '#06b6d4', fontWeight: 'bold' }}>{record.id}</span>
                                <span style={{ color: '#f59e0b' }}>[{record.classification}]</span>
                            </div>
                            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'normal', margin: '0 0 6px 0' }}>{record.title}</h4>
                            <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 10px 0', lineHeight: '1.4' }}>{record.details}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', borderTop: '1px dashed #1e293b', paddingTop: '8px' }}>
                                <span>TARGET ROLE: <span style={{ color: '#38bdf8' }}>{record.roleTarget.toUpperCase()}</span></span>
                                <span>TIMESTAMP: {record.date}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RoleFilteredRecords;