class MarvelService {
  #apiUrl = "https://gateway.marvel.com:443/v1/public";
  #apiKey = "apikey=8df7eb4ef2c3c511ddafaf8862566604";

  #fetchData = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  };

  getCharacter = async (id) => {
    const { data } = await this.#fetchData(
      `${this.#apiUrl}/characters/${id}?${this.#apiKey}`
    );
    return this.#transformCharacter(data.results[0]);
  };

  getAllCharacters = async (offset = 210) => {
    const { data } = await this.#fetchData(
      `${this.#apiUrl}/characters?limit=6&offset=${offset}&${this.#apiKey}`
    );

    return data.results.map(this.#transformCharacter);
  };

  #transformCharacter = (char) => {
    const {
      id,
      name,
      description: descr,
      thumbnail,
      urls,
      comics: { items },
    } = char;
    return {
      id,
      name,
      descr: descr || "Description not found",
      thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
      wiki: urls[1].url,
      homepage: urls[0].url,
      comics: items,
    };
  };
}
export default MarvelService;
