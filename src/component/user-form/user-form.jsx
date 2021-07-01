import React, { Fragment, useEffect, useState } from 'react';
import { Input, Button, Modal, Space, Table, Row, Col, Select, Popconfirm, Menu, Form } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons'
import './user-form.scss'

const UserForm = () => {

    const usersData = [
        {
            id: '1',
            name: 'Ahmad Faris Bin Akmal',
            email: 'faris@gmail.com',
            phone: '01116949905',
            address: 'Petaling Jaya, Selangor',

        }
    ];

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
                    <Button onClick={() => updateUser(record.id)}><EditFilled /></Button>
                    <Popconfirm title="Are you sure？" okText="Yes" onConfirm={() => deleteUser(record.id)} cancelText="No">
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

    return (

        <Form
            name="basic"
            labelCol={{ span: 8, }}
            wrapperCol={{ span: 16, }}
            initialValues={{ remember: true, }}
            onFinish={(user) => {
                if (!user.name) return
                console.log(user)
                addUser(user)
                setUser(initialFormState)
            }}
            onFinishFailed={onFinishFailed}

        >
            <Form.Item
                label="Name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
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
                value={user.email}
                onChange={handleInputChange}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Address"
                name="address"
                value={user.address}
                onChange={handleInputChange}
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
    )

}

export default UserForm;