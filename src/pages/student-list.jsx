import React, { Fragment, useEffect, useState } from 'react';
import { Layout, Checkbox, Avatar, Breadcrumb, Input, Button, Modal, Space, Table, Row, Col, Select, Menu, Form } from 'antd';
import { UserOutlined, DeleteFilled , SearchOutlined, EditFilled, PlusCircleOutlined } from '@ant-design/icons'
import './student-list.scss'

const StudentList = () => {

    const [input, setInput] = useState
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { Header, Content, Footer, Sider } = Layout;
    const { Option } = Select;

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showEdit = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const dataSource = [
        {
            key: '1',
            name: 'Ahmad Faris Bin Akmal',
            email: 'faris@gmail.com',
            phone: '01116949905',
            address: 'Petaling Jaya, Selangor',
         
        },
        {
            key: '2',
            name: 'Gurvin Sigh',
            email: 'gurvin@gmail.com',
            phone: '0179876089',
            address: 'Puchong, Selangor',
          
        },
        {
            key: '3',
            name: 'Izzudin',
            email: 'gurvin@gmail.com',
            phone: '0179876089',
            address: 'Puchong, Selangor',
        },
        {
            key: '4',
            name: 'Mary',
            email: 'gurvin@gmail.com',
            phone: '0179876089',
            address: 'Puchong, Selangor',
           
        },
        {
            key: '5',
            name: 'David',
            email: 'gurvin@gmail.com',
            phone: '0179876089',
            address: 'Puchong, Selangor',
           
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: name=>{
                return <a>{name}</a>
                test
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={showEdit}><EditFilled /></Button>
                    <Button danger ><DeleteFilled /></Button>
                </Space>
            ),
        },
    ];

    return (

        <Layout>
            <div className='page-container'>

                <Header style={{
                    boxShadow: '1px 1px 1px grey',
                    width: '100%',
                    background: 'linear-gradient(218.41deg, #442F84 14.07%, #CF4392 75.34%)',
                    color: 'white',
                    display: 'flex'
                }}>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <div style={{ display: 'flex' }}>

                            <span style={{
                                fontWeight: 600,
                                fontSize: '20px'
                            }}>User Administrator System</span>
                        </div>
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}>
                            <Col></Col>
                            <Col></Col>
                            <Col> <Avatar
                                size={30}
                                icon={<UserOutlined />}
                            /></Col>
                        </div>
                    </Col>



                    {/* </div> */}


                </Header>
                <Layout style={{ height: '1000px', backgroundColor: 'white' }}>

                    {/* <Sider style={{backgroundColor:'white', borderRight:'1px solid grey'}}>


                </Sider> */}
                    <Content>
                        {/* Table for User List */}
                        <div style={{
                            padding: '4em',
                            alignSelf: 'center',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'

                        }}>

                            <div style={{ marginBottom: '30px' }}>
                                <Breadcrumb>
                                    <Breadcrumb.Item style={{ fontSize: '18px', fontWeight: '500' }}>DASHBOARD</Breadcrumb.Item>
                                    <Breadcrumb.Item style={{ fontSize: '18px', fontWeight: '500', color:'#442F84' }}>
                            {/* <a href="">Application Center</a> */} USER LIST
                        </Breadcrumb.Item>
                                    {/* <Breadcrumb.Item>An Application</Breadcrumb.Item> */}
                                </Breadcrumb>
                            </div>


                            <div style={{ display: 'flex', gap: '5px', padding: '10px' }}>
                                <Col lg={6} md={6} sm={24} xs={24}>
                                    <Input
                                        placeholder="Search user name here"
                                    />
                                </Col>

                                <Col lg={6} md={6} sm={24} xs={24}>
                                    <Select style={{ width: '100%' }} onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="jack">Lucy</Option>
                                        <Option value="jack">Abraham</Option>
                                    </Select>
                                </Col>

                                <Col lg={6} md={6} sm={24} xs={24}>
                                    <Button><SearchOutlined /></Button>
                                </Col>

                                <Col lg={6} md={6} sm={24} xs={24}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight:'1em' }}>
                                        <Button onClick={showModal} size='large'
                                            style={{ backgroundColor: '#CF4392', color: 'white', borderRadius: '20px', border: 'none' }}>
                                            <span>Add User</span><PlusCircleOutlined />
                                        </Button>
                                    </div>
                                </Col>
                            </div>

                            <div>
                                <Row gutter={16}>
                                    <Col lg={24} md={24} sm={24} xs={24}>
                                        <div style={{ padding: '10px', borderRadius: '10px', background: 'white' }}>
                                            <Table
                                                dataSource={dataSource}
                                                columns={columns}
                                                pagination={false}
                                            />
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        </div>

                        <Modal
                            title="Add New User"
                            visible={isModalVisible}
                            closable={false}
                            onCancel={handleCancel}
                            footer={null}
                        >

                            <div style={{ margin: '5px' }}>
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input name here!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Phone"
                                        name="phone"
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Address"
                                        name="address"
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Done
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>

                        </Modal>
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center', position: 'fixed', bottom: '0', left: '0', width: '100%', backgroundColor: 'white', boxShadow: ' grey' }}>

                    Web Design ©2021 Created by ahmadfarhan096

                </Footer>
            </div>
        </Layout>
    )
}

export default StudentList;