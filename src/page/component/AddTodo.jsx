import React, { Component } from 'react';

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleAddTodo(this.state.title);
        this.setState({ title: '' });
    };

    handleChange(event) {
        this.setState({ 
            [event.target.name]: event.target.value 
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                
                <div className="input-group mb-5">
                    <input type='text' className="form-control" name='title' placeholder='Add Todo...' value={this.state.title} onChange={this.handleChange} />
                    <button type='submit' value='Submit' className='btn btn-block btn-primary'>Submit</button>
                </div>
            </form>
        );
    }
}

export default AddTodo;
