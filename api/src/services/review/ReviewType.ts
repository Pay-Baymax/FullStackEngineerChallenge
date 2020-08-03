import { gql } from "apollo-server-micro";

export const ReviewType = gql`
  extend type Query {
    review(id: Int!): Review!
    reviews(
      first: Int
      after: ID
      orderBy: ReviewOrderByInput
    ): ReviewConnection!
  }

  enum ReviewOrderByInput {
    ID_ASC
    ID_DESC
    RATING_ASC
    RATING_DESC
  }

  type Review {
    id: Int!
    rating: Int!
    comment: String!
    attitude: Int!
    communication: Int!
    growth: Int!
    dependability: Int!
    productivity: Int!
    initiative: Int!
    innovation: Int!
    createdAt: Date!
  }

  type ReviewEdge {
    node: Review!
    cursor: ID!
  }

  type ReviewConnection {
    edges: [ReviewEdge!]!
    pageInfo: PageInfo
    totalCount: Int
  }

  type AssignmentStats {
    progress: Int
    pending: Int
    completed: Int
    total: Int
  }

  extend type User {
    rating: Float!
  }

  extend type Assignment {
    review: Review
  }

  type ReviewSSummary {
    rating: Float!
    attitude: Float!
    communication: Float!
    growth: Float!
    dependability: Float!
    productivity: Float!
    initiative: Float!
    innovation: Float!
  }
  extend type User {
    reviewsSummary: ReviewSSummary!
  }
`;
