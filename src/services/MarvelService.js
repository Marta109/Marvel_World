class MarvelService {
  #apiBase = "https://gateway.marvel.com:443/v1/public/";
  #apiKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this.#apiBase}characters?limit=9&offset=210&${this.#apiKey}`
    );

    // return res.data.results.map((char) => {
    //   console.log(char);
    //   return this._transformCharacter(char);
    // });
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this.#apiBase}characters/${id}?${this.#apiKey}`
    );

    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    return {
      name: char.name,
      descr: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

export default MarvelService;
