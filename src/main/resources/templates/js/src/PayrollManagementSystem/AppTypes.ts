export type Employee = {
  firstName: string,
  lastName: string,
  description: string,
  hourlyRate: number,
  hoursWorked: number,
  _links: {
    self: {
      href: string
    },
    employee: {
      href: string
    }
  },
}
