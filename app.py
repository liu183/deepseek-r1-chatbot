from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
from groq import Groq

# 加载环境变量
load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')
        
        client = Groq()
        completion = client.chat.completions.create(
            model="deepseek-r1-distill-qwen-32b",
            messages=[
                {
                    "role": "user",
                    "content": user_message
                }
            ],
            temperature=0.6,
            max_completion_tokens=4096,
            top_p=0.95,
            stream=True,
            stop=None,
        )
        
        def generate():
            for chunk in completion:
                if chunk.choices[0].delta.content is not None:
                    yield chunk.choices[0].delta.content
                    
        return app.response_class(
            generate(),
            mimetype='text/event-stream'
        )
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 