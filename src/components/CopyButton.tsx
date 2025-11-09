import React from 'react';
import { BUTTON_CLASSES } from '../constants';
import type { CityData } from '../types';
import { 
    calculateTotalInterviews, 
    calculateTotalHired, 
    calculateTotalWarnings 
} from '../utils';

interface CopyButtonProps {
    cities: CityData[];
    onCopy: () => void;
    onDownloadDocx: () => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ cities, onCopy, onDownloadDocx }) => {
    const totalInterviews = calculateTotalInterviews(cities);
    const totalHired = calculateTotalHired(cities);
    const totalWarnings = calculateTotalWarnings(cities);

    return (
        <div className="section-blue">
            <div className="flex items-center justify-between gap-4" style={{flexWrap: 'wrap'}}>
                <div>
                    <h3 style={{fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem'}}>✅ Готово к копированию</h3>
                    <p style={{color: 'rgb(167, 243, 208)'}}>Полный отчет ГС по всем городам сформирован</p>
                    <p style={{fontSize: '0.875rem', color: 'rgb(134, 239, 172)', marginTop: '0.25rem'}}>
                        Всего собеседований: {totalInterviews} | 
                        Принято: {totalHired} | 
                        Выговоров: {totalWarnings}
                    </p>
                </div>
                <div className="flex gap-2" style={{flexWrap: 'wrap'}}>
                    <button
                        onClick={onDownloadDocx}
                        className="btn-blue"
                    >
                        📥 Скачать .docx
                    </button>
                    <button
                        onClick={onCopy}
                        className={BUTTON_CLASSES.primary}
                    >
                        📋 Копировать текст
                    </button>
                </div>
            </div>
        </div>
    );
};