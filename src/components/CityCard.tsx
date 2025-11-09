import React from 'react';
import type { CityData } from '../types';
import { LeaderReportInput } from './LeaderReportInput';
import { ParsedDataDisplay } from './ParsedDataDisplay';
import { AdditionalDataForm } from './AdditionalDataForm';

interface CityCardProps {
    city: CityData;
    cityIndex: number;
    totalCities: number;
    onUpdateCity: (cityIndex: number, field: keyof CityData, value: any) => void;
    onUpdateParsedData: (cityIndex: number, field: string, value: any) => void;
    onClearData: (cityIndex: number) => void;
    onRemoveCity: (cityIndex: number) => void;
    onReportChange: (cityIndex: number, reportIndex: number, value: string) => void;
    onReportPaste: (cityIndex: number, reportIndex: number, text: string) => void;
    onAddReport: (cityIndex: number) => void;
    onRemoveReport: (cityIndex: number, reportIndex: number) => void;
    onUnlockReport: (cityIndex: number, reportIndex: number) => void;
    onAddItem: (cityIndex: number, field: string, template: any) => void;
    onRemoveItem: (cityIndex: number, field: string, itemIndex: number) => void;
    onItemChange: (cityIndex: number, field: string, itemIndex: number, itemField: string, value: string) => void;
}

export const CityCard: React.FC<CityCardProps> = ({
    city,
    cityIndex,
    totalCities,
    onUpdateCity,
    onUpdateParsedData,
    onClearData,
    onRemoveCity,
    onReportChange,
    onReportPaste,
    onAddReport,
    onRemoveReport,
    onUnlockReport,
    onAddItem,
    onRemoveItem,
    onItemChange
}) => {
    return (
        <div className="city-card">
            <div className="city-card-header">
                <div>
                    <h2 className="city-card-title">
                        <span>🏥</span>
                        {city.name || `Город #${cityIndex + 1}`}
                    </h2>
                    <p className="city-card-stats">
                        📋 Вставлено отчетов: {city.leaderReports.filter(r => r.trim()).length} | 
                        📊 Собеседований: {city.parsedData.interviews.length} | 
                        👥 Принято: {city.parsedData.totalHired} | 
                        ⚠️ Выговоров: {city.parsedData.warnings.length}
                    </p>
                </div>
                <div className="city-card-actions">
                    <button
                        onClick={() => onClearData(cityIndex)}
                        className="btn-secondary"
                        title="Очистить все данные и начать заново"
                    >
                        🔄 Сброс
                    </button>
                    <button
                        onClick={() => onRemoveCity(cityIndex)}
                        className="btn-secondary"
                    >
                        ✕ Удалить город
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Название города */}
                <div className="form-group">
                    <label className="form-label">Название города</label>
                    <input
                        type="text"
                        value={city.name}
                        onChange={(e) => onUpdateCity(cityIndex, 'name', e.target.value)}
                        placeholder="ЦГБ-П"
                        className="form-input"
                    />
                </div>

                {/* Отчеты лидера */}
                <LeaderReportInput
                    reports={city.leaderReports}
                    cityIndex={cityIndex}
                    onReportChange={onReportChange}
                    onReportPaste={onReportPaste}
                    onAddReport={onAddReport}
                    onRemoveReport={onRemoveReport}
                    onUnlock={onUnlockReport}
                />

                {/* Распарсенные данные */}
                <ParsedDataDisplay
                    data={city.parsedData}
                    cityIndex={cityIndex}
                    onUpdateField={onUpdateParsedData}
                    onAddItem={onAddItem}
                    onRemoveItem={onRemoveItem}
                    onItemChange={onItemChange}
                />

                {/* Дополнительные данные */}
                <AdditionalDataForm
                    city={city}
                    cityIndex={cityIndex}
                    onUpdate={onUpdateCity}
                />
            </div>
        </div>
    );
};