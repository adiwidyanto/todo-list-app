import React, { Component } from 'react';
import Navbar from './component/Navbar';
import AddTodo from './component/AddTodo';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            loading: true,
            isError: false
        };

        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCheckElement = this.handleCheckElement.bind(this);

        this.columns = [
            // {
            //     key: "userId",
            //     text: "User ID"
            // },
            {
                key: "id",
                text: "ID"
            },
            {
                key: "title",
                text: "Title"
            },
            {
                key: "completed",
                text: "Completed",
                cell: (records, key) => {
                    return(
                        <div className="row">
                            <input type="checkbox" checked={records.completed} onClick={this.handleCheckElement}/>
                        </div>
                    )
                }
            },
            {
                key: "action",
                text: "Action",
                width: "15%",
                cell: (records, key) => {
                    return(
                        <div className="row">
                            <div className="col-lg-6">
                                <button onClick={() =>this.handleDeleteClick} className="btn btn-block btn-danger">Delete</button>
                            </div>
                        </div>
                    )
                }
            }
            
        ];

        this.config = {
            key_column: 'id',
            page_size: 50,
            length_menu: [50, 100, 200],
            show_filter: true,
            show_pagination: true,
            pagination: 'advance',
            button: {
                excel: false,
                print: false
            },
            language: {
                loading_text: "Please be patient while data loads..."
            }
        };
    }

    handleAddTodo(title) {
        axios.post('https://jsonplaceholder.typicode.com/todos', {
          title: title,
          completed: false
        })
        .then(res => this.setState({todos: [...this.state.todos, res.data]}))
        
    }

    handleDeleteClick(id) {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(
                this.setState({todos: [...this.state.todos.filter(
                    todo => todo.id !== id
            )]
        }));
    }

    handleCheckElement(id){
        this.setState({
            todos: this.state.todos.map(todo => {
                if(todo.id === id){
                    todo.completed = !todo.completed;
                }
            return todo;
            })
        })
    };
    
    componentDidMount() {
        // const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        // if (response.ok) {
        //     const todos = await response.json()
        //     this.setState({
        //         todos,
        //         loading: false
        //     })
        // } else {
        //     this.setState({
        //         isError: true,
        //         loading: false
        //     })
        // }
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=15').then(res => { 
            // console.log(res)
            this.setState({
                todos: res.data,
                loading: false
            })
        })
    }

    render() {
        return (
            <>
            <Navbar />
                <div className="container-fluid mb-5">
                    <div className="row mt-5">
                        <AddTodo handleAddTodo={this.handleAddTodo} />
                        <ReactDatatable
                            config={this.config}
                            records={this.state.todos}
                            columns={this.columns}
                            loading={this.state.loading}
                        />
                    </div>
                </div>
            </>
        );

    }
}

export default HomePage;