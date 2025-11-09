"use client"

import React, { useState } from 'react';
import { 
    Header, 
    BasicInfoForm, 
    CityCard, 
    CopyButton, 
    ReportPreview 
} from './components';
import { 
    useCities, 
    useLeaderReports, 
    useReportGeneration 
} from './hooks';
import { generateReport } from './utils';

const GSReportGenerator: React.FC = () => {
    // Базовая информация
    const [gsNickname, setGsNickname] = useState('');
    const [organization, setOrganization] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [generalInfo, setGeneralInfo] = useState('');
    const [grpEvents, setGrpEvents] = useState('');

    // Управление городами
    const {
        cities,
        setCities,
        addCity,
        removeCity,
        updateCity,
        updateParsedData,
        clearCityData
    } = useCities();

    // Управление отчетами лидера
    const {
        parseAndMergeLeaderReport,
        addLeaderReportField,
        removeLeaderReportField,
        unlockLeaderReport
    } = useLeaderReports(cities, setCities);

    // Генерация отчета
    const { copyReport, downloadDocxReport } = useReportGeneration();

    // Обработчики для списков
    const handleAddItem = (cityIndex: number, field: string, template: any) => {
        const newCities = [...cities];
        (newCities[cityIndex].parsedData as any)[field] = [
            ...(newCities[cityIndex].parsedData as any)[field], 
            template
        ];
        setCities(newCities);
    };

    const handleRemoveItem = (cityIndex: number, field: string, itemIndex: number) => {
        const newCities = [...cities];
        (newCities[cityIndex].parsedData as any)[field].splice(itemIndex, 1);
        setCities(newCities);
    };

    const handleItemChange = (
        cityIndex: number, 
        field: string, 
        itemIndex: number, 
        itemField: string, 
        value: string
    ) => {
        const newCities = [...cities];
        (newCities[cityIndex].parsedData as any)[field][itemIndex][itemField] = value;
        setCities(newCities);
    };

    const handleReportChange = (cityIndex: number, reportIndex: number, value: string) => {
        const newCities = [...cities];
        newCities[cityIndex].leaderReports[reportIndex] = value;
        setCities(newCities);
    };

    const handleReportPaste = (cityIndex: number, reportIndex: number, text: string) => {
        console.log('handleReportPaste called:', { cityIndex, reportIndex, textLength: text.length });
        parseAndMergeLeaderReport(text, cityIndex, reportIndex);
    };

    const report = generateReport(
        gsNickname,
        organization,
        dateFrom,
        dateTo,
        cities,
        grpEvents,
        generalInfo
    );

    return (
        <div className="container space-y-6">
            {/* Заголовок */}
            <Header />

            {/* Основная информация */}
            <BasicInfoForm
                gsNickname={gsNickname}
                organization={organization}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onGsNicknameChange={setGsNickname}
                onOrganizationChange={setOrganization}
                onDateFromChange={setDateFrom}
                onDateToChange={setDateTo}
            />

            {/* Кнопка добавления города */}
            <div className="section">
                <button
                    onClick={addCity}
                    className="btn-blue"
                    style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}
                >
                    ➕ Добавить город
                </button>
            </div>

            {/* Карточки городов */}
            {cities.map((city, cityIndex) => (
                <CityCard
                    key={cityIndex}
                    city={city}
                    cityIndex={cityIndex}
                    onUpdateCity={updateCity}
                    onUpdateParsedData={updateParsedData}
                    onClearData={clearCityData}
                    onRemoveCity={removeCity}
                    onReportChange={handleReportChange}
                    onReportPaste={handleReportPaste}
                    onAddReport={addLeaderReportField}
                    onRemoveReport={removeLeaderReportField}
                    onUnlockReport={unlockLeaderReport}
                    onAddItem={handleAddItem}
                    onRemoveItem={handleRemoveItem}
                    onItemChange={handleItemChange}
                />
            ))}

            {/* ГРП мероприятия */}
            <div className="section">
                <h3 className="section-title">
                    16. Мероприятия с ГРП (для всей организации)
                </h3>
                <textarea
                    value={grpEvents}
                    onChange={(e) => setGrpEvents(e.target.value)}
                    placeholder="Описание мероприятий при непосредственном участии администрации (ГРП) для всех городов..."
                    rows={4}
                    className="form-input"
                    style={{resize: 'vertical'}}
                />
            </div>

            {/* Общее положение дел */}
            <div className="section">
                <h3 className="section-title">
                    17. Общее положение дел во фракции
                </h3>
                <textarea
                    value={generalInfo}
                    onChange={(e) => setGeneralInfo(e.target.value)}
                    placeholder="Изменения в работе фракции, стабильность, качество состава, трудности, планы..."
                    rows={4}
                    className="form-input"
                    style={{resize: 'vertical'}}
                />
            </div>

            {/* Кнопка копирования */}
            <CopyButton
                cities={cities}
                onCopy={() => copyReport(
                    gsNickname,
                    organization,
                    dateFrom,
                    dateTo,
                    cities,
                    grpEvents,
                    generalInfo
                )}
                onDownloadDocx={() => downloadDocxReport(
                    gsNickname,
                    organization,
                    dateFrom,
                    dateTo,
                    cities,
                    grpEvents,
                    generalInfo
                )}
            />

            {/* Предпросмотр */}
            <ReportPreview reportText={report} />
        </div>
    );
};

export default GSReportGenerator;