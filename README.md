 
  // No idia how to make  fetching DATA and make a selecte on DropDown 

  -  Nataonality Student ,
  -  Nationality Family Member
  -  Relationshops  


--Some example 
  
class FavouriteTeam extends Component {
  state = {
    teams: [],
    selectedTeam: "",
    validationError: ""
  }

  componentDidMount() {
    fetch("http://localhost:26854/api/premiershipteams")
      .then((response) => {  return response.json(); })
      .then(data => {
        let teamsFromApi = data.map(team => { return {value: team, display: team} })
        this.setState({ teams: [{value: '', display: '(Select your favourite team)'}].concat(teamsFromApi) });
      }).catch(error => { console.log(error); });
  }

  render() {
    return (
      <div>
        <select value={this.state.selectedTeam} 
                onChange={(e) => this.setState({selectedTeam: e.target.value, validationError: e.target.value === "" ? "You must select your favourite team" : ""})}>
          {this.state.teams.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
        </select>
        <div style={{color: 'red', marginTop: '5px'}}>
          {this.state.validationError}
        </div>
      </div>
    )
  }
}

 === ***  Need to make ->   on click open  <tr>

    state ={
        students:             [],
        isOpenModalShowOrder: false,
    }

    openModalShowOrder = () => {
        this.setState({ isOpenModalShowOrder: true });
    };

    closeModalShowOrder = () => {
        this.setState({ isOpenModalShowOrder: false });
    };

    handleShowOrder = (ID) => {
        this.setState({ isLoading: true });

        this.props.fetchStudents().then((ID) => {
            this.openModalShowOrder(ID);
        });
    };

*****  then  on <tr onClick={() => { onShowOrder(ID)}} >




________ Need to fix ->  npm install react-datepicker --save

  state = {
      firstName:     '',
      lastName:      '',
      dateOfBirth:   '',
      nationalities: '',
      startDate:     new Date(),
  };
  
   handleChange (date) {
      this.setState({
          startDate: date,
      });
  }

<DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />


-  Added time format 
_ !* neeed to add .map on context in the Table 

{student.map(({firstName,  lastName }) => (
          <tr key={id}>
            <td>{firstName}</td>
            <td>{lastName}</td>
   