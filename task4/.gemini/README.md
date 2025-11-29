Build a complete Streamlit application in Python that allows users to upload PDFs, automatically summarizes the content, generates quizzes, and evaluates user answers. All AI logic (summary, quiz generation, answer evaluation) must go through a Context7 MCP / OpenAgents agent using a Gemini API key. Use the .env file to store the Gemini key.

Requirements:

PDF Upload & Extraction

Use PyPDF to extract text from uploaded PDFs.

AI Summary

Agent generates a clean, readable summary.

Display in a visually appealing Streamlit UI (cards, blocks, containers).

Quiz Generator

After summary, allow the user to click "Create Quiz".

Agent reads the original PDF text, not the summary.

Generate MCQs and short-answer questions.

Display questions with input fields for the user in Streamlit.

Answer Evaluation

After user submits answers, agent evaluates and returns:

Correct / Incorrect

Correct answer

Explanation

Gemini Key Integration

Load GEMINI_API_KEY from .env.

Use it for all agent interactions (summary, quiz generation, evaluation).

Streamlit UI

Modern, beautiful design (cards, spacing, colors, icons).

Display summary and quizzes clearly.

Show evaluation results dynamically.

Modular Code

Separate functions for:

extract_pdf_text()

generate_summary()

generate_quiz()

evaluate_answers()

Folder structure:

/MCP-PDF-Quiz-App
│
├── app.py
├── requirements.txt
├── .env
└── /utils
    ├── pdf_extractor.py
    └── agent_functions.py


Deliverables

Full Streamlit code (app.py)

Custom UI code (optional CSS)

requirements.txt

Ready-to-run project using Gemini API key