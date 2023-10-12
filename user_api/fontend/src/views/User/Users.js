import React from 'react';
import axios from 'axios';

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
            <div>
                <h1>User List</h1>
                <ul>
                    {this.state.users.map(user => (
                        <li key={user.user_id}>
                            {user.username} - {user.email}
                            <button onClick={() => this.handleEditClick(user.user_id, user.username, user.email)}>Edit</button>
                        </li>
                    ))}
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
        );
    }
}

export default Users;