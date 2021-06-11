class Api {
  constructor(options = {}) {
    const baseOption = {
      url: 'https://poloniex.com',
    }

    this._option = Object.assign({}, baseOption, options)
  }

  loadTracks() {
    return fetch(`${this._option.url}/public?command=returnTicker`, {
      method: 'GET',
    }).then(response => response.json())
  }
}

export default Api
