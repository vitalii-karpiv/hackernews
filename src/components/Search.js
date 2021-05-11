import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from './Link';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export default function Search() {
  const [searchFilter, setSearchFilter] = useState('');
  const [executableSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY);
  return (
    <>
      <div>
        Search
        <input
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button onClick={() => executableSearch({ variables: { filter: searchFilter } })}>
          OK
        </button>
      </div>
      { data
        && data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        )) }
    </>
  );
}
