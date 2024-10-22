from dotenv import load_dotenv
from openai import OpenAI
from fastapi import FastAPI
import os
from pydantic import BaseModel

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

class MessageRequest(BaseModel):
    message: str

async def process_message(message_text: str):
    # Call OpenAI API to process the message
    response = client.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are going to help with resume suggestions"},
            {"role": "user", "content": message_text}
        ]
    )
    return response.choices[0].message.content  # Return the response content

# Define your FastAPI app for this module
app = FastAPI()

@app.post("/process-message")
async def api_process_message(request: MessageRequest):
    message_text = request.message
    response_content = await process_message(message_text)
    return {"response": response_content}