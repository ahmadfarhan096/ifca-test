import React, { Fragment, useEffect, useState } from 'react';
import { Layout, Checkbox, Avatar, Breadcrumb, Input, Button, Modal, Space, Table, Row, Col, Select, Popconfirm, Menu, Form } from 'antd';
import { UserOutlined, DeleteFilled, SearchOutlined, EditFilled, PlusCircleOutlined } from '@ant-design/icons'
import './user-list.scss'
import UserForm from '../user-form/user-form';

const UserList = () => {

    const { Header, Content, Footer, Sider } = Layout;
    const { Option } = Select;


    const usersData = [];


    const initialFormState = {
        id: null,
        name: '',
        email: '',
        phone: '',
        address: ''
    }

    const [users, setUsers] = useState(usersData)
    const [user, setUser] = useState(initialFormState)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null)
    const [result, setResult] = useState([]);

    //integration - status api
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('')

    const fetchApi = async () => {
        try {
            setStatus('loading')
            const response = await fetch('http://localhost:4000/users', { method: 'GET' })
            const data = await response.json()
            console.log(data)

            //call data from backend
            setUsers(data.data)
            setResult(data.data);
            setStatus('success')
        }
        catch (error) {
            setStatus('error')
        }
    }

    useEffect(() => {
        //fetch api must have sync
        fetchApi()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <span>{record.name}</span>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text, record) => (
                <span>{record.email}</span>
            ),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (text, record) => (
                <span>{record.phone}</span>
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => (
                <span>{record.address}</span>
            ),
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => onAction('edit',record)}><EditFilled /></Button>
                    <Popconfirm title="Are you sure？" okText="Yes" onConfirm={() => onDelete(record.id)} cancelText="No">
                        <Button danger ><DeleteFilled /></Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    const addUser = (user) => {
        user.id = users.length + 1
        setUsers([...users, user])
    }

    const updateUser = (user) => {
        setUser({
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address
        })
    }

    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id))
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }


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

    const onAction = (type, data) => {
        if(type==='add'){
            setModalContent(
                <UserForm onSuccess={() => {
                    handleCancel();
                    fetchApi()
                }}/>
            )
            setIsModalVisible(true)
        }
        else if(type==='edit'){
            setModalContent(
                <UserForm data={data} onSuccess={() => {
                    handleCancel();
                    fetchApi()
                }}/>
            )
            setIsModalVisible(true)
        }
    }

    const onDelete = async (id)=>{
        const response = await fetch(`http://localhost:4000/user/${id}`, {
            method: 'DELETE',
        })
        fetchApi()
    }

    console.log(users)


    return (

        <Layout style={{ backgroundColor: 'white' }}>

            <div className='page-container'>


                <Row gutter={16}>
                    <div className='header'>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <div style={{ display: 'flex' }}>

                                <span style={{
                                    fontWeight: 600,
                                    fontSize: '20px'
                                }}>User Administrator System</span>
                            </div>
                        </Col>

                        <Col lg={12} md={12} sm={12} xs={12}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                                <Avatar
                                    size={30}
                                    icon={<UserOutlined />}
                                />

                            </div>
                        </Col>
                    </div>
                </Row>

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
                            <Breadcrumb.Item style={{ fontSize: '18px', fontWeight: '500', color: '#442F84' }}>
                                {/* <a href="">Application Center</a> */} USER LIST
                            </Breadcrumb.Item>
                            {/* <Breadcrumb.Item>An Application</Breadcrumb.Item> */}
                        </Breadcrumb>
                    </div>

                    <div className="section">
                        <Row gutter={[16, 16]} align="middle" className="filter" justify="space-between">
                            {/* <div className="filter"> */}
                                <Col lg={6} md={6} sm={24} xs={24}>
                                    <Input
                                        type="search"
                                        placeholder="Search user name here"
                                        onChange={(e) => {
                                            let { value, name } = e.target;
                                            value = value.toLowerCase();

                                            setResult(users.filter(o => {
                                                return o.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                                                o.email.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                                                o.phone.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                                                o.address.toLowerCase().indexOf(value.toLowerCase()) !== -1
                                            }))
                                        }}
                                    />
                                </Col>

                                {/* <Col lg={6} md={6} sm={24} xs={24}>
                                    <Select style={{ width: '100%' }} onChange={handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="jack">Lucy</Option>
                                        <Option value="jack">Abraham</Option>
                                    </Select>
                                </Col>

                                <Col lg={6} md={6} sm={24} xs={24}>
                                    <Button><SearchOutlined /></Button>
                                </Col> */}

                                <Col lg={6} md={6} sm={24} xs={24}>

                                    <Button 
                                    onClick={()=>onAction('add')} 
                                    size='large' 
                                    style={{ backgroundColor: '#CF4392', color: 'white', borderRadius: '20px', border: 'none' }}>
                                        <span>Add User</span><PlusCircleOutlined />
                                    </Button>

                                </Col>

                            {/* </div> */}
                        </Row>
                    </div>

                    <div>
                        <Row gutter={16}>
                            <Col lg={24} md={24} sm={24} xs={24}>
                                <div style={{ padding: '10px', borderRadius: '10px', background: 'white' }}>
                                    <Table
                                        style={{ width: '100%' }}
                                        dataSource={result.length > 0 ? result : users}
                                        columns={columns}
                                        pagination={false}
                                        scroll={{ x: 10 }}
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
                    { modalContent}
                    {/* <div style={{ margin: '5px' }}>
                        <UserForm />
                    </div> */}

                </Modal>


                <Footer style={{ textAlign: 'center', position: 'fixed', bottom: '0', left: '0', width: '100%', backgroundColor: 'white', boxShadow: ' grey' }}>

                    Web Design ©2021 Created by ahmadfarhan096

                </Footer>
            </div>
        </Layout>
    )
}

export default UserList;