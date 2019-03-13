import React, { Component } from 'react';
import RoboChart from 'react-google-sheet-chart';
import './App.css';
class App extends Component {
    render() {
        return (
            <div className="App">
                <RoboChart
                    id="1RE_JYUCXBXY2LNV5Tp5GegLnMue-CpfTVMxjdudZ8Js"
                    sheet="Accounting"
                />
            </div>
        );
    }
}
export default App;
