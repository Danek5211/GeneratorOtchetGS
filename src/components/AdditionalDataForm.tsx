import React from 'react';
import type { CityData } from '../types';

interface AdditionalDataFormProps {
    city: CityData;
    cityIndex: number;
    onUpdate: (cityIndex: number, field: keyof CityData, value: string) => void;
}

export const AdditionalDataForm: React.FC<AdditionalDataFormProps> = ({
    city,
    cityIndex,
    onUpdate
}) => {
    return (
        <div className="section-yellow">
            <h4 style={{fontSize: '1.125rem', fontWeight: 600, color: 'rgb(253, 224, 71)', marginBottom: '1rem'}}>
                📝 Дополнительные данные (не из отчета лидера)
            </h4>
            
            <div className="space-y-4">
                <div className="form-group">
                    <label className="form-label">Назначение лидера</label>
                    <textarea
                        value={city.leaderAppointment}
                        onChange={(e) => onUpdate(cityIndex, 'leaderAppointment', e.target.value)}
                        placeholder="Nick_Name - назначен на пост лидера... Дата"
                        rows={2}
                        className="form-input"
                        style={{resize: 'vertical'}}
                    />
                </div>

                <div className="grid md-grid-cols-2">
                    <div className="form-group">
                        <label className="form-label">Баны лидера</label>
                        <input
                            type="text"
                            value={city.leaderBans}
                            onChange={(e) => onUpdate(cityIndex, 'leaderBans', e.target.value)}
                            placeholder="-"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Выговоры лидеру</label>
                        <input
                            type="text"
                            value={city.leaderWarnings}
                            onChange={(e) => onUpdate(cityIndex, 'leaderWarnings', e.target.value)}
                            placeholder="-"
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Снятие лидера</label>
                    <textarea
                        value={city.leaderRemoval}
                        onChange={(e) => onUpdate(cityIndex, 'leaderRemoval', e.target.value)}
                        placeholder="Nick_Name - снят по причине..."
                        rows={2}
                        className="form-input"
                        style={{resize: 'vertical'}}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Оценка работы лидера</label>
                    <textarea
                        value={city.leaderEvaluation}
                        onChange={(e) => onUpdate(cityIndex, 'leaderEvaluation', e.target.value)}
                        placeholder="Работает отлично, недостатков нет"
                        rows={2}
                        className="form-input"
                        style={{resize: 'vertical'}}
                    />
                </div>
            </div>
        </div>
    );
};