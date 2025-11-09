// Исправленный LeaderReportInput.tsx
import React from 'react';
import { INPUT_CLASSES, BUTTON_CLASSES } from '../constants';

interface LeaderReportInputProps {
    reports: string[];
    cityIndex: number;
    onReportChange: (cityIndex: number, reportIndex: number, value: string) => void;
    onReportPaste: (cityIndex: number, reportIndex: number, text: string) => void;
    onAddReport: (cityIndex: number) => void;
    onRemoveReport: (cityIndex: number, reportIndex: number) => void;
    onUnlock: (cityIndex: number, reportIndex: number) => void;
}

export const LeaderReportInput: React.FC<LeaderReportInputProps> = ({
    reports,
    cityIndex,
    onReportChange,
    onReportPaste,
    onAddReport,
    onRemoveReport,
    onUnlock
}) => {
    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>, reportIndex: number) => {
        const isParsed = reports[reportIndex].trim().length > 50;
        if (isParsed) return;
        
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        
        console.log('Paste event triggered:', {
            cityIndex,
            reportIndex,
            textLength: pastedText.length,
            preview: pastedText.substring(0, 100)
        });
        
        if (!pastedText.trim()) {
            console.log('Empty paste, ignoring');
        }
        
        onReportPaste(cityIndex, reportIndex, pastedText);
    };

    return (
        <div style={{background: 'rgba(31, 41, 55, 0.3)', border: '1px solid rgba(75, 85, 99, 0.4)', borderRadius: '0.75rem', padding: '1rem'}}>
            <h4 style={{fontSize: '1.125rem', fontWeight: 600, color: 'rgb(147, 197, 253)', marginBottom: '0.75rem'}}>
                📋 Вставьте отчеты лидера (за разные недели)
            </h4>
            {reports.map((report, reportIndex) => {
                const isParsed = report.trim().length > 50;
                return (
                    <div key={reportIndex} style={{marginBottom: '1rem'}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                            <label style={{fontSize: '0.875rem', fontWeight: 500, color: 'rgb(147, 197, 253)', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                Отчет #{reportIndex + 1}
                                {isParsed && (
                                    <span style={{fontSize: '0.75rem', background: 'rgba(34, 197, 94, 0.2)', color: 'rgb(134, 239, 172)', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', border: '1px solid rgba(34, 197, 94, 0.3)'}}>
                                        ✓ Распарсен
                                    </span>
                                )}
                            </label>
                            {reports.length > 1 && (
                                <button
                                    onClick={() => onRemoveReport(cityIndex, reportIndex)}
                                    style={{padding: '0.25rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', color: 'rgb(252, 165, 165)', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.3)', fontSize: '0.875rem', cursor: 'pointer'}}
                                >
                                    ✕ Удалить
                                </button>
                            )}
                        </div>
                        <textarea
                            value={report}
                            onChange={(e) => onReportChange(cityIndex, reportIndex, e.target.value)}
                            disabled={isParsed}
                            placeholder={`Вставьте сюда отчет лидера за неделю ${reportIndex + 1}. Данные автоматически суммируются с другими отчетами.`}
                            rows={10}
                            className={isParsed ? INPUT_CLASSES.textareaParsed : INPUT_CLASSES.textareaActive}
                            onPaste={(e) => handlePaste(e, reportIndex)}
                        />
                        {isParsed && (
                            <button
                                onClick={() => onUnlock(cityIndex, reportIndex)}
                                style={{marginTop: '0.5rem', padding: '0.25rem 0.75rem', background: 'rgba(249, 115, 22, 0.2)', color: 'rgb(253, 186, 116)', borderRadius: '0.5rem', border: '1px solid rgba(249, 115, 22, 0.3)', fontSize: '0.75rem', cursor: 'pointer'}}
                            >
                                🔓 Разблокировать для редактирования
                            </button>
                        )}
                    </div>
                );
            })}
            <button
                onClick={() => onAddReport(cityIndex)}
                className={BUTTON_CLASSES.addFull}
            >
                ➕ Добавить еще один отчет лидера
            </button>
            <p style={{fontSize: '0.75rem', color: 'rgb(147, 197, 253)', marginTop: '0.75rem', lineHeight: '1.625'}}>
                💡 Совет: Вставляйте каждый недельный отчет лидера в отдельное поле. Программа автоматически:
                <br />• Суммирует принятых/уволенных/обзвоны/фонды
                <br />• Объединяет собеседования/лекции/мероприятия без дубликатов
                <br />• Берет последние значения состава сотрудников
                <br />• После вставки поле блокируется для предотвращения случайных изменений
            </p>
        </div>
    );
};