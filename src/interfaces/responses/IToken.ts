export default interface IToken {
  accessToken: {
    abilities: string[],
      created_at?: string,
      expires_at: string|null,
      id: number,
      name: string,
      tokenable_id: number,
      tokenable_type: string,
      updated_at: string
  },
  plainTextToken: string,
}
