import React from 'react'
import ReactDom from 'react-dom'

export default class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            url: '/api/users',
            pagination: [],
        }
    }

    componentWillMount() {
        this.fetchUsers()
    }

    fetchUsers() {
        let $this = this;

        axios.get(this.state.url).then(response => {
            $this.setState({
                data: $this.state.data.length > 0 ? $this.state.data.concat(response.data.data) : response.data.data,
                url: response.data.next_page_url
            })
            $this.makePagination(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    loadMore() {
        this.setState({
            url: this.state.pagination.next_page_url
        })

        this.fetchUsers()
    }

    makePagination(data) {
        let pagination = {
            current_page: data.current_page,
            last_page: data.last_page,
            previous_page: data.previous_page,
            next_page_url: data.next_page_url,
        }

        this.setState({
            pagination: pagination,
        })
    }

    render() {
        return (
            <div className="pt-3">
                <h2>Users Listing <span className="float-right"><a href="/users/create"
                                                                   className="btn btn-sm btn-success">Add New User</a></span>
                </h2>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map((user, i) =>
                            (
                                <UserRow key={i} i={i} user={user} object={this}/>
                            )
                        )
                    }
                    </tbody>
                </table>

                <button className="btn btn-default" onClick={this.loadMore.bind(this)}>Load More Results</button>
            </div>
        )
    }
}

class UserRow extends React.Component {
    deleteUser(user, object) {
        console.log(user);
        console.log(object);

        var $this = object;
        axios.delete('/api/users/' + user.id).then(response => {
            console.log(response);

            const newState = $this.state.data.slice();
            newState.splice(newState.indexOf(user), 1);
            $this.setState({
                data: newState
            })
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <tr key={this.props.user.id}>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.email}</td>
                <td>
                    <a href={"/users/" + this.props.user.id + "/edit"} className="btn btn-primary btn-sm">Edit</a>|
                    <a href="javascript:;" className="btn btn-danger btn-sm"
                       onClick={this.deleteUser.bind(this, this.props.user, this.props.object)}> Delete</a>
                </td>
            </tr>
        )
    }
}

if (document.getElementById('app')) {
    ReactDom.render(<Users/>, document.getElementById('app'))
}

