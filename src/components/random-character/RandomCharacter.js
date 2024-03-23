import { Component } from "react";
import MarvelService from "../../services/marvelService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import "./random-character.scss";

class RandomCharacter extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  componentDidMount = () => {
    this.updateChar();
  };

  marvelService = new MarvelService();

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false, error: false });
  };

  onCharError = () => {
    this.setState({ error: true, loading: false });
  };

  updateChar = () => {
    const randomId = Math.floor(Math.random() * 400 + 1011000);
    this.onCharLoading();
    this.marvelService
      .getCharacter(randomId)
      .then(this.onCharLoaded)
      .catch(this.onCharError);
  };

  render() {
    const { loading, error, char } = this.state;

    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
      <div className="random-char-wrapper">
        <div className="random-char-inner">
          {errorMessage || spinner || <RandomCharTemp char={char} />}
        </div>
        <div className="random-char-generator">
          <p>
            Random character for today! Do you want to get to know him better?
          </p>
          <p>Or choose another one</p>
          <button className="random-char-btn" onClick={this.updateChar}>
            Try It
          </button>
        </div>
      </div>
    );
  }
}

function RandomCharTemp({ char: { name, descr, thumbnail, wiki, homepage } }) {
  return (
    <div className="random-char">
      <img
        className="random-char-thumb"
        src={thumbnail}
        alt={name}
        style={
          `${thumbnail}`.includes("image_not_available")
            ? { objectFit: "fill" }
            : { objectFit: "cover" }
        }
      />
      <div className="random-char-info">
        <h2 className="random-char-title">{name}</h2>
        <p className="random-char-description">{descr}</p>
        <div className="random-char-btn-wrapper">
          <a href={wiki} target="_blank" className="random-char-btn wiki-btn">
            Wiki
          </a>
          <a
            href={homepage}
            target="_blank"
            className="random-char-btn homepage-btn"
          >
            Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export default RandomCharacter;
