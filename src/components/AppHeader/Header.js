// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

// Instruments
import { actions } from '../../modules/Students';
import Styles from './slyles.module.css';

// Avatar
import avatar from './assets/download.png';

class Header extends Component {
    options = [
        { value: 'admin', label: 'Admin' },
        { value: 'registrar', label: 'Registrar' }
    ];

  handleChange = (selectedOption) => {
      this.props.setRole(selectedOption.value)
  }

  render () {
    const selectedOption = this.options.find((option) => option.value === this.props.role);

      return (
          <header className = { Styles.header }>
              <img alt = 'User avatar' height = '55' src = { avatar  } width = '55' />
              <div className = { Styles.Selector }>
                  <Select
                      options = { this.options }
                      value = { selectedOption }
                      onChange = { this.handleChange }
                  />
              </div>
          </header>
      );
  }
}

const mapStateToProps = (state) => ({
    role: state.students.role,
});

const mapDispatchToProps = {
    setRole: actions.setRole, 
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);