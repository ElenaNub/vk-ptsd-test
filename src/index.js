/* 1. Стили VK UI (должны подключаться ДО вашего CSS) */
import '@vkontakte/vkui/dist/vkui.css';

/* 2. Ваш глобальный CSS с градиентом */
import './App.css';

/* 3. React-базовые импорты */
import React from 'react';
import ReactDOM from 'react-dom';

/* 4. VK Bridge для инициализации приложения */
import bridge from '@vkontakte/vk-bridge';

/* 5. Корневой компонент приложения */
import App from './App';

/* 6. Инициализируем VK Bridge */
bridge.send('VKWebAppInit');

/* 7. (Необязательно) маленький хак, чтобы в dev-режиме
      разблокировать клики, если вдруг VKUI наложит overlay */
if (process.env.NODE_ENV === 'development') {
  document.body.classList.add('vkui–dev-fix');   // см. App.css
}

/* 8. Монтируем приложение */
ReactDOM.render(<App />, document.getElementById('root'));
