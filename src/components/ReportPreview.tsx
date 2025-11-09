import React from 'react';

interface ReportPreviewProps {
    reportText: string;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ reportText }) => {
    return (
        <div className="section">
            <h3 className="section-title">👁️ Предпросмотр отчета</h3>
            <pre className="preview">
                {reportText}
            </pre>
        </div>
    );
};