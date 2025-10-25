import {useEffect, useState} from 'react';
import {getCategories, addCategory, updateCategory, deleteCategory} from './categoriesService';
import './admin.css';

export default function CategoryManagement() {
    const [cats, setCats] = useState([]);
    const [newCat, setNewCat] = useState('');
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {setCats(getCategories());}, []);

    const handleAdd = () => {
        if (!newCat) return;
        setCats(addCategory(newCat));
        setNewCat('');
    };

    const startEdit = (c) => {setEditing(c); setEditValue(c);};
    const saveEdit = () => {
        setCats(updateCategory(editing, editValue));
        setEditing(null); setEditValue('');
    };

    const handleDelete = (c) => {setCats(deleteCategory(c));};

    return (
        <div className="admin-dashboard container">
            <div className="admin-header">
                <h2>Управление категориями</h2>
            </div>

            <div className="admin-add-form">
                <input placeholder="Новая категория" value={newCat} onChange={e => setNewCat(e.target.value)} />
                <div className="admin-actions">
                    <button onClick={handleAdd}>Добавить</button>
                </div>
            </div>

            <div style={{marginTop: 12}}>
                {cats.map(c => (
                    <div key={c} style={{display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8}}>
                        {editing === c ? (
                            <>
                                <input value={editValue} onChange={e => setEditValue(e.target.value)} />
                                <button onClick={saveEdit}>Сохранить</button>
                                <button onClick={() => setEditing(null)}>Отмена</button>
                            </>
                        ) : (
                            <>
                                <div style={{flex: 1}}>{c}</div>
                                <button onClick={() => startEdit(c)}>Изменить</button>
                                <button onClick={() => handleDelete(c)} className="danger">Удалить</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
