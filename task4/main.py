import streamlit as st
import os
from dotenv import load_dotenv
import google.generativeai as genai
from PyPDF2 import PdfReader
import json

# ---------------------- ENV CONFIG ----------------------
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
    except Exception as e:
        st.error(f"Error configuring Gemini API: {e}")
else:
    st.error("❌ GEMINI_API_KEY missing in .env")
    st.stop()

# ---------------------- GEMINI WRAPPER ----------------------
def get_gemini_response(input_text, prompt):
    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content([input_text, prompt])
    return response.text

# ---------------------- PDF TEXT EXTRACTION ----------------------
def get_text_from_pdf(uploaded_file):
    text = ""
    try:
        pdf = PdfReader(uploaded_file)
        for page in pdf.pages:
            text += page.extract_text()
    except Exception as e:
        st.error(f"Error reading PDF: {e}")
    return text

# ---------------------- STYLING ----------------------
st.markdown("""
<style>
.stApp { background: linear-gradient(135deg, #d4e0ff 0%, #f8f9ff 100%); }
.title { font-size: 50px; font-weight: 800; text-align: center; color: #2b2d42; padding-bottom: 10px; }
.sub { font-size: 22px; text-align: center; color: #4a4e69; margin-bottom: 20px; }
.upload-box { background: white; padding: 35px; border-radius: 18px; box-shadow: 0px 4px 16px rgba(0,0,0,0.12); width: 60%; margin: auto; border: 2px dashed #6c63ff; }
.card { background: #ffffff; padding: 25px; border-radius: 20px; box-shadow: 0px 3px 12px rgba(0,0,0,0.15); margin-top: 25px; }
.score-box { background: #edf2ff; padding: 20px; border-radius: 15px; text-align: center; font-size: 22px; font-weight: bold; color: #1c1c3c; }
.stButton>button { background: #6c63ff; color: white; border-radius: 10px; padding: 12px 28px; font-size: 18px; transition: 0.3s; }
.stButton>button:hover { background: #4338ca; transform: scale(1.05); }
</style>
""", unsafe_allow_html=True)

# ---------------------- APP UI ----------------------
st.markdown("<h1 class='title'>✨ PDF Quiz Generator ✨</h1>", unsafe_allow_html=True)
st.markdown("<p class='sub'>Upload your PDF and turn it into a Summary + Quiz automatically!</p>", unsafe_allow_html=True)

st.markdown("<div class='upload-box'>", unsafe_allow_html=True)
uploaded_file = st.file_uploader("📄 Upload your PDF file", type=["pdf"])
st.markdown("</div>", unsafe_allow_html=True)

# ---------------------- MAIN LOGIC ----------------------
if uploaded_file:
    st.success("📄 PDF uploaded successfully!")

    # Extract text
    with st.spinner("🔍 Extracting text from the PDF..."):
        pdf_text = get_text_from_pdf(uploaded_file)

    if pdf_text:
        # Generate Summary
        with st.spinner("📝 Generating Summary..."):
            summary_prompt = "Summarize the following text in 250 words."
            summary = get_gemini_response(pdf_text, summary_prompt)

        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.subheader("📘 Summary")
        st.write(summary)
        st.markdown("</div>", unsafe_allow_html=True)

        # Generate Quiz
        with st.spinner("🎯 Generating Quiz..."):
            quiz_prompt = """
            Create a quiz based on the provided text with the following structure.

            Generate:
            1. 3 Multiple-Choice Questions (MCQs)
            2. 3 True/False Questions
            3. 2 Short Questions (1–2 line answers)

            Return ONLY the following JSON format:

            {
              "mcq": [
                {"question": "...", "options": ["A", "B", "C", "D"], "answer": "..."}
              ],
              "true_false": [
                {"question": "...", "answer": "True/False"}
              ],
              "short_questions": [
                {"question": "...", "answer": "..."}
              ]
            }
            """
            quiz_raw = get_gemini_response(pdf_text, quiz_prompt)

        # Parse JSON safely
        try:
            json_start = quiz_raw.find('{')
            json_end = quiz_raw.rfind('}') + 1
            quiz_data = json.loads(quiz_raw[json_start:json_end])
        except:
            st.error("Quiz JSON format error.")
            st.write(quiz_raw)
            quiz_data = {}

        mcq = quiz_data.get("mcq", [])
        true_false = quiz_data.get("true_false", [])
        short_questions = quiz_data.get("short_questions", [])

        # Display Quiz
        if quiz_data:
            st.markdown("<div class='card'>", unsafe_allow_html=True)
            st.subheader("📝 Quiz Section")

            user_answers = {}

            # MCQs
            if mcq:
                st.write("### 🎯 Multiple Choice Questions")
                for i, q in enumerate(mcq):
                    user_answers[f"mcq{i}"] = st.radio(q["question"], q["options"])

            # True/False
            if true_false:
                st.write("### ✔️ True / False Questions")
                for i, q in enumerate(true_false):
                    user_answers[f"tf{i}"] = st.radio(q["question"], ["True", "False"])

            # Short Questions
            if short_questions:
                st.write("### ✏️ Short Questions")
                for i, q in enumerate(short_questions):
                    user_answers[f"short{i}"] = st.text_input(q["question"])

            # Submit Button
            if st.button("Submit Answers"):
                score = 0
                total = len(mcq) + len(true_false) + len(short_questions)

                # MCQ scoring
                for i, q in enumerate(mcq):
                    if user_answers[f"mcq{i}"] == q["answer"]:
                        score += 1

                # T/F scoring
                for i, q in enumerate(true_false):
                    if user_answers[f"tf{i}"] == q["answer"]:
                        score += 1

                # Short questions scoring (case-insensitive)
                for i, q in enumerate(short_questions):
                    if user_answers[f"short{i}"].strip().lower() == q["answer"].strip().lower():
                        score += 1

                st.markdown(f"<div class='score-box'>🎉 Your Score: {score}/{total}</div>", unsafe_allow_html=True)

            st.markdown("</div>", unsafe_allow_html=True)

else:
    st.info("📥 Please upload a PDF file to continue.")
