---
description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Include tests for critical business rules, financial calculations,
formatting utilities, repository/service contracts, and any risk-bearing user
journey. Broader UI tests may be omitted only when the feature specification
explicitly accepts manual validation for that surface.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Centok frontend**: `src/app/`, `src/components/`, `src/features/`,
  `src/domain/`, `src/services/`, `src/repositories/`, `src/mocks/`,
  `src/lib/`, `src/styles/`
- **Tests**: `tests/unit/` and `tests/integration/`, or colocated test files if
  the implementation plan explicitly chooses that convention
- **Spec artifacts**: `specs/[###-feature-name]/`

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit-tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md with their priorities P1, P2, P3...
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Service/repository contracts from contracts/
  - Centok constitution gates for deterministic mocks, financial clarity,
    integration-ready architecture, accessibility, and quality validation

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline frontend structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize Next.js App Router, React, TypeScript strict mode, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, and Zod as required by the plan
- [ ] T003 [P] Configure TypeScript validation, linting, formatting, and test scripts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Define domain models for assets, balances, portfolio positions, quotes, orders, funding transactions, and transaction history in `src/domain/`
- [ ] T005 [P] Create repository and service interfaces for assets, portfolio, orders, and funding in `src/repositories/` and `src/services/`
- [ ] T006 [P] Create typed deterministic mock fixtures and predefined demo scenarios in `src/mocks/`
- [ ] T007 Implement centralized money, percentage, quantity, and date formatting utilities in `src/lib/`
- [ ] T008 Create design tokens for colors, spacing, typography, radius, shadows, breakpoints, and transitions in `src/styles/`
- [ ] T009 Configure error, loading, pending, empty, expired, and reset-state handling patterns

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Unit test for relevant business or formatting logic in `tests/unit/[name].test.ts`
- [ ] T011 [P] [US1] Repository/service contract test for deterministic mock behavior in `tests/unit/[name].test.ts`

### Implementation for User Story 1

- [ ] T012 [P] [US1] Create or update domain models in `src/domain/`
- [ ] T013 [P] [US1] Create or update mock fixtures in `src/mocks/`
- [ ] T014 [US1] Implement repository or service logic in `src/repositories/` or `src/services/` (depends on T012, T013)
- [ ] T015 [US1] Implement feature UI in `src/features/[feature]/`
- [ ] T016 [US1] Add review, loading, empty, pending, success, error, and expired states as applicable
- [ ] T017 [US1] Add keyboard navigation, focus states, and non-color status cues

**Checkpoint**: At this point, User Story 1 MUST be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2

- [ ] T018 [P] [US2] Unit test for relevant business or formatting logic in `tests/unit/[name].test.ts`
- [ ] T019 [P] [US2] Repository/service contract test for deterministic mock behavior in `tests/unit/[name].test.ts`

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create or update domain models in `src/domain/`
- [ ] T021 [US2] Implement repository or service logic in `src/repositories/` or `src/services/`
- [ ] T022 [US2] Implement feature UI in `src/features/[feature]/`
- [ ] T023 [US2] Integrate with User Story 1 components if needed while preserving independent testability

**Checkpoint**: At this point, User Stories 1 and 2 MUST both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3

- [ ] T024 [P] [US3] Unit test for relevant business or formatting logic in `tests/unit/[name].test.ts`
- [ ] T025 [P] [US3] Repository/service contract test for deterministic mock behavior in `tests/unit/[name].test.ts`

### Implementation for User Story 3

- [ ] T026 [P] [US3] Create or update domain models in `src/domain/`
- [ ] T027 [US3] Implement repository or service logic in `src/repositories/` or `src/services/`
- [ ] T028 [US3] Implement feature UI in `src/features/[feature]/`

**Checkpoint**: All user stories MUST be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in `docs/`
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests for business and formatting logic in `tests/unit/`
- [ ] TXXX Verify no page component imports mock fixtures directly
- [ ] TXXX Verify all financial actions include a review step with fees, totals, estimates, and quote expiration when applicable
- [ ] TXXX Verify keyboard navigation, visible focus states, responsive layouts, and non-color status cues
- [ ] TXXX Run TypeScript validation and linting
- [ ] TXXX Manually validate the landing page to completed mock purchase presentation flow
- [ ] TXXX Security and misleading-claims review
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but MUST remain independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but MUST remain independently testable

### Within Each User Story

- Tests for critical business and formatting logic MUST be written and FAIL before implementation
- Domain models before services
- Repositories and services before page components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel within Phase 2
- Once Foundational phase completes, all user stories can start in parallel if team capacity allows
- All tests for a user story marked [P] can run in parallel
- Models and fixtures within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for financial formatting in tests/unit/[name].test.ts"
Task: "Repository/service contract test in tests/unit/[name].test.ts"

# Launch all domain and fixture work for User Story 1 together:
Task: "Create asset model in src/domain/"
Task: "Create portfolio position mock fixture in src/mocks/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. STOP and VALIDATE: Test User Story 1 independently
5. Demo if ready

### Incremental Delivery

1. Complete Setup + Foundational so the foundation is ready
2. Add User Story 1, test independently, then demo
3. Add User Story 2, test independently, then demo
4. Add User Story 3, test independently, then demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story MUST be independently completable and testable
- Verify required tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid vague tasks, same-file conflicts, and cross-story dependencies that break independence
