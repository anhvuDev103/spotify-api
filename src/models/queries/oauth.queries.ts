export interface OauthQueries extends qs.ParsedQs {
  code: string;
  state: string;
}
