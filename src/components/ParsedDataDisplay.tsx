import React from 'react';
import type { ParsedData } from '../types';
import { StatCard } from './StatCard';
import { ListItemEditor } from './ListItemEditor';

interface ParsedDataDisplayProps {
    data: ParsedData;
    cityIndex: number;
    onUpdateField: (cityIndex: number, field: string, value: any) => void;
    onAddItem: (cityIndex: number, field: string, template: any) => void;
    onRemoveItem: (cityIndex: number, field: string, itemIndex: number) => void;
    onItemChange: (cityIndex: number, field: string, itemIndex: number, itemField: string, value: string) => void;
}

export const ParsedDataDisplay: React.FC<ParsedDataDisplayProps> = ({
    data,
    cityIndex,
    onUpdateField,
    onAddItem,
    onRemoveItem,
    onItemChange
}) => {
    return (
        <div className="section-green">
            <h4 style={{fontSize: '1.125rem', fontWeight: 600, color: 'rgb(134, 239, 172)', marginBottom: '1rem'}}>
                ✅ Автоматически извлеченные данные
            </h4>
            
            <div className="space-y-4">
                {/* Основная статистика */}
                <div className="grid md-grid-cols-4 mb-4">
                    <StatCard label="Принято всего" value={data.totalHired} />
                    <StatCard label="Принято с обзвона" value={data.callsAccepted} />
                    <StatCard label="Обзвонов проведено" value={data.callsPerWeek} />
                    <StatCard label="Выговоров выдано" value={data.warnings.length} />
                </div>

                {/* Статистика увольнений */}
                <div className="grid grid-cols-3 mb-4" style={{padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(34, 197, 94, 0.2)'}}>
                    <div>
                        <h5 className="stat-label">Уволено ПСЖ</h5>
                        <div className="stat-value">{data.firedPSJ}</div>
                    </div>
                    <div>
                        <h5 className="stat-label">Уволено с ОЧС</h5>
                        <div className="stat-value">{data.firedOCS}</div>
                    </div>
                    <div>
                        <h5 className="stat-label">Всего уволено</h5>
                        <div className="stat-value">{data.firedPSJ + data.firedOCS}</div>
                    </div>
                </div>

                {/* Состав сотрудников */}
                <div className="grid md-grid-cols-5">
                    {['firstRanks', 'middleStaff', 'seniorStaff', 'managementStaff', 'totalStaff'].map((field, idx) => (
                        <div key={field} className="form-group">
                            <label className="form-label" style={{fontSize: '0.75rem'}}>
                                {['Младший', 'Средний', 'Старший', 'Руководящий', 'Всего'][idx]}
                            </label>
                            <input
                                type="text"
                                value={data[field as keyof ParsedData] as string}
                                onChange={(e) => onUpdateField(cityIndex, field, e.target.value)}
                                className="form-input"
                                style={{fontSize: '0.875rem', padding: '0.5rem 0.75rem'}}
                            />
                        </div>
                    ))}
                </div>

                {/* Кадровые перестановки */}
                <div className="form-group">
                    <label className="form-label">Кадровые перестановки</label>
                    <textarea
                        value={data.staffChanges}
                        onChange={(e) => onUpdateField(cityIndex, 'staffChanges', e.target.value)}
                        rows={3}
                        className="form-input"
                        style={{fontSize: '0.875rem', resize: 'vertical'}}
                    />
                </div>

                {/* Списки */}
                {[
                    { field: 'interviews', label: '📝 Собеседования', type: 'link' as const },
                    { field: 'lectures', label: '📚 Лекции', type: 'nameLink' as const },
                    { field: 'trainings', label: '🏋️ Тренировки', type: 'nameLink' as const },
                    { field: 'events', label: '🎉 Мероприятия', type: 'nameLink' as const },
                    { field: 'interfactionEvents', label: '🤝 Мероприятия с постом', type: 'link' as const },
                    { field: 'warnings', label: '⚠️ Выговоры', type: 'warning' as const }
                ].map(({ field, label, type }) => (
                    <div key={field}>
                        <label className="form-label">
                            {label} ({(data[field as keyof ParsedData] as any[]).length})
                        </label>
                        <ListItemEditor
                            items={data[field as keyof ParsedData] as any[]}
                            onAdd={onAddItem}
                            onRemove={onRemoveItem}
                            onChange={onItemChange}
                            itemType={type}
                            cityIndex={cityIndex}
                            field={field}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};