import React, { useReducer, useEffect, useState } from 'react';
import { View } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

import HomePanel     from './components/HomePanel';
import QuestionPanel from './components/QuestionPanel';
import ResultPanel   from './components/ResultPanel';

/* ---- начальный state ---- */
const initialState = {
  started: false,
  current: 0,
  answers: Array(20).fill(null)
};

/* ---- редьюсер ---- */
function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...initialState, started: true };

    case 'answer': {
      const { index, answer } = action.payload;
      const answers = [...state.answers];
      answers[index] = answer;
      return { ...state, current: index + 1, answers };
    }

    case 'restart':
      /* новый проход — сразу первый вопрос */
      return { started: true, current: 0, answers: Array(20).fill(null) };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userInfo, setUserInfo] = useState(null);

  /* userInfo (не обязателен локально) */
  useEffect(() => {
    (async () => {
      try {
        await bridge.send('VKWebAppInit');
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUserInfo(user);
      } catch {/* локально — без данных */}
    })();
  }, []);

  /* ---- какая панель активна ---- */
  const activePanel =
    !state.started          ? 'home'     :
    state.current < 20      ? 'question' :
                              'result';

  return (
    /* key заставляет React пересоздавать панель,
       поэтому «залипать» она больше не будет */
    <View activePanel={activePanel} key={activePanel}>
      <HomePanel     id="home"     userInfo={userInfo} go={dispatch} />
      <QuestionPanel id="question" data={state}      go={dispatch} />
      <ResultPanel   id="result"   data={state}      go={dispatch} />
    </View>
  );
}
