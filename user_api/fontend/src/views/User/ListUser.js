import React from 'react';
import axios from 'axios';



class ListUser extends React.Component {

    state = {
        listUsers: []
    }

    handelOnclick = (user) => {
        this.props.history.push(`/user/${user.id}`)
    }

    async componentDidMount() {
        let res = await axios.get('http://127.0.0.1:8000/api/user')
        this.setState({
            listUsers: res ? res.data : []
        })
    }

    render() {
        let { listUsers } = this.state
        console.log("check", listUsers)

        return (
            <div className='list-user-container'>
                <div className='title'>
                    Fetch all list users
                </div>
                <div className='list-user-content'>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <table border="1px soild black">
                                    <tr>
                                        <th>STT</th>
                                        <th>Email</th>
                                        <th>UserName</th>
                                        <th>Edit</th>
                                    </tr>

                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.username}</td>
                                        <td><button onClick={() => this.handelOnclick(item)}>Edit</button></td>
                                    </tr>
                                </table>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ListUser