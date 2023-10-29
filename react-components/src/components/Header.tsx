import { Component, ReactNode } from 'react';
import { ResponseData } from '../interfaces/ResponseData';

export class Header extends Component {
  state = {
    searchData: '',
    searchParam: '',
    result: undefined,
  };

  render(): ReactNode {
    return (
      <div>
        <input
          type="text"
          name=""
          id=""
          onChange={(event) => {
            this.setState({
              searchData: event.target.value,
            });
          }}
        />
        <select
          name=""
          id=""
          onChange={(event) => {
            this.setState({
              searchParam: event.target.value,
            });
          }}
        >
          <option value="films">films</option>
          <option value="people">people</option>
          <option value="planets">planets</option>
          <option value="species">species</option>
          <option value="starships">starships</option>
          <option value="vehicles">vehicles</option>
        </select>
        <button
          type="button"
          onClick={async () => {
            const data = await fetchData(
              this.state.searchParam,
              this.state.searchData
            );
            this.setState({
              result: data,
            });
          }}
        >
          Search
        </button>
        <p>
          {this.state.result
            ? prepareData(this.state.result as unknown as ResponseData[])
            : 'No results'}
        </p>
      </div>
    );
  }
}

const fetchData = async (
  searchParam: string,
  data: string
): Promise<ResponseData[]> => {
  return fetch(`https://swapi.dev/api/${searchParam}/?search=${data}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => console.error(error));
};

const prepareData = (data: ResponseData[]): string => {
  let stringData = '';
  for (const elem of data) {
    for (const key in elem)
      stringData += `${key}: ${elem[key as keyof ResponseData]}
    `;
  }
  console.log(stringData);
  return stringData;
};
