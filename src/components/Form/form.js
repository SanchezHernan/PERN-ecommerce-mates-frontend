import React from 'react';
import './form.css';




class MyForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {    this.setState({value: event.target.value});  }
    handleSubmit(event) {
      alert('Buscando en la base de datos: ' + this.state.value);
      this.setState({value: ''})
      event.preventDefault();
    }
    
    render() {
      return (
       
        <form className="cForm" onSubmit={this.handleSubmit}>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Buscar producto" aria-label="Search" value={this.state.value} onChange={this.handleChange} />
                <div className="input-group-append">
                    <button type="submit" className="btn btn-outline-primary" value="Submit">
                        Buscar
                    </button>
                </div>
            </div>    
        </form>

        

      );
    }
  }

  export default MyForm;