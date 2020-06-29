import React, { useState } from 'react';
import { Timeline, Modal, Checkbox, Icon, Tag, Divider, Button, Row, Col } from "antd";

const CheckboxGroup = Checkbox.Group;
const { Item: TimelineItem } = Timeline;
const plainOptions = ['Crop profile','NDVI Timeline', 'Date of Sowing', 'Crop yield'];
const defaultCheckedList = ['NDVI Timeline', 'Crop yield', 'Crop profile'];
function DownloadOptions({ open, close }) {
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const onChange = checkedList => {
        setCheckedList(checkedList);
    };

    return (
        <Modal
            title="Download Options"
            visible={open}
            onCancel={() => close(false)}
            centered
            width='50%'
            footer={null}
        >
            <div style={{ height: 400 }}>
                <Timeline pending="Output Types">
                    <TimelineItem dot={<Icon type="idcard" style={{ fontSize: '16px' }} />}><Row><Col span={4}>ID</Col><Col span={6}><Tag color="#f50">621821</Tag></Col></Row></TimelineItem>
                    <TimelineItem dot={<Icon type="bank" style={{ fontSize: '16px' }} />}><Row><Col span={4}>Department</Col><Col span={6}><Tag color="#f50">Thiruvarur</Tag></Col></Row></TimelineItem>
                    <TimelineItem dot={<Icon type="smile" style={{ fontSize: '16px' }} />}><Row><Col span={4}>Submitted By</Col><Col span={6}><Tag color="#f50">Farmwise</Tag></Col></Row></TimelineItem>
                    <TimelineItem dot={<Icon type="schedule" style={{ fontSize: '16px' }} />}><Row><Col span={4}>Created On</Col><Col span={6}><Tag color="#f50">2019-06-29</Tag></Col></Row></TimelineItem>
                    <TimelineItem dot={<Icon type="bug" style={{ fontSize: '16px' }} />}><Row><Col span={4}>Crop Type</Col><Col span={6}><Tag color="#f50">Rice</Tag></Col></Row></TimelineItem>
                    <TimelineItem dot={<Icon type="calendar" style={{ fontSize: '16px' }} />}><Row><Col span={4}>Date Range</Col><Col span={10}><Tag color="#f50">2020-10-01</Tag> to <Tag color="#f50">2020-12-31</Tag></Col></Row></TimelineItem>
                </Timeline>
                <CheckboxGroup
                    style={{ float: 'left', paddingLeft: '30px', marginBottom: '20px' }}
                    options={plainOptions}
                    value={checkedList}
                    onChange={onChange}
                />
                <Divider />
                <Button type="primary" icon="download" style={{ float: 'right' }} onClick={() => close(false)}>
                    Download
                </Button>
            </div>

        </Modal >
    )
}

export default DownloadOptions;
