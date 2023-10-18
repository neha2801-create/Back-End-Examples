export const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic'
}
export const users = [
  { id: 1, name: 'Tommy', role: ROLE.ADMIN },
  { id: 2, name: 'Haley', role: ROLE.BASIC },
  { id: 3, name: 'Travis', role: ROLE.BASIC }
]
export const projects = [
  { id: 1, name: "Tommy's Project", userId: 1 },
  { id: 2, name: "Haley's Project", userId: 2 },
  { id: 3, name: "Travis's Project", userId: 3 }
]