import React from 'react';
import {getUser} from './authService';

export default function Profile() {
    const user = getUser();
    if (!user) return (
        <div className="page-content">
            <h2>Вы не вошли</h2>
            <p>Пожалуйста, войдите чтобы увидеть профиль.</p>
        </div>
    );
    return (
        <div className="page-content">
            <h2>Мой профиль</h2>
            <div style={{maxWidth: 560, margin: '12px auto', textAlign: 'left'}}>
                <p><strong>Имя:</strong> {user.name || '-'}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.id}</p>
            </div>
        </div>
    );
}
