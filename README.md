# Screeps LLM Bot

**A Screeps bot designed to be written and maintained using an LLM.**

## Overview

This project is a **modular, LLM-friendly Screeps bot** built from the ground up with **structured, maintainable, and well-documented** JavaScript code. The goal is to make the bot's logic easy to understand, extend, and debug—whether by a human developer or a language model.

## Features

- **LLM-Optimized Codebase** – Structured in a way that makes it easy for AI tools to analyze and modify.
- **Modular Design** – Each role and utility is separate for clarity and maintainability.
- **Scalability** – Designed to expand efficiently as the game progresses.
- **Readable and Documented** – Code is well-commented to facilitate AI and human collaboration.

## Telemetry and Monitoring Architecture

### Overview
The bot employs a **continuous telemetry system** to monitor and analyze creep behavior, inspired by real-world aerospace telemetry. The goal is to collect **detailed data every tick**, track performance, and detect anomalies in real time. This ensures efficient operations and early identification of unexpected behaviors.

### Key Concepts
- **Telemetry Stream:** Each tracked creep generates a continuous stream of data logging its actions, positions, and targets every tick.
- **Anomaly Detection:** The system evaluates telemetry data to flag unexpected behavior, such as abnormal state transitions.
- **Nominal vs. Off-Nominal States:** Expected actions occur under **nominal conditions**, while deviations from expected sequences trigger **off-nominal alerts**.
- **Alert Logging:** If an anomaly is detected, an alert is logged to notify the system of potential inefficiencies or issues.

### Architecture
#### 1. **Telemetry Collection (`utils-telemetry.js`)**
- Handles logging of creep actions every tick.
- Maintains a rolling window of recent telemetry data in `Memory.telemetry`.
- Provides methods to retrieve and clear telemetry records.

#### 2. **Creep Behavior Tracking (`role-harvester.js`)**
- Each harvester logs its activity (e.g., `harvest`, `moveToTarget`, `transfer`) using the telemetry system.
- The telemetry stream captures the full operational history of each harvester.

#### 3. **Monitoring and Anomaly Detection (`role-harvester-monitor.js`)**
- Aggregates telemetry data to detect unexpected state transitions.
- Logs alerts when an off-nominal condition is identified.
- Runs automatically every tick to ensure real-time monitoring.

#### 4. **Main Loop Integration (`main.js`)**
- Runs all creeps and manages spawning.
- Calls `monitorTelemetry()` each tick to evaluate system performance.
- Provides configurable tracking for specific creeps by setting `Memory.testCreepName`.

### Usage
- **Enable telemetry for a specific creep:**
  ```js
  Memory.testCreepName = "harvester123";
  ```
- **Clear all telemetry records:**
  ```js
  require('utils-telemetry').clearTelemetry('harvester');
  ```
- **Monitor alerts and behavior logs in the console.**

This system ensures a **structured, real-time monitoring approach**, optimizing efficiency and detecting off-nominal behavior dynamically.

### Set up Git Hooks
```bash
git config core.hooksPath scripts/git-hooks
chmod +x scripts/git-hooks/pre-commit
```

## Development Guidelines

### Code Style

Follow a consistent, modular structure.
Keep function and variable names clear and descriptive.
Use JSDoc-style comments where necessary.
Minimize global state to make it easier for AI to reason about.

### Working with LLMs

Describe the intent of a function before writing it. This helps AI tools generate better code.

Write concise, modular functions. LLMs perform better when working with smaller, well-defined logic.

Use structured prompts when asking for code modifications. Example:

"Refactor the harvester role to prioritize nearest energy sources and implement a fallback if none are available."

## Roadmap

 Implement basic creep roles (harvester, builder, upgrader)
 Optimize CPU usage
 Introduce defensive logic
 Implement automated expansion
 Fine-tune LLM interaction strategies

## License

Apache 2.0 License. See LICENSE for details.
