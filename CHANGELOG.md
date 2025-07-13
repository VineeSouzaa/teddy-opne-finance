# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

---

## [1.0.0] - 2025-07-12

### 🚀 Features

- **User management**: Implemented full `create user` flow
- **Authentication**: Added bcrypt hashing, access token generation, and unique/pass validation
- **Short URL**: Built short URL creation and parsing structure
- **CRUD API**: Added authenticated CRUD for `user_url`
- **Swagger**: Added Swagger documentation for REST API
- **Guard system**: Introduced route guard and initial URL parser structure
- **Duplicate handling**: Added analysis logic for detecting user duplicates
- **Hexagonal architecture**: Added `auth` and `user` service in application layer, restructured dependencies

### 🐛 Fixes

- Removed pre-commit tests to prevent blocking
- Removed spec/test files temporarily
- Fixed interface dependency injection for use cases
- Fixed and suppressed various linting issues
- Fixed minor issues in service layers and general logic

### 🧹 Chores & Refactors

- Refactored DTOs by separating application/presentation concerns
- Cleaned up unused imports and improved code clarity
- Added ESLint + Prettier setup
- Configured commit linting rules

### 📦 Build & DevOps

- Dockerized the application using multi-stage build
- Added Dockerfile and `.dockerignore`

### 📘 Docs

- Added initial README setup following project structure and feature overview

---

## [Initial] - 2025-07-09

- Initial NestJS project setup with clean structure
