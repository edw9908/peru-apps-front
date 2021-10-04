import { FC } from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import {
    UserOutlined,
    HomeOutlined,
    MessageOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import actionTypes from '../store/user/actionTypes';

interface IOwnProps {
    collapsed: boolean
}

const Navbar: FC<IOwnProps> = ({children, collapsed}) => {

    let history = useHistory();
    const dispatch = useDispatch();

    const goToPath = (path: string) => {
        history.push(path);
    }

    const logout = () => {
        dispatch({type: actionTypes.USER_LOGOUT});
        localStorage.removeItem('accessToken');
        history.push('/login')
    }

    return (
        <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo-navbar" style={{padding: '5px'}}>
                <div>
                    <img src="https://picsum.photos/300/200" width="100%"/>
                </div>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => goToPath('/home')}>
                    Inicio
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />} onClick={() => goToPath('/profile')}>
                    Mi Cuenta
                </Menu.Item>
                <Menu.Item key="3" icon={<MessageOutlined />} onClick={() => goToPath('/messages')}>
                    Mensajes
                </Menu.Item>
                <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logout}>
                    Cerrar Sesión
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
}

export default Navbar;