import React from 'react';

interface BasicInfoFormProps {
    gsNickname: string;
    organization: string;
    dateFrom: string;
    dateTo: string;
    onGsNicknameChange: (value: string) => void;
    onOrganizationChange: (value: string) => void;
    onDateFromChange: (value: string) => void;
    onDateToChange: (value: string) => void;
}

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
    gsNickname,
    organization,
    dateFrom,
    dateTo,
    onGsNicknameChange,
    onOrganizationChange,
    onDateFromChange,
    onDateToChange
}) => {
    return (
        <div className="section">
            <h3 className="section-title">
                Основная информация
            </h3>
            <div className="grid md-grid-cols-2">
                <div className="form-group">
                    <label className="form-label">Никнейм ГС</label>
                    <input
                        type="text"
                        value={gsNickname}
                        onChange={(e) => onGsNicknameChange(e.target.value)}
                        placeholder="Polter_Sokirovskiy"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Организация</label>
                    <input
                        type="text"
                        value={organization}
                        onChange={(e) => onOrganizationChange(e.target.value)}
                        placeholder="МЗ"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Период с</label>
                    <input
                        type="text"
                        value={dateFrom}
                        onChange={(e) => onDateFromChange(e.target.value)}
                        placeholder="25.09.25"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Период по</label>
                    <input
                        type="text"
                        value={dateTo}
                        onChange={(e) => onDateToChange(e.target.value)}
                        placeholder="25.10.25"
                        className="form-input"
                    />
                </div>
            </div>
        </div>
    );
};