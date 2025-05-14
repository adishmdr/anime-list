import { gql } from '@apollo/client';

export const GET_ANIME_LIST = gql`
  query GetAnimeList($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        description
        genres
        averageScore
        episodes
        status
      }
    }
  }
`;

export const GET_ANIME_DETAILS = gql`
  query GetAnimeDetails($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
      description
      genres
      averageScore
      episodes
      status
      studios {
        nodes {
          name
        }
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
    }
  }
`; 

export const GET_CATEGORY_ANIME = gql`
query GetCategoryAnime($genre: [String], $sort: [MediaSort!]) {
  Page(page: 1, perPage: 20) {
    media(type: ANIME, genre_in: $genre, sort: $sort) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
      }
      description
      genres
      averageScore
      episodes
      status
      studios {
        nodes {
          name
        }
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
    }
  }
}
`;