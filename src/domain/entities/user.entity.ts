export class User {
  readonly id: string
  readonly email: string
  readonly name: string
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(
    id: string,
    email: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id
    this.email = email
    this.name = name
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  getId(): string {
    return this.id
  }

  getEmail(): string {
    return this.email
  }

  getName(): string {
    return this.name
  }

  getCreatedAt(): Date {
    return this.createdAt
  }

  getUpdatedAt(): Date {
    return this.updatedAt
  }

  updateName(newName: string): User {
    this.validateName(newName)
    return new User(this.id, this.email, newName, this.createdAt, new Date())
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format')
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long')
    }
  }

  // Factory method with validation
  static create(email: string, name: string): User {
    const user = new User('', email, name, new Date(), new Date())
    user.validateEmail(email)
    user.validateName(name)
    return user
  }

  // Validation method that can be called after loading the entity
  validate(): void {
    this.validateEmail(this.email)
    this.validateName(this.name)
  }
}
