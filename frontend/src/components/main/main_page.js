import React from "react";
import morning from './images/morning.jpeg' 
import afternoon from './images/afternoon.jpeg' 
import night from "./images/night.jpeg"; 
import Wheel from "../the_wheel/wheel"
import WheelContainer from '../the_wheel/wheel_container';


class MainPage extends React.Component {
  constructor(props) {
    super(props)
    let today = new Date();
    let hour = today.getHours();
    let index = 0;

    if(hour < 11){
      index = 0
    }else if(hour > 11 && hour < 16){
      index = 1
    }else{
      index = 2
    }

    this.state = {
      index: index,
      imgList: [morning, afternoon, night],
      modalActive: false,
      location: "sanfrancisco",
      // tag: tag
    }

    this.handleMorningClick = this.handleMorningClick.bind(this);
    this.handleNoonClick = this.handleNoonClick.bind(this);
    this.handleNightClick = this.handleNightClick.bind(this);
    this.modalSwitch = this.modalSwitch.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    // this.handleTag = this.handleTag.bind(this);
  }

  // handleTag() {
  //   if (this.state.index !== 0) {
  //     this.setState({
  //       tag: 0 
  //     });
  //   } else if (this.state.index !== 1) {
  //     this.setState({
  //       tag: 1
  //     });
  //   } else {
  //     this.setState({
  //       tag: 2
  //     });
  //   }
  // };

  selectLocation(e) {
    e.preventDefault()
    this.setState({location: e.target.value })
  }

  handleMorningClick(){
   if(this.state.index !== 0){
    this.setState({
      index: 0
    })
   }
  }

  handleNoonClick(){
   if(this.state.index !== 1){
    this.setState({
      index: 1
    })
   }
  }

  handleNightClick(){
   if(this.state.index !== 2){
    this.setState({
      index: 2
    })
   }
  }

  modalSwitch(){
    this.setState({modalActive: !this.state.modalActive});
  }

  render() {
      return (
        <div className="main-container">
          <img
            src={this.state.imgList[this.state.index]}
            className="backgroundImg"
          />
          <button
            onClick={() => {
              this.handleMorningClick();
              this.modalSwitch();
              // this.handleTag();
            }}
          >
            Breakfast
          </button>
          <button
            onClick={() => {
              this.handleNoonClick();
              this.modalSwitch();
              // this.handleTag();
            }}
          >
            Lunch
          </button>
          <button
            onClick={() => {
              this.handleNightClick();
              this.modalSwitch();
              // this.handleTag();
            }}
          >
            Dinner
          </button>
          <WheelContainer
            active={this.state.modalActive}
            modalSwitch={this.modalSwitch}
          />
          <footer>Copyright &copy; 2021 SHEEEESH</footer>
        </div>
      );
  }
}

export default MainPage;
