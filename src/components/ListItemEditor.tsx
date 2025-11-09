import React from 'react';
import type { ItemType } from '../types';
import { INPUT_CLASSES, BUTTON_CLASSES } from '../constants';

interface ListItemEditorProps {
    items: any[];
    onAdd: (cityIndex: number, field: string, template: any) => void;
    onRemove: (cityIndex: number, field: string, itemIndex: number) => void;
    onChange: (cityIndex: number, field: string, itemIndex: number, itemField: string, value: string) => void;
    itemType: ItemType;
    cityIndex: number;
    field: string;
}

export const ListItemEditor: React.FC<ListItemEditorProps> = ({
    items,
    onAdd,
    onRemove,
    onChange,
    itemType,
    cityIndex,
    field
}) => {
    const getTemplate = () => {
        switch (itemType) {
            case 'link':
                return { link: '' };
            case 'nameLink':
                return { name: '', link: '' };
            case 'warning':
                return { nickname: '', reason: '' };
        }
    };

    return (
        <div>
            {items.length > 0 ? (
                <div style={{maxHeight: '15rem', overflowY: 'auto', paddingRight: '0.5rem'}}>
                    {items.map((item, idx) => (
                        <div key={idx} className="list-item">
                            {itemType === 'link' && (
                                <input
                                    type="text"
                                    value={item.link}
                                    onChange={(e) => onChange(cityIndex, field, idx, 'link', e.target.value)}
                                    placeholder="https://..."
                                    className={INPUT_CLASSES.listItem}
                                />
                            )}
                            {itemType === 'nameLink' && (
                                <>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => onChange(cityIndex, field, idx, 'name', e.target.value)}
                                        placeholder="Название"
                                        className={INPUT_CLASSES.listItem}
                                    />
                                    <input
                                        type="text"
                                        value={item.link}
                                        onChange={(e) => onChange(cityIndex, field, idx, 'link', e.target.value)}
                                        placeholder="https://..."
                                        className={INPUT_CLASSES.listItem}
                                    />
                                </>
                            )}
                            {itemType === 'warning' && (
                                <>
                                    <input
                                        type="text"
                                        value={item.nickname}
                                        onChange={(e) => onChange(cityIndex, field, idx, 'nickname', e.target.value)}
                                        placeholder="Nick_Name"
                                        className={INPUT_CLASSES.listItem}
                                    />
                                    <input
                                        type="text"
                                        value={item.reason}
                                        onChange={(e) => onChange(cityIndex, field, idx, 'reason', e.target.value)}
                                        placeholder="Причина"
                                        className={INPUT_CLASSES.listItem}
                                    />
                                </>
                            )}
                            <button
                                onClick={() => onRemove(cityIndex, field, idx)}
                                className="btn-secondary"
                                style={{flexShrink: 0, padding: '0.5rem'}}
                                title="Удалить"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{fontSize: '0.875rem', color: 'rgb(156, 163, 175)', padding: '0.5rem 0'}}>Нет данных</p>
            )}
            <button
                onClick={() => onAdd(cityIndex, field, getTemplate())}
                className={BUTTON_CLASSES.add}
            >
                + Добавить
            </button>
        </div>
    );
};