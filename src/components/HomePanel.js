import React from 'react';
import {
  Panel,
  PanelHeader,
  Div,
  Avatar,
  Title,
  Button
} from '@vkontakte/vkui';

export default function HomePanel({ id, userInfo, go }) {
  return (
    <Panel id={id}>
      <PanelHeader>Тест на ПТСР</PanelHeader>
      <Div style={{ textAlign: 'center', paddingTop: 16 }}>
        {userInfo && (
          <>
            <Avatar size={96} src={userInfo.photo_200} />
            <Title level="2" weight="medium" style={{ marginTop: 12 }}>
              {userInfo.first_name}, привет!
            </Title>
          </>
        )}
        <Div style={{ marginTop: 16 }}>
          Нажми кнопку, чтобы начать тест:
        </Div>
        <Button
          size="l"
          mode="primary"
          onClick={() => go({ type: 'start' })}
        >
          Начать тест
        </Button>
      </Div>
    </Panel>
  );
}
