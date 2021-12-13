export type Employee = {
  firstName: String,
  lastName: String,
  description: String,
  _links: {
    self: {
      href: string
    },
    employee: {
      href: string
    }
  },
}
