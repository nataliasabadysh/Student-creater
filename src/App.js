// Core
import React, { Component } from 'react';

// Components
import Header from './components/AppHeader/Header';
import Modal from './components/Modal';
import StudentTable from './components/StudentTable';

class App extends Component {
    render () {
        return (
            <div>
                <Header />
                <StudentTable />
                <Modal />
            </div>
        );
    }
}

export default App;
