import React from 'react';
import { Layout } from 'antd';
import { Icon, Button, Typography, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import UserAction from './UserAction';

const { Text } = Typography;
const { Header } = Layout;

const Head = ({toggleDraw, showDraw, setLog, logged}) => {
  
  return [
    <Header style={{ backgroundColor: 'white' }} key='0'>
      {logged && <Button type="link" size='large' onClick={() => toggleDraw(!showDraw)}>
        <Icon type={showDraw ? "menu-fold" : "menu-unfold"} />
      </Button>}
      <Link to='/'>
      <Text strong>Agri-X</Text>
      </Link>
      <span style={{ float: 'right' }}>
        { logged && <Button type="link" size='large'>
          <Icon type="bell" />
        </Button>}
        {<Tooltip
        placement="left"
        title='Login'
        visible={!logged}
      >
        <UserAction logged={logged} setLogged={setLog}/>
        </Tooltip>}
      </span>
    </Header>,
      <div style={{height:3, backgroundImage: `linear-gradient(to right, #A33582, #17468B)`}} key='1'></div>
  ];
}

export default Head;
