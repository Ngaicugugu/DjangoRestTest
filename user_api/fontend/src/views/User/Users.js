import React from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

class Users extends React.Component {
    state = {
        users: [],
        editUserId: null,
        editedUserName: '',
        editedUserEmail: '',
    };

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        axios.get('http://127.0.0.1:8000/api/user')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(error => {
                console.error(error);
            });
    };

    handleEditClick = (userId, username, email) => {
        this.setState({
            editUserId: userId,
            editedUserName: username,
            editedUserEmail: email,
        });
    };

    handleSaveClick = () => {
        const { editUserId, editedUserName, editedUserEmail } = this.state;
        // Gửi cuộc gọi API PUT để cập nhật thông tin người dùng
        axios.put(`http://127.0.0.1:8000/api/user/${editUserId}/`, {
            username: editedUserName,
            email: editedUserEmail,
        })
            .then(() => {
                this.fetchUsers();
                this.setState({ editUserId: null });
            })
            .catch(error => {
                console.error(error);
            });
    };

    render() {
        return (
            <>
                <div style={{ display: 'flex', flexDirection: 'column', width: 'full', justifyContent: 'center', alignItems: 'center', paddingTop: '80px' }}>

                    <h1 style={{ paddingBottom: '30px', textDecoration: 'underline', textDecorationColor: 'red' }}>User List</h1>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <ul style={{ listStyleType: 'inherit' }}>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.users.map((user) => (
                                        <tr key={user.user_id}>
                                            <td style={{ fontWeight: '600' }}>{user.user_id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button onClick={() => this.handleEditClick(user.user_id, user.username, user.email)} style={{ backgroundColor: 'orange', fontSize: '1.2rem', fontWeight: 600, minWidth: '100px', borderRadius: '5px' }}>Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </ul>

                        {this.state.editUserId && (
                            <div>
                                <input
                                    type="text"
                                    value={this.state.editedUserName}
                                    onChange={e => this.setState({ editedUserName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={this.state.editedUserEmail}
                                    onChange={e => this.setState({ editedUserEmail: e.target.value })}
                                />
                                <button onClick={this.handleSaveClick}>Save</button>
                            </div>
                        )}
                    </div>
                </div>
            </>

        );
    }
}

export default Users;