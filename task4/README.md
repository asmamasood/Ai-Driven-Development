This project uses Context7 MCP + OpenAgents SDK + Gemini CLI to build a PDF quiz application.

Main functionalities:

PDF Summarizer

User uploads a PDF.

Extract text using PyPDF.

Send the text to the MCP/OpenAgents agent via Gemini CLI.

Agent generates a clean, meaningful summary.

Display summary in a visually appealing Streamlit UI (cards, containers, blocks, etc.).

Quiz Generator

User clicks “Create Quiz”.

Agent reads the original PDF text.

Generates MCQs or mixed-style quizzes.

Displays quiz with answer inputs for the user.

Evaluation (Optional but Recommended)

After user submits answers, the agent evaluates correctness and provides explanations.

Technical Requirements

Python 3.x

Streamlit (UI)

PyPDF (PDF text extraction)

OpenAgents SDK (AI agent)

Gemini CLI (to interact with MCP server)

Context7 MCP server as the tool provider

Environment Variables

Create a .env file in the project root:

# MCP / Agent API Key
is in .env

Project Flow
1. User uploads PDF via Streamlit UI
2. Extract text using PyPDF
3. Send text to MCP/OpenAgents agent (Gemini CLI)
4. Agent returns a summary → display in UI
5. User clicks “Create Quiz”
6. Agent reads original PDF text → generates MCQs / mixed quizzes /true false /short question etc
7. Display quiz for user
8. User submits answers
9. Agent evaluates → outputs Correct/Incorrect + Explanation