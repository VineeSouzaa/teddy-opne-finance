# Testing Guide

This directory contains all the tests for the Teddy Open Finance Challenge application.

## Test Structure

```
test/
├── app.e2e-spec.ts          # Main e2e tests for all endpoints
├── url-parser.e2e-spec.ts   # Dedicated e2e tests for URL parser
├── jest-e2e.json           # Jest configuration for e2e tests
├── test-setup.ts           # Test application setup utilities
├── helpers/
│   └── test-utils.ts       # Common test utilities and helpers
└── README.md               # This file
```

## Test Types

### Unit Tests

- Located in `src/**/*.spec.ts` files
- Test individual components, services, and controllers in isolation
- Fast execution, no external dependencies

### E2E Tests

- Located in `test/*.e2e-spec.ts` files
- Test the entire application flow
- Use real HTTP requests and database
- Slower but more comprehensive

## Running Tests

### Unit Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run tests in debug mode
npm run test:debug
```

### E2E Tests

```bash
# Run all e2e tests
npm run test:e2e

# Run e2e tests in watch mode
npm run test:e2e:watch
```

### All Tests

```bash
# Run both unit and e2e tests
npm run test:all

# Run tests for CI (with coverage)
npm run test:ci
```

## Test Configuration

### Jest Configuration

- Unit tests: Configured in `package.json`
- E2E tests: Configured in `test/jest-e2e.json`

### Database Setup

E2E tests use a separate test database:

- Database: `teddy_finance_test`
- User: `test_user`
- Password: `test_password`

### Environment Variables

Create a `.env.test` file for test-specific configuration:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=test_user
DB_PASSWORD=test_password
DB_NAME=teddy_finance_test
```

## Test Utilities

### TestUtils Class

Located in `test/helpers/test-utils.ts`, provides:

- User creation and authentication
- URL creation and management
- Random data generation
- Authenticated request helpers

### TestApp Class

Located in `test/test-setup.ts`, provides:

- Test application setup
- Database configuration override
- Clean application lifecycle management

## Writing Tests

### Unit Test Example

```typescript
import { Test, TestingModule } from '@nestjs/testing'
import { MyService } from './my.service'

describe('MyService', () => {
  let service: MyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyService],
    }).compile()

    service = module.get<MyService>(MyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
```

### E2E Test Example

```typescript
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TestUtils } from './helpers/test-utils'

describe('MyController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    // Setup test application
  })

  afterAll(async () => {
    await app.close()
  })

  it('/my-endpoint (GET)', () => {
    return request(app.getHttpServer()).get('/my-endpoint').expect(200)
  })
})
```

## Best Practices

1. **Test Isolation**: Each test should be independent
2. **Descriptive Names**: Use clear, descriptive test names
3. **Arrange-Act-Assert**: Structure tests in this pattern
4. **Mock External Dependencies**: Use mocks for external services
5. **Test Coverage**: Aim for high test coverage
6. **Fast Tests**: Keep tests fast and efficient
7. **Clean Setup/Teardown**: Properly clean up test data

## Coverage Reports

After running `npm run test:cov`, coverage reports are generated in:

- HTML: `coverage/index.html`
- Console: Terminal output
- LCOV: `coverage/lcov.info`

## Continuous Integration

Tests are automatically run in CI/CD pipeline:

- Unit tests with coverage
- E2E tests with test database
- Linting and type checking
- Build verification
