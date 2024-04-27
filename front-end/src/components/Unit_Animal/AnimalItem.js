import React, {Component} from 'react';

class AnimalItem extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
                <a className="zoom" style={{margin: "10px"}}
                   onClick={() => this.props.selectAnimal(this.props.id, this.props.id + "-" + this.props.index)}
                >
                    <img
                        src={this.props.name}
                        alt={this.props.id}
                        id={this.props.id + "-" + this.props.index}
                        width="120px"
                        height="80px"
                    />
                </a>
            </>
        );
    }
}

export default AnimalItem;