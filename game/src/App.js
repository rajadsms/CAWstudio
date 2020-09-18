import React from 'react';

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      marker: 1,
      greenGem: [],
      moveCounter: 0,
      limit: '',
      enable: false,
    };
    this.onkeyPress = this.onkeyPress.bind(this);
    this.renderBoxes = this.renderBoxes.bind(this);
    this.onChangeFunc = this.onChangeFunc.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
  }

  generateNumbers = (limit) => {
    let arr = [];
    for (let i = 0; i < limit; i++) {
      arr.push(Math.floor(Math.random() * limit * limit) + 1);
    }
    return arr;
  };

  onChangeFunc = (data) => {
    const { name, value } = data.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onkeyPress);
  }

  renderBoxes = (x, y) => {
    const { marker } = this.state;
    let table = [];
    var counter = 1;
    for (let i = 1; i <= x; i++) {
      let eachRow = [];
      for (let j = 1; j <= y; j++) {
        let classNames = marker === counter ? 'box markerLocation' : 'box';

        let greenGem =
          this.state.greenGem.indexOf(counter) !== -1 ? (
            <div key={counter + '__'} className="greenGem"></div>
          ) : (
            ''
          );

        eachRow.push(
          <div key={counter} className={classNames}>
            {greenGem}
          </div>
        );

        counter++;
      }
      table.push(
        <div key={i + 'row'} className="row">
          {eachRow}
        </div>
      );
    }
    return table;
  };
  checkGem = (newMarkerPosition) => {
    const { greenGem } = this.state;
    let index = greenGem.indexOf(newMarkerPosition);
    if (index !== -1) {
      greenGem.splice(index, 1);
      return greenGem;
    } else return greenGem;
  };
  onkeyPress = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        let futureStepUp = this.state.marker - Number(this.state.limit);
        if (futureStepUp >= 1) {
          let arrGemUp = this.checkGem(futureStepUp);
          this.setState({
            marker: futureStepUp,
            greenGem: arrGemUp,
            moveCounter: this.state.moveCounter + 1,
          });
        }
        break;
      case 'ArrowDown':
        let futureStepDown = this.state.marker + Number(this.state.limit);
        if (futureStepDown <= this.state.limit * this.state.limit) {
          let arrGemDown = this.checkGem(futureStepDown);
          this.setState({
            marker: futureStepDown,
            greenGem: arrGemDown,
            moveCounter: this.state.moveCounter + 1,
          });
        }
        break;
      case 'ArrowLeft':
        let futureStepLeft = this.state.marker - 1;
        debugger;
        if (futureStepLeft >= 1 && futureStepLeft % this.state.limit !== 0) {
          let arrGemLeft = this.checkGem(futureStepLeft);
          this.setState({
            marker: futureStepLeft,
            greenGem: arrGemLeft,
            moveCounter: this.state.moveCounter + 1,
          });
        }
        break;
      case 'ArrowRight':
        let futureStepRight = this.state.marker + 1;
        if (
          futureStepRight <= this.state.limit * this.state.limit &&
          (futureStepRight - 1) % this.state.limit !== 0
        ) {
          let arrGemRight = this.checkGem(futureStepRight);
          this.setState({
            marker: futureStepRight,
            greenGem: arrGemRight,
            moveCounter: this.state.moveCounter + 1,
          });
        }
        break;
      default:
        break;
    }
  };
  buttonPressed = () => {
    if (this.state.enable) {
      this.setState({
        marker: 1,
        greenGem: [],
        moveCounter: 0,
        limit: '',
        enable: false,
      });
    } else {
      this.setState({
        greenGem: this.generateNumbers(this.state.limit),
        checkGem: [],
        enable: !this.state.enable,
      });
    }
  };

  render() {
    const { moveCounter, enable, limit, greenGem } = this.state;
    return (
      <>
        <div className="wrapper">
          <div>
            <label>Enter height and Width</label>
            <br />
            <input
              type="number"
              onChange={this.onChangeFunc}
              value={limit}
              name={'limit'}
              disabled={enable}
            />
            <button onClick={this.buttonPressed}>
              {enable ? 'Stop' : 'Play'}
            </button>
            Turn:<label>{moveCounter}</label>
          </div>
          {greenGem.length === 0 && moveCounter > 0 ? (
            <div>You take {moveCounter} turn to save the prince</div>
          ) : (
            <div className="outerWrapper">
              {enable && this.renderBoxes(limit, limit)}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default App;
