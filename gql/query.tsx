import {gql} from '@apollo/client';

export const QUERY_INBOXES = gql`
  query {
    getInboxes(queryParams: {
      page: 1,
      limit: 10
    }) {
      items {
        id
        title
        createdAt
        message
        updatedAt
        user {
          fullName
          avatar
        }
      }
      meta {
        totalItems
        itemCount
        currentPage
        totalPages
        itemsPerPage
      }
    }
  }
`;
