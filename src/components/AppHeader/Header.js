// Core
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Select from 'react-select';

// Instruments
// import { actions } from '../../modules/Students';
import Styles from './slyles.module.css';

// Avatar
import avatar from './assets/download.png';

const options = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Registrar', label: 'Registrar' }
];

export default class Header extends Component {
  state = {
      selectedOption: [],
  }
  handleChange = (selectedOption) => {
      this.setState({ selectedOption });
  }
  render () {
      const { selectedOption } = this.state;

      return (
          <header className = { Styles.header }>
              <img alt = 'user avatar' height = '48' src = { avatar } width = '48' />
              <div className = { Styles.Selector }>
                  <Select
                      value = { selectedOption }
                      onChange = { this.handleChange }
                      options = { options }
                  />
              </div>
          </header>
      );
  }
}

// const mapStateToProps = (state) => ({
//     isRegistrar: state.role.isRegistrar,
// });

// const mapDispatchToProps = {
//     isRegistrar: actions.isRegistrar,  // ??? 
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Header);

