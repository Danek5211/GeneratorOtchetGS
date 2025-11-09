import React from 'react';

export const Header: React.FC = () => {
    return (
        <div className="card-header">
            <div className="card-header-flex">
                <div className="card-icon">
                    <span>📊</span>
                </div>
                <div>
                    <h1 className="card-title">Генератор отчета ГС</h1>
                    <p className="card-subtitle">Вставляйте несколько недельных отчетов лидера для автоматического суммирования</p>
                </div>
            </div>
        </div>
    );
};