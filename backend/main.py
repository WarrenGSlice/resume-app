from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from generate.apiCall import process_message  # Import the process_message function


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],  # uses default local host on machine
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# initial server screen
@app.get("/")
async def root():
    return {"message": "basic screen"}

# API endpoint for uploading a resume file to database
@app.post("/upload_resume")
async def upload_resume(file: UploadFile = File(...)):
    # Process the resume file, parse it for text
    # Embed it in the vector database
    return {"message": "Resume uploaded and embedded"}

# API endpoint for parsing the uploaded resume
@app.get("/parse_resume/{user_id}")
async def parse_resume(user_id: int):
    # Retrieve the embedded resume, extract info (e.g., name, skills)
    return {"parsed_data": "Relevant info extracted"}

# API endpoint for generating suggestions based on the parsed resume
# this is in the case of pre-user-input suggestions (if we choose to do so)
@app.post("/generate_suggestions/{user_id}")
async def generate_suggestions(user_id: int):
    # Run parsed resume data through a generative AI model (e.g., OpenAI API)
    suggestions = "Generated suggestions based on resume"
    return {"suggestions": suggestions}

# API endpoint for fetching the suggestions
@app.get("/suggestions/{user_id}")
async def get_suggestions(user_id: int):
    # Fetch the suggestions from the database or cache
    return {"suggestions": "AI suggestions for the resume"}

