![Robo Chart preview](https://raw.githubusercontent.com/postlight/react-google-sheet-to-chart/master/static/images/robo-chart.png)

Transform Google sheets to pretty charts using this React Component!

Check out the [Live Demo!](https://robochart.netlify.com/) or the [Live Demo GitHub Repository](https://github.com/postlight/robo-chart-web)

## How to Install & Use

- The package can be installed via NPM:

  > npm install @postlight/react-google-sheet-to-chart --save

- Generate a Google API Key: https://console.cloud.google.com/apis/credentials

- Make sure you have a Google sheet document containing the data you wish to plot, check [the format](#spreadsheet-format) you need to use

- Import the react component and initialize it with at least three required props:

  - `id`: Spreadsheet ID, e.g. `1RE_JYUCXBXY2LNV5Tp5GegLnMue-CpfTVMxjdudZ8Js` (extractable from a Google sheet URL)
  - `sheet`: Sheet name to parse data from, e.g. `Sheet1`
  - `token`: The generated Google API Key

```
    import RoboChart from '@postlight/react-google-sheet-to-chart';

    ...

    <RoboChart
        id="GOOGLE_SPREADSHEET_ID"
        sheet="Sheet1"
        token="GENERATED_GOOGLE_API_KEY"
    />
```

## Quick setup

1. [Create a react app](https://github.com/facebook/create-react-app)
2. Install the package `npm install @postlight/react-google-sheet-to-chart --save`
3. Paste the following in `App.js` and replace `GOOGLE_SPREADSHEET_ID` and `GENERATED_GOOGLE_API_KEY` with appropriate values:

```
    import React, { Component } from 'react';
    import RoboChart from '@postlight/react-google-sheet-to-chart';
    import './App.css';

    const style = { width: '1200px', margin: '0 auto' };
    class App extends Component {
        render() {
            return (
                <div style={style}>
                    <RoboChart
                        id="GOOGLE_SPREADSHEET_ID"
                        sheet="Sheet1"
                        token="GENERATED_GOOGLE_API_KEY"
                    />
                </div>
            );
        }
    }
    export default App;
```

## Other possible props

- `start` e.g. "A5"
- `end` e.g. "E15"
- `title` e.g. "My Accounts"
- `flipAxis` e.g {false}
- `startFrom` e.g. {0}
- `stacked` e.g. {false}
- `type` one of: "line", "bar", "horizontalBar", "stacked", "pie", "semi-pie", "doughnut", "semi-doughnut"
- `colors` e.g. {['#a1a1a1', '#434343', '#ff0055']}

Example:

```
    <RoboChart
        id="GOOGLE_SPREADSHEET_ID"
        sheet="Companies Values"
        token="GENERATED_GOOGLE_API_KEY"
        type="semi-pie"
        title="Companies values in Billion $"
        colors={['#a1a1a1', '#995500', '#990055', '#009955']}
    />
```

![Robo Chart preview](https://raw.githubusercontent.com/postlight/react-google-sheet-to-chart/master/static/images/robo-chart-2.png)

## Spreadsheet format

In order to successfuly generate a chart, the Spreadsheet should have Row titles, Column titles and Values, example:

![Spreadsheet example](https://raw.githubusercontent.com/postlight/react-google-sheet-to-chart/master/static/images/spreadsheet-format.png)

## License

Licensed under either of the below, at your preference:

- Apache License, Version 2.0
  ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT license
  ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

## Contributing

Unless it is explicitly stated otherwise, any contribution intentionally submitted for inclusion in the work, as defined in the Apache-2.0 license, shall be dual licensed as above without any additional terms or conditions.

---

🔬 A Labs project from your friends at [Postlight](https://postlight.com/labs)
