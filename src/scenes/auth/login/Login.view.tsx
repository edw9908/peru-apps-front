import { FC } from 'react';
import { Row, Col, Layout, Form, Input, Button } from 'antd';
import { userService } from '../../../network/services';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { parseJwt } from '../../../network/core/decodeToken';
import actionTypes from '../../../store/user/actionTypes';

const Login: FC = (props) => {

    let history = useHistory();
    const dispatch = useDispatch();

    const redirectRegister = () => {
        history.push('/signup');
    }

    const onFinish = (values: any) => {
        dispatch({type: actionTypes.LOGIN_USER})
        userService.login(values).then(
            (res) => {
                localStorage.setItem('accessToken', res.data.token);
                userService.getUser(parseJwt(res.data.token)._id).then(
                    (loggedUser: any) => {
                        dispatch({type: actionTypes.LOGIN_USER_SUCCESS, payload: {user: loggedUser.data.data}})
                        history.push('/home')
                    }
                )
            }
        ).catch(
            (err) => {
                history.push('/login')
            }
        )
    }

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
                                name="username"
                                label="Correo"
                                labelCol={{span: 24}}
                                required={false}
                                rules={[{ required: true, message: 'Campo obligatorio', type: 'email' }]}
                            >
                                <Input placeholder="Escribe aqui..." size="large" style={{borderRadius: '10px'}}/>
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
                                <Button type="link" style={{marginBottom: '20px'}} onClick={redirectRegister}>Si aún no tiene una cuenta ingrese a este enlace</Button>
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

export default Login;