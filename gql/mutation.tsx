import {gql} from '@apollo/client';

export const LOGIN_QUERY = gql`
  mutation ($input: LoginInputDto!) {
    login(input: $input) {
      id
      token
      fullName
      refreshToken
    }
  }
`;
