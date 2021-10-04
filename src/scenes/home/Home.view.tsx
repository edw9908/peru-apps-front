import { FC, useEffect, useState } from 'react';
import { userService, sedeService } from '../../network/services';
import { useHistory } from 'react-router-dom';
import { CardComponent } from '../../components';
import { Row, Modal } from 'antd';
import { BookOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { IUser } from '../../store/user/reducer';
import actionTypesUser from '../../store/user/actionTypes';
import actionTypesSede from '../../store/sede/actionTypes';

/*interface IUser {
    name: string,
    _id: string,
    last_name: string,
    additionals: any,
    sede: string,
    mobile_phone: string,
    username: string
}*/

const Home: FC = (props) => {

    let history = useHistory();
    //const [userList, setUserList] = useState<Array<IUser>>([]);
    const dispatch = useDispatch();
    const userList = useSelector((state: IRootState) => state.user.users)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(0);
    const sedeList = useSelector((state: IRootState) => state.sede.sedes);
    //const [sedeList, setSedeList] = useState<Array<ISede>>([]);
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    useEffect(() => {
        dispatch({type: actionTypesUser.GET_USER_LIST})
        userService.listUsers().then(
            (res: any) => {
                //setUserList(res.data.data)
                dispatch({type: actionTypesUser.GET_USER_LIST_SUCCESS, payload: {users: res.data.data}});
            }
        ).catch(
            (err) => {
                history.push('/login')
            }
        )
        dispatch({type: actionTypesSede.GET_SEDE_LIST})
        sedeService.getAllSedes().then(
            (res: any) => {
                dispatch({type: actionTypesSede.GET_SEDE_LIST_SUCCESS, payload: {sedes: res.data.data}})
            }
        ).catch(
            (err) => {
                history.push('/login')
            }
        )
    }, [])

    return(
        <div style={{margin: '20px'}}>
            <div style={{fontSize: '30px', fontWeight: 'bold', marginBottom: '20px'}}>Lista de usuarios</div>
            <Row gutter={40}>
                {userList.value.map((el: IUser, id) => (<CardComponent key={el._id} user={el} span={6} onClick={() => {setIsModalVisible(!isModalVisible);setSelectedUser(id)}}/>))}
            </Row>
            <Modal title="Perfil" visible={isModalVisible} centered={true} footer={null} onCancel={handleCancel}>
                <div style={{fontSize: '30px', fontWeight: 'bold', marginBottom: '15px'}}>{userList.value[selectedUser]?.name} {userList.value[selectedUser]?.last_name}</div>
                <div style={{marginBottom: '20px', fontSize: '20px'}}>{userList.value[selectedUser]?.additionals?.profile}</div>
                <div style={{fontSize: '20px', marginBottom: '15px'}}><BookOutlined style={{color: '#4f5bb3', marginRight: '10px'}}/>{userList.value[selectedUser]?.additionals?.specialization}</div>
                <div style={{fontSize: '20px', marginBottom: '15px'}}><EnvironmentOutlined style={{color: '#4f5bb3', marginRight: '10px'}}/>{sedeList.value.find(el => el._id === userList.value[selectedUser]?.sede)?.name}</div>
                <div style={{fontSize: '20px', marginBottom: '15px'}}><PhoneOutlined style={{color: '#4f5bb3', marginRight: '10px'}}/>{userList.value[selectedUser]?.mobile_phone}</div>
                <div style={{fontSize: '20px', marginBottom: '15px'}}><MailOutlined style={{color: '#4f5bb3', marginRight: '10px'}}/>{userList.value[selectedUser]?.username}</div>
            </Modal>
        </div>
    );
}

export default Home;