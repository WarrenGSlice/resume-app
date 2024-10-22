#basic api call function for later implementation

from dotenv import load_dotenv
from openai import OpenAI
from fastapi import FastAPI, Request
import os
from pydantic import BaseModel

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

class MessageRequest(BaseModel):
    message: str

@app.post("/process-message")
async def process_message(request: MessageRequest):
    message_text = request.message

    # Call OpenAI API to process the message
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are going to help with resume suggestions"},
            {"role": "user", "content": message_text}
        ]
    )

return (responses.choices[0].message.content)