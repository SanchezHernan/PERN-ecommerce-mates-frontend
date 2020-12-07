import React from 'react';


class CheckBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
    
    };

    render() {
        return (
            <div className="form-check">
                <label class="form-check-label" for="defaultCheck1" >
                    Default checkbox
                </label>
            </div>
            
        );
    }
    
}
  
export default CheckBox;