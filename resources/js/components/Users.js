import React from 'react'
import ReactDom from 'react-dom'

export default class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        let $this = this;

        axios.get('/api/users').then(response=>{
            $this.setState({
                data: response.data
            })
        }).catch(error=>{
            console.log(error)
        })
    }

    render() {
        return (
            <div className="pt-3">
                <h2>Users Listing <span className="float-right"><a href="/users/create" className="btn btn-sm btn-success">Add New User</a></span></h2>
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
                            this.state.data.map((user, i)=>
                                (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <a href="" className="btn btn-primary btn-sm">Edit</a>|
                                            <a href="" className="btn btn-danger btn-sm"> Delete</a>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

if (document.getElementById('app')){
    ReactDom.render(<Users/>, document.getElementById('app'))
}

