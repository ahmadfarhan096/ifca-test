import React, { Fragment, useEffect, useState } from 'react';
import { Input, Button, Modal, Space, Table, Row, Col, Select, Popconfirm, Menu, Form } from 'antd';
import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons'
import './user-form.scss'

const UserForm = ({ data, onSubmit, onSuccess }) => {

    const [editing, setEditing] = useState(false)


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

    const [user, setUser] = useState(initialFormState)

    useEffect(() => {
        console.log(data)
        if (data) {
            setUser(data)
        }
        else {
            setUser(initialFormState)
        }
    }, [data])

    console.log(user)
    const addUser = async (user) => {
        // body = what we will send to backend
        const response = await fetch('http://localhost:4000/user', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        })

    }

    const updateUser = async (user) => {
        const response = await fetch('http://localhost:4000/user', {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }


    const onSubmitForm = async (e) => {
        e.preventDefault();
        console.log('Success:', user);
        if (!data) {
            await addUser(user)
            onSuccess()
        }
        else if (data) {
            console.log({ ...data, ...user })
            await updateUser({ ...data, ...user })
            onSuccess()
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <Form
            
            name="basic"
            labelCol={{ span: 8, }}
            wrapperCol={{ span: 16, }}
            initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinish={(user) => {
        //     if (!user.name) return
        //     console.log(user)
        //     addUser(user)
        //     setUser(initialFormState)
        // }}
        // onFinishFailed={onFinishFailed}

        >
            <Form.Item
                label="Name"
                required={true}
                // name="name"
                // value={user.name || ''}
                // onChange={handleInputChange} 
                rules={[
                    {
                        required: true,
                        message: 'Please input name here!',
                    },
                ]}
            >
                <Input
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                />
            </Form.Item>

            <Form.Item
                 required={true}
                label="Email"
            >
                <Input
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                />
            </Form.Item>

            <Form.Item
                 required={true}
                label="Phone"
            >
                <Input
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                />
            </Form.Item>

            <Form.Item
                 required={true}
                label="Address"
            >
                <Input
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" onClick={onSubmitForm}>
                    {data ? 'Edit' : 'Add'}
                </Button>
            </Form.Item>
        </Form>
    )

}

export default UserForm;