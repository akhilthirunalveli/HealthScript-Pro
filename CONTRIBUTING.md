# Contributing to HealthScript-Pro

Thank you for your interest in contributing to HealthScript-Pro! 🎉

We welcome contributions from developers, healthcare professionals, designers, and anyone passionate about improving healthcare technology.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
3. [Getting Started](#getting-started)
4. [Development Workflow](#development-workflow)
5. [Coding Guidelines](#coding-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Community](#community)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. We pledge to make participation in our project a harassment-free experience for everyone, regardless of:

- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience
- Nationality, personal appearance, race, religion
- Sexual identity and orientation

### Our Standards

**Positive behaviors include:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behaviors include:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project team at conduct@healthscript-pro.com. All complaints will be reviewed and investigated promptly and fairly.

---

## 🤝 How Can I Contribute?

### 1. Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**How to Submit a Bug Report:**

Use the [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md) and include:

- **Clear title**: Descriptive and specific
- **Description**: What you expected vs. what happened
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Environment**: OS, browser, Node version, etc.
- **Screenshots**: If applicable
- **Error logs**: Console errors or stack traces

**Example:**
```markdown
## Bug Description
Prescription export to PDF fails when patient name contains special characters

## Steps to Reproduce
1. Create a patient with name "José García"
2. Create a prescription for this patient
3. Click "Export to PDF"
4. Error appears: "Cannot generate PDF"

## Expected Behavior
PDF should generate with special characters properly encoded

## Environment
- OS: macOS 14.0
- Browser: Chrome 120
- Node: 20.10.0
```

### 2. Suggesting Features

We love feature suggestions!

**How to Suggest a Feature:**

Use the [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md) and include:

- **Problem statement**: What problem does this solve?
- **Proposed solution**: How should it work?
- **Alternatives considered**: Other approaches you've thought of
- **Additional context**: Mockups, examples, or references

**Example:**
```markdown
## Feature Request
Voice-to-text prescription creation

## Problem
Doctors spend significant time typing prescriptions. Voice input could speed up the process.

## Proposed Solution
Add a voice recognition button that allows doctors to dictate:
- Medication names
- Dosages
- Instructions

## Mockup
[Attach mockup image]
```

### 3. Contributing Code

We welcome code contributions! See [Development Workflow](#development-workflow) below.

### 4. Improving Documentation

Documentation improvements are always appreciated:
- Fix typos or unclear explanations
- Add examples or tutorials
- Translate documentation
- Create video guides

### 5. Helping Others

- Answer questions in GitHub Discussions
- Help troubleshoot issues
- Review pull requests
- Share the project

---

## 🚀 Getting Started

### Prerequisites

Before contributing, make sure you have:

1. **Node.js 18+** installed
2. **Git** installed
3. **PostgreSQL** or **MongoDB** running locally
4. Read the [Setup Guide](SETUP_GUIDE.md)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/HealthScript-Pro.git
   cd HealthScript-Pro
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/akhilthirunalveli/HealthScript-Pro.git
   ```

### Local Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Setup database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

---

## 💻 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clear, readable code
- Follow our [Coding Guidelines](#coding-guidelines)
- Add tests for new features
- Update documentation as needed

### 3. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "type(scope): description"
```

**Commit types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance

**Examples:**
```bash
git commit -m "feat(prescription): add voice-to-text input"
git commit -m "fix(patient): resolve special characters in PDF export"
git commit -m "docs(api): update authentication examples"
git commit -m "test(medication): add interaction checking tests"
```

### 4. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

---

## 📝 Coding Guidelines

### TypeScript

```typescript
// ✅ Good
interface Patient {
  id: string
  name: string
  dateOfBirth: Date
}

function createPatient(data: Patient): Promise<Patient> {
  // Implementation
}

// ❌ Bad
function createPatient(data: any) {
  // Implementation
}
```

**Best practices:**
- Use TypeScript strict mode
- Define interfaces for all data structures
- Avoid `any` type
- Use type inference where appropriate
- Document complex types with JSDoc

### React Components

```typescript
// ✅ Good
interface PrescriptionFormProps {
  patientId: string
  onSubmit: (data: PrescriptionData) => void
}

export function PrescriptionForm({ patientId, onSubmit }: PrescriptionFormProps) {
  // Implementation
  return <form>...</form>
}

// ❌ Bad
export function PrescriptionForm(props) {
  return <form>...</form>
}
```

**Best practices:**
- Use functional components
- Define prop types with interfaces
- Use meaningful component names
- Keep components focused (single responsibility)
- Extract reusable logic into hooks

### File Structure

```
components/
├── ui/              # Reusable UI components
│   ├── button.tsx
│   └── input.tsx
├── forms/           # Form components
│   └── prescription-form.tsx
└── prescriptions/   # Feature-specific components
    ├── prescription-list.tsx
    └── prescription-detail.tsx
```

### Naming Conventions

**Files:**
- Components: `PascalCase.tsx` or `kebab-case.tsx`
- Utilities: `camelCase.ts`
- Types: `PascalCase.types.ts`

**Variables:**
- Constants: `UPPER_SNAKE_CASE`
- Variables/Functions: `camelCase`
- Components: `PascalCase`
- Interfaces: `PascalCase` (prefixed with `I` optional)

### Code Style

We use ESLint and Prettier:

```bash
# Check linting
npm run lint

# Auto-fix issues
npm run lint:fix

# Format code
npm run format
```

**Key rules:**
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multi-line
- Max line length: 100 characters

### Comments

```typescript
// ✅ Good - Explain WHY, not WHAT
// Using debounce to prevent excessive API calls during typing
const debouncedSearch = useDebouncedValue(searchTerm, 300)

// ❌ Bad - States the obvious
// This is a search input
const searchInput = <input type="text" />
```

### Error Handling

```typescript
// ✅ Good
try {
  const result = await createPrescription(data)
  return { success: true, data: result }
} catch (error) {
  if (error instanceof ValidationError) {
    return { success: false, error: error.message }
  }
  logger.error('Failed to create prescription', error)
  throw error
}

// ❌ Bad
try {
  await createPrescription(data)
} catch (error) {
  console.log(error)
}
```

### Testing

Write tests for:
- New features
- Bug fixes
- Complex logic
- Edge cases

```typescript
// Example test
describe('PrescriptionForm', () => {
  it('should validate required fields', async () => {
    render(<PrescriptionForm patientId="123" onSubmit={jest.fn()} />)
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)
    
    expect(await screen.findByText(/medication is required/i)).toBeInTheDocument()
  })
})
```

---

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No console warnings/errors
- [ ] Builds successfully

### PR Template

Use our [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md):

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe testing approach

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added
- [ ] Documentation updated
```

### Review Process

1. **Automated checks**: CI/CD must pass
2. **Code review**: At least one maintainer approval required
3. **Testing**: Reviewers may test changes locally
4. **Feedback**: Address review comments
5. **Merge**: Maintainer merges when approved

### After Merge

- Your contribution will be in the next release
- You'll be added to [Contributors](#)
- Close related issues

---

## 🏗️ Project Structure

Understanding the codebase:

```
HealthScript-Pro/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── forms/             # Form components
│   ├── prescriptions/     # Prescription components
│   └── patients/          # Patient components
├── lib/
│   ├── db.ts              # Database client
│   ├── auth.ts            # Auth config
│   └── utils.ts           # Utilities
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # DB migrations
├── types/                 # TypeScript types
├── hooks/                 # Custom React hooks
└── public/                # Static assets
```

---

## 🌟 Recognition

Contributors are recognized in:
- [README.md](README.md) Contributors section
- Release notes
- Project documentation
- Social media shoutouts

---

## 💬 Community

### Get Help

- **GitHub Discussions**: Questions and general discussion
- **Discord**: Real-time chat
- **Email**: dev@healthscript-pro.com

### Stay Updated

- **Watch** the repository for notifications
- Follow us on **Twitter**: [@HealthScriptPro](#)
- Join our **Newsletter**: [Subscribe](#)

---

## 📚 Additional Resources

- [Setup Guide](SETUP_GUIDE.md)
- [API Documentation](API_DOCUMENTATION.md)
- [Architecture Overview](DOCUMENTATION.md)
- [Testing Guide](#)

---

## 🎓 Learning Resources

New to the technologies we use?

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## ❓ Questions?

Feel free to:
- Open a [GitHub Discussion](https://github.com/akhilthirunalveli/HealthScript-Pro/discussions)
- Reach out on Discord
- Email: dev@healthscript-pro.com

---

## 🙏 Thank You!

Your contributions make HealthScript-Pro better for everyone. Whether you're fixing a typo or adding a major feature, every contribution matters!

**Happy coding!** 🚀

---

*Last updated: January 2026*
