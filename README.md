# Screeps LLM Bot

**A Screeps bot designed to be written and maintained using an LLM.**

## Overview

This project is a **modular, LLM-friendly Screeps bot** built from the ground up with **structured, maintainable, and well-documented** JavaScript code. The goal is to make the bot's logic easy to understand, extend, and debug—whether by a human developer or a language model.

## Features

- **LLM-Optimized Codebase** – Structured in a way that makes it easy for AI tools to analyze and modify.
- **Modular Design** – Each role and utility is separate for clarity and maintainability.
- **Scalability** – Designed to expand efficiently as the game progresses.
- **Readable and Documented** – Code is well-commented to facilitate AI and human collaboration.

## Project Structure
📂 src/
 ├── 📂 roles/            # Creep role logic (harvester, builder, etc.)
 ├── 📂 utils/            # Helper functions for various tasks
 ├── main.js              # Entry point for the bot
 ├── config.js            # Bot settings and constants
 ├── README.md            # Project documentation
 ├── package.json         # Dependencies and scripts

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
