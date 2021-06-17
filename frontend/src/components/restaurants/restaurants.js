import React from 'react';

class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //     restaurant: {}
    // }
  }

  render() {
    console.log(this.props)
    return (
      <div className="restaurant-template">
        <div className="temp-left">
          <a className="restaurant-temp-name" href={this.props.restaurant.url}>{this.props.restaurant.name}</a>
          {/* <p>{this.props.restaurant.location.display_address}</p> */}
          <p className="restaurant-temp-rating">{this.props.restaurant.rating}</p>
        </div>
        <div className="temp-right">
          <img src={this.props.restaurant.image_url} />
        </div>
        {/* <p>can you say something else it wasnt working before</p> */}
      </div>
    );
  }
}

export default Restaurant;