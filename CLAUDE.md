# CLAUDE.md - AI Assistant Guide for Vid Project

> **Last Updated**: 2026-01-22
> **Project**: vid
> **Status**: Initial Setup

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Repository Structure](#repository-structure)
- [Development Workflow](#development-workflow)
- [Key Technologies](#key-technologies)
- [Coding Conventions](#coding-conventions)
- [Testing Guidelines](#testing-guidelines)
- [Common Tasks](#common-tasks)
- [AI Assistant Guidelines](#ai-assistant-guidelines)

---

## 🎯 Project Overview

**Project Name**: vid
**Type**: Video Creation/Processing Application (Remotion-based)
**Repository**: bendik-wq/vid

### Purpose
This project appears to be focused on video creation, editing, or processing, likely leveraging the Remotion framework for programmatic video generation using React.

### Key Objectives
- To be determined as project develops
- Video content creation using code
- Potentially automated video workflows

---

## 📁 Repository Structure

```
vid/
├── .git/                 # Git repository data
├── src/                  # Source code (to be created)
├── public/               # Static assets (to be created)
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── CLAUDE.md            # This file
```

**Note**: Repository is currently empty. Structure will be updated as project develops.

---

## 🔄 Development Workflow

### Branch Strategy

**Current Branch**: `claude/claude-md-mkpu1vvl8s1hh11t-Y4uXr`

All AI-assisted development should:
1. Work on designated feature branches starting with `claude/`
2. Branch names must end with the session ID
3. Never push to main/master without explicit permission
4. Always use `git push -u origin <branch-name>`

### Git Operations Best Practices

**Pushing Changes:**
```bash
git push -u origin claude/<session-id>
```
- Retry up to 4 times with exponential backoff on network errors (2s, 4s, 8s, 16s)
- CRITICAL: Branch must start with 'claude/' and end with session ID

**Fetching/Pulling:**
```bash
git fetch origin <branch-name>
git pull origin <branch-name>
```
- Prefer fetching specific branches
- Use same retry logic for network failures

### Commit Message Guidelines

- Use clear, descriptive commit messages
- Focus on "why" rather than "what"
- Follow conventional commits format:
  - `feat:` - New features
  - `fix:` - Bug fixes
  - `docs:` - Documentation changes
  - `refactor:` - Code refactoring
  - `test:` - Test additions/changes
  - `chore:` - Build/tooling changes

---

## 🛠 Key Technologies

### Expected Stack (To be confirmed)

- **Framework**: Remotion (React-based video creation)
- **Language**: TypeScript/JavaScript
- **Build Tool**: TBD (likely Webpack/Vite)
- **Package Manager**: npm/yarn/pnpm

### Development Tools

- **Git**: Version control
- **Node.js**: Runtime environment
- **VSCode/IDE**: Recommended for development

---

## 📏 Coding Conventions

### General Principles

1. **Avoid Over-Engineering**
   - Only make changes directly requested or clearly necessary
   - Keep solutions simple and focused
   - Don't add features beyond what was asked
   - Three similar lines > premature abstraction

2. **Security First**
   - Watch for command injection vulnerabilities
   - Prevent XSS and SQL injection
   - Follow OWASP top 10 guidelines
   - Validate at system boundaries only

3. **Clean Code**
   - Self-documenting code preferred over comments
   - Only comment where logic isn't self-evident
   - Delete unused code completely (no `_vars` or `// removed` comments)
   - No backwards-compatibility hacks unless explicitly needed

### TypeScript Guidelines (if applicable)

- Use strict type checking
- Prefer interfaces for public APIs
- Use type inference where clear
- Avoid `any` unless absolutely necessary

### Code Organization

- One component/function per file when it makes sense
- Group related functionality together
- Keep files focused and cohesive
- Import organization: external → internal → relative

---

## 🧪 Testing Guidelines

### Test Strategy (To be established)

- Write tests for critical functionality
- Don't test for scenarios that can't happen
- Trust internal code and framework guarantees
- Validate only at system boundaries

### Running Tests

```bash
# Commands to be added as project develops
npm test
npm run test:watch
```

---

## ⚡ Common Tasks

### Initial Setup (When project has content)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Video-Specific Tasks (Remotion)

```bash
# Preview compositions
npm run preview

# Render video
npm run render

# Upgrade Remotion
npx remotion upgrade
```

### Development Commands

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

---

## 🤖 AI Assistant Guidelines

### Before Making Changes

1. **ALWAYS** read files before proposing changes
2. Understand existing code before modifications
3. Use TodoWrite tool for multi-step tasks
4. Search codebase using Task tool with Explore agent for context gathering

### When Writing Code

1. **Never skip reading files** - understand before modifying
2. **Use specialized tools**:
   - Read for reading files (not cat)
   - Edit for editing files (not sed/awk)
   - Write for creating new files (not echo)
   - Grep for searching code
   - Glob for finding files by pattern

3. **Avoid unnecessary changes**:
   - Don't add docstrings to unchanged code
   - Don't refactor surrounding code during bug fixes
   - Don't add error handling for impossible scenarios
   - Don't create abstractions for one-time operations

4. **Tool Usage**:
   - Run independent commands in parallel
   - Use multiple tool calls in single message when possible
   - Never use bash for file operations
   - Prefer Task tool for exploratory searches

### Security Considerations

- Assist with authorized security testing only
- Refuse destructive techniques (DoS, mass targeting)
- Dual-use tools require clear authorization context
- Educational/CTF contexts are acceptable

### Communication Style

- Be concise and clear (CLI-appropriate)
- No emojis unless explicitly requested
- Use GitHub-flavored markdown for formatting
- Output text for communication, not bash commands or comments
- Technical accuracy over validation
- Provide objective guidance, disagree when necessary

### Task Management

- Use TodoWrite for complex multi-step tasks (3+ steps)
- Mark todos as completed immediately after finishing
- Only ONE task in_progress at a time
- Break complex tasks into smaller steps
- Provide both `content` and `activeForm` for tasks

### File References

When referencing code, use: `file_path:line_number`

Example:
```
The video composition is defined in src/Video.tsx:42
```

---

## 🔍 Project-Specific Notes

### Current State

- Repository initialized but empty
- Awaiting initial project setup
- Remote configured but contains no content
- Working on feature branch: `claude/claude-md-mkpu1vvl8s1hh11t-Y4uXr`

### Next Steps

1. Initialize package.json with project dependencies
2. Set up Remotion project structure
3. Configure TypeScript and build tools
4. Establish testing framework
5. Create initial video compositions

### Known Issues

- None yet (project just starting)

### Resources

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Remotion Skills](https://github.com/remotion-dev/skills)
- Project Repository: bendik-wq/vid

---

## 📝 Update History

| Date | Changes | Updated By |
|------|---------|------------|
| 2026-01-22 | Initial CLAUDE.md creation | Claude AI |

---

## 💡 Tips for AI Assistants

1. **Always check this file first** when working on the project
2. **Update this file** when project structure or conventions change
3. **Reference specific sections** when explaining decisions
4. **Keep it current** - outdated docs are worse than no docs
5. **Be specific** - generic advice doesn't help

---

*This file is a living document and should be updated as the project evolves.*
