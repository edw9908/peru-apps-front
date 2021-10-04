import { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Layout, Form, Input, Button, DatePicker, Select } from 'antd';
import { sedeService, userService } from '../../../network/services';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../../store';
import actionTypesSede from '../../../store/sede/actionTypes';
import actionTypesUser from '../../../store/user/actionTypes';
import { parseJwt } from '../../../network/core/decodeToken';

interface ISede {
    name: string,
    _id: string
}

const Register: FC = (props) => {

    let history = useHistory();
    //const [sedeList, setSedeList] = useState<Array<ISede>>([]);
    const sedeList = useSelector((state: IRootState) => state.sede.sedes);
    const dispatch = useDispatch();

    const onFinish = (values: any) => {
        dispatch({type: actionTypesUser.LOGIN_USER})
        userService.register(values).then(
            (res) => {
                localStorage.setItem('accessToken', res.data.token);
                userService.getUser(parseJwt(res.data.token)._id).then(
                    (loggedUser: any) => {
                        dispatch({type: actionTypesUser.LOGIN_USER_SUCCESS, payload: {user: loggedUser.data.data}})
                        history.push('/home')
                    }
                )
            }
        )
    }

    const redirectLogin = () => {
        history.push('/login')
    }

    useEffect(() => {
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

    return(
        <Layout style={{minHeight: '100vh', backgroundColor: 'white'}}>
            <Row>
                <Col span={14}>
                    <div>
                        <img src='https://picsum.photos/2000/2000' width='100%' style={{height: '100vh'}}></img>
                    </div>
                </Col>
                <Col span={10}>
                    <div style={{padding: '30px', height: '100vh', overflowY: 'auto'}}>
                        <div style={{textAlign: 'center', fontSize: '30px', fontWeight: 'bolder', marginBottom: '40px'}}>
                            ¡Bienvenid@!
                        </div>
                        <Form
                            name="registerForm"
                            autoComplete="off"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="name"
                                label="Nombres"
                                labelCol={{span: 24}}
                                required={false}
                                rules={[{ required: true, message: 'Campo obligatorio' }]}
                            >
                                <Input placeholder="Escribe aqui..." size="large" style={{borderRadius: '10px'}}/>
                            </Form.Item>

                            <Form.Item
                                name="last_name"
                                label="Apellidos"
                                labelCol={{span: 24}}
                                required={false}
                                rules={[{ required: true, message: 'Campo obligatorio' }]}
                            >
                                <Input placeholder="Escribe aqui..." size="large" style={{borderRadius: '10px'}}/>
                            </Form.Item>

                            <Form.Item
                                name="username"
                                label="Correo"
                                labelCol={{span: 24}}
                                required={false}
                                rules={[{ required: true, message: 'Campo obligatorio', type: 'email' }]}
                            >
                                <Input placeholder="Escribe aqui..." size="large" style={{borderRadius: '10px'}}/>
                            </Form.Item>

                            <Form.Item
                                name="birth_date"
                                label="Fecha de nacimiento"
                                labelCol={{span: 24}}
                                required={false}
                                rules={[{ required: true, message: 'Campo obligatorio' }]}
                            >
                                <DatePicker placeholder="Fecha" size="large" style={{borderRadius: '10px', width: '100%'}}/>
                            </Form.Item>

                            <Form.Item
                                name="mobile_phone"
                                label="Celular"
                                labelCol={{span: 24}}
                                required={false}
                                rules={[{ required: true, message: 'Campo obligatorio', pattern: new RegExp("[+]519[0-9]{8}") }]}
                            >
                                <Input placeholder="Escribe aqui..." size="large" style={{borderRadius: '10px'}}/>
                            </Form.Item>

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

                            <Form.Item
                                name="password"
                                label="Contraseña"
                                labelCol={{span: 24}}
                                required={false}
                                rules={[{ required: true, message: 'Campo obligatorio' }]}
                            >
                                <Input.Password placeholder="Escribe aqui..." size="large" style={{borderRadius: '10px'}}/>
                            </Form.Item>

                            <Form.Item>
                                <Button type="link" style={{marginBottom: '20px'}} onClick={redirectLogin}>Si ya esta registrado ingrese a este enlace</Button>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="primary-button" size="large" shape="round">
                                    Ingresar
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}

export default Register;