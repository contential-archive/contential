import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createClient } from '@contential/content';

class List extends Component {
  constructor(props) {
    super(props);

    console.log(props.data);

    const data = props.data || [];

    this.state = {
      loading: true,
      error: null,
      data,
    };
  }

  componentDidMount() {
    this.loadList();
  }

  loadList = async () => {
    const { apiKey, regionId, spaceId, listId } = this.props;
    const contential = createClient({
      apiKey,
    });

    try {
      const result = await contential.list.query({
        regionId,
        spaceId,
        listId,
        // query: {
        //   roleLevel: {
        //     $equal: 6,
        //   },
        // },
        // orderBy: ['name'],
        // orderByDirection: ['name'],
      });
      const { data } = result;

      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error: 'Error', loading: false });
    }
  };

  render() {
    const { data } = this.state;

    return (
      <div className="list">
        {data.map(item => {
          const key = Object.keys(item)[0];

          return (
            <div key={item.id} className="list-item">
              {item[key]}
            </div>
          );
        })}
      </div>
    );
  }
}

List.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default List;
