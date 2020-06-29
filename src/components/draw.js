import React from 'react';
import { List, Drawer, Avatar, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Item } = List;
const { Meta } = Item;
function Draw({ showDraw, toggleDraw, showUpload }) {
    const data = [
        {
            title: 'Home',
            icon: 'home',
            to: '/'
        },
        {
            title: 'Analysis',
            icon: 'stock',
            to: 'analysis'
        },
        {
            title: 'Import',
            icon: 'import',
            handler: showUpload
        },
        {
            title: 'Export',
            icon: 'export',
            handler: () => { }
        },
    ];
    const drawertitle = ({ to, title, handler }) => {
        return to ? <Link style={{ color: '#1890ff' }} to={to} onClick={() => toggleDraw(false)}>{title}</Link> : <Button type="link" onClick={() => { toggleDraw(false); handler(true) }} style={{ fontWeight: 500, padding: 0 }}>{title}</Button>
    }
    return (
        <Drawer
            placement="left"
            closable={false}
            visible={showDraw}
            style={{ marginTop: 67 }}
        >
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <Item>
                        <Meta
                            avatar={<Avatar style={{ backgroundColor: '#FFFFFF', color: '#1890ff' }} icon={<Icon type={item.icon} />} />}
                            title={drawertitle(item)}
                        />
                    </Item>
                )}
            />
        </Drawer>
    )
}

export default Draw;
