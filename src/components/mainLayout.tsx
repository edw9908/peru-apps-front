import React, { FC, useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { Navbar } from './'

const MainLayout: FC = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed)
    };

    return (
        <Layout style={{height: '100vh'}}>
            <Navbar collapsed={collapsed}/>
            <Layout>
                <Layout.Header className="main-header">
                    {collapsed ? (
                        <MenuUnfoldOutlined className="sidebar-trigger" onClick={toggle} />
                    ) : (
                        <MenuFoldOutlined className="sidebar-trigger" onClick={toggle} />
                    )}
                </Layout.Header>
                <Layout.Content>{props.children}</Layout.Content>
            </Layout>
        </Layout>
    );
}

export default MainLayout;