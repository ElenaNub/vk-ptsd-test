import React, { useState, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  Div,
  Title,
  Button,
  FormLayout,
  FormLayoutGroup,
  Radio
} from '@vkontakte/vkui';
import questions from '../data/questions';
import './QuestionPanel.css';
import sideImage from '../assets/555.png';  // Картинка в src/assets/555.png

const labels = [
  'Совсем не беспокоит',
  'Слабо',
  'Умеренно',
  'Сильно',
  'Очень сильно'
];

export default function QuestionPanel({ id, data, go }) {
  const { current, answers } = data;
  const [value, setValue] = useState(
    answers[current] != null ? String(answers[current]) : null
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [answerWidth, setAnswerWidth] = useState(null);

  // Сбрасываем ответ при смене вопроса
  useEffect(() => {
    setValue(answers[current] != null ? String(answers[current]) : null);
  }, [current, answers]);

  // Вычисляем ширину для выравнивания плашек
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = window.getComputedStyle(document.body).font;
    const widths = labels.map(label => ctx.measureText(label).width);
    const maxWidth = Math.max(...widths);
    const total = maxWidth + 8 + 12 + 40;
    setAnswerWidth(total);
  }, []);

  const next = () => {
    if (value == null) return;
    go({ type: 'answer', payload: { index: current, answer: Number(value) } });
  };

  const headerText = `Вопрос ${current + 1} / ${questions.length}`;

  return (
    <Panel
      id={id}
      className="qp-panel-wrapper"
      style={{ position: 'relative', backgroundColor: 'transparent' }}
    >
      {/* Боковое изображение справа на 200px вне панели */}
      <img
        src={sideImage}
        alt="Side illustration"
        style={{
          position: 'absolute',
          top: 111,
          left: 250,
          width: 500,
          height: 'auto',
          zIndex: 1
        }}
      />

      <PanelHeader style={{ backgroundColor: 'transparent' }} separator={false}>
        <div className="qp-header-label">{headerText}</div>
      </PanelHeader>

      <Div style={{ padding: 16, backgroundColor: 'transparent' }}>
      <Title
  level="3"
  weight="bold"
  className="qp-question-label"
  style={{ whiteSpace: 'normal', overflowWrap: 'break-word' }}
>
          {questions[current]}
        </Title>

        <FormLayout>
          <FormLayoutGroup mode="vertical">
            {labels.map((label, index) => (
              <div
                key={index}
                className={`qp-answer-wrapper ${hoveredIndex === index ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ width: answerWidth ? `${answerWidth}px` : 'auto' }}
              >
                <Radio
                  name={`q_${current}`}
                  value={String(index)}
                  checked={value === String(index)}
                  onChange={() => setValue(String(index))}
                  className="qp-answer-radio"
                >
                  {label}
                </Radio>
              </div>
            ))}
          </FormLayoutGroup>
        </FormLayout>

        <Div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button size="l" disabled={value == null} onClick={next}>
            {current === questions.length - 1 ? 'Завершить' : 'Далее'}
          </Button>
        </Div>
      </Div>
    </Panel>
  );
}

