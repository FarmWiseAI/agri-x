import React , { useState } from 'react';
import { Table, Input, Button, Icon, Progress, Divider, notification, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import DownloadDialog from './downloadDialog';
import data from './../mocks/analysisMock';


const defaultSearchText = '';
const defaultDownload = false;
function compareByAlph (a, b) { if (a > b) { return -1; } if (a < b) { return 1; } return 0; };
const { confirm } = Modal;

function Job(){
    const [searchText,setSearchText] = useState(defaultSearchText);
    const [download,setDownload] = useState(defaultDownload);

    let searchInput = null;


    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
        </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
        </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });
    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            //width: '5%',
            sorter: (a, b) => a.key - b.key
        },
        {
            title: 'Department',
            dataIndex: 'description',
            key: 'description',
            //width: '15%',
            ...getColumnSearchProps('description'),
            sorter: (a, b) => compareByAlph(a.description, b.description)
        },
        {
            title: 'Submitted By',
            dataIndex: 'name',
            key: 'name',
            //width: '15%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => compareByAlph(a.name, b.name)
        },
        {
            title: 'Created On',
            dataIndex: 'createdOn',
            key: 'createdOn',
            sorter: (a, b) => compareByAlph(a.createdOn, b.createdOn)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ...getColumnSearchProps('status'),
            sorter: (a, b) => compareByAlph(a.status, b.status)
    
        },
        {
            title: 'Completed(%)',
            dataIndex: 'completed',
            key: 'completed',
            ...getColumnSearchProps('completed'),
            sorter: (a, b) => compareByAlph(a.completed, b.completed),
            render: c => <Progress strokeColor={c === 100 ? {'0%': '#108ee9','100%': '#87d068'} : null} percent={c} status={(c < 100)?"active":"success"} />
        },
        {
            title: 'Actions',
            //width: '15%',
            render: c => {
                return c.status === 'Completed' ? <span>
                    <Link to={`results`}><Button type='link'><Icon type="eye" /></Button> </Link>
                    <Divider type='vertical' />
                    <Button type='link' onClick={() => showDownload(true)}><Icon type="download" /></Button>
                    <Divider type='vertical' />
                    <Button type='link'  onClick={openNotification}><Icon type="mail" /></Button>
                </span> : <div style={{ textAlign: 'center' }}>--</div>
            }
        }
    ];

    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText(defaultSearchText);
    };

    const showDownload = (val) => {
        setDownload(val);
    }

    const openNotification = () => {
        confirm({
            title: 'Confirm',
            content: 'Do you wish to send the details to your registered e-mail id?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
              notification.open({
                  message: 'Mail Sent...',
                  description:
                      'A mail has been sent to your registered e-mail id. You may click on the link to view the details.',
                  icon: <Icon type="mail" style={{ color: '#108ee9' }} />,
              });
            }
          });
    };

    return (
        <>
        <DownloadDialog open={download} close={showDownload} />
        <Table columns={columns} dataSource={data} />
        </>
    );
}



export default Job;
