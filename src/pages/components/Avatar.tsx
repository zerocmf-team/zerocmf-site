import { Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons';

const MyAvatar = (props: any) => {

    const { avatar = "",nickname = "" } = props

    if(avatar) {
        return <Avatar src={avatar} />
    }

    if(nickname === "") {
        return <Avatar icon={<UserOutlined />} />
    }

    return <Avatar
        style={{ backgroundColor: '#108ee9', verticalAlign: 'middle' }}
        size="default"
        gap={4}
    >
        {nickname &&
            nickname.substring(0, 1).toUpperCase()}
    </Avatar>
}
export default MyAvatar