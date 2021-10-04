import { FC } from 'react';
import { Card, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

interface IProps {
    user: any,
    span: number,
    onClick: any
}

const CardComponent: FC<IProps> = ({children, user, span, onClick}) => {

    return(
        <Col lg={span} md={span + 2} xs={24}  style={{marginBottom: '30px'}}>
            <Card
                style={{height: '100%'}}
                cover={
                    <img src="https://picsum.photos/200/200"/>
                }
                actions={[
                    <div style={{color: '#4f5bb3', fontSize: '14px', fontWeight: 'bold'}} onClick={onClick}><PlusCircleOutlined /> Ver más</div>
                ]}
            >
                <div style={{textAlign: 'center', fontSize: '15px', fontWeight: 'bold'}}>
                    {user.name} {user.last_name}
                </div>
            </Card>
        </Col>
    );
}

export default CardComponent;