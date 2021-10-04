import { FC, useEffect, useState } from 'react';
import { Col, Form, Input, Row, Select, Button } from 'antd';
import { userService, sedeService } from '../../network/services';
import { parseJwt } from '../../network/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store'
import actionTypesUser from '../../store/user/actionTypes';
import actionTypesSede from '../../store/sede/actionTypes';

interface ISede {
    name: string,
    _id: string
}

interface IUser {
    additionals?: any;
}

const Profile: FC = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    //const [user, setUser] = useState<IUser>({});
    const user = useSelector((state: IRootState) => state.user.loggedInUser);
    //const [sedeList, setSedeList] = useState<Array<ISede>>([]);
    const sedeList = useSelector((state: IRootState) => state.sede.sedes);

    useEffect(() => {
        let user_id = parseJwt(String(localStorage.getItem('accessToken')))._id;
        dispatch({type: actionTypesUser.UPDATE_USER})
        userService.getUser(user_id).then(
            (res: any) => {
                dispatch({type: actionTypesUser.UPDATE_USER_SUCCESS, payload: {user: res.data.data}});
                //setUser(res.data.data);
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
                //setSedeList(res.data.data)
            }
        ).catch(
            (err) => {
                history.push('/login')
            }
        )
    }, [])

    useEffect(() => {
        console.log(user)
        let additionals = user.value && user.value.additionals ? {profile: user.value.additionals.profile, specialization: user.value.additionals.specialization} : {};
        form.setFieldsValue({...user.value, ...additionals});
    }, [user])

    const onFinish = (values: any) => {
        let user_id = parseJwt(String(localStorage.getItem('accessToken')))._id;
        userService.updateProfile(user_id, {
            additionals: {
                profile: values.profile, specialization: values.specialization
            },
            username: values.username,
            mobile_phone: values.mobile_phone,
            sede: values.sede
        })
    }

    return(
        <div style={{margin: '20px'}}>
            <div style={{fontSize: '30px', fontWeight: 'bold', marginBottom: '10px'}}>Cuéntanos sobre ti</div>
            <div style={{fontSize: '15px', fontWeight: 'bold', marginBottom: '20px'}}>Esta información la podrán ver las demás personas</div>
            <div style={{padding: '20px'}}>
                <Form
                    name="profileForm"
                    autoComplete="off"
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="profile"
                        label="Perfil"
                        labelCol={{span: 24}}
                        required={false}
                        rules={[{ required: true, message: 'Campo obligatorio' }]}
                    >
                        <Input placeholder="Escribe aqui..." size="large" style={{borderRadius: '10px'}}/>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="specialization"
                                label="Programa de especialización"
                                labelCol={{span: 24}}
                                required={false}
                                rules={[{ required: true, message: 'Campo obligatorio' }]}
                            >
                                <Input placeholder="Escribe aqui..." size="large" style={{borderRadius: '10px'}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="mobile_phone"
                                label="Celular"
                                labelCol={{span: 24}}
                                required={false}
                                rules={[{ required: true, message: 'Campo obligatorio', pattern: new RegExp("[+]519[0-9]{8}") }]}
                            >
                                <Input placeholder="Escribe aqui..." size="large" style={{borderRadius: '10px'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="sede"
                                label="Sede"
                                labelCol={{span: 24}}
                                required={false}
                                rules={[{ required: true, message: 'Campo obligatorio' }]}
                            >
                                <Select placeholder="Seleccione una sede" size="large">
                                    {sedeList.value.map((sede) => {return(<Select.Option key={sede._id} value={sede._id}>{sede.name}</Select.Option>)})}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="username"
                                label="Correo"
                                labelCol={{span: 24}}
                                required={false}
                                rules={[{ required: true, message: 'Campo obligatorio', type: 'email' }]}
                            >
                                <Input placeholder="Escribe aqui..." size="large" style={{borderRadius: '10px'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{width: '100%'}}>
                        <div style={{width: '400px', marginLeft: 'auto'}}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="primary-button" size="large" shape="round">
                                    Continuar
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Profile;