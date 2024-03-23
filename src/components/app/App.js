import { Component } from "react";
import CharacterList from "../character-list/CharacterList";
import RandomCharacter from "../random-character/RandomCharacter";
import CharacterInfo from "../character-info/CharaterInfo";
import ErrorBoundary from "../error-boundary/ErrorBoundary";
import "./app.scss";

class App extends Component {
  state = {
    charId: null,
  };

  onSelectChar = (id) => {
    this.setState({ charId: id });
  };

  render() {
    return (
      <div className="app">
        <h1 className="project-title">
          <span>Marvel </span>information portal
        </h1>
        <RandomCharacter />
        <div className="chars-wrapper">
          <ErrorBoundary>
            <CharacterList onSelectChar={this.onSelectChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharacterInfo id={this.state.charId} />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;
