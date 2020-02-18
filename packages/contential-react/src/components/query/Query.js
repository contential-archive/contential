import { Component } from 'react';
import { ContentialContext } from '../../';
import PropTypes from 'prop-types';

class Query extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: null,
      data: props.data || null,
    };
  }

  componentDidMount() {
    this.loadList();
  }

  loadList = async () => {
    const {
      regionId,
      listId,
      graphql,
      spaceId,
      query,
      orderBy,
      orderByDirection,
      pageSize,
      page,
    } = this.props;
    const { client } = this.context;

    try {
      this.setState({ error: null, loading: true });
      let data = [];

      if (graphql) {
        data = await client.graphql.query({
          regionId,
          query: graphql,
        });
      } else {
        const result = await client.list.query({
          regionId,
          listId,
          spaceId,
          query,
          orderBy,
          orderByDirection,
          pageSize,
          page,
        });

        data = result.data;
      }
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  render() {
    const { children } = this.props;
    const { loading, error, data } = this.state;

    return children ? children({ loading, error, data }) : null;
  }
}

Query.contextType = ContentialContext;

Query.propTypes = {
  graphql: PropTypes.string,
  query: PropTypes.any,
};

export default Query;
