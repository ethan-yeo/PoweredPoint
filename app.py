from dotenv import load_dotenv
import os 
import re

#LangChain Imports
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.history_aware_retriever import create_history_aware_retriever
from langchain.prompts import PromptTemplate
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage 
from langchain_openai import AzureChatOpenAI
from langchain.tools import StructuredTool
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain_community.chat_message_histories import ChatMessageHistory

#RAG Imports
from langchain_community.vectorstores.azure_cosmos_db import AzureCosmosDBVectorSearch, CosmosDBSimilarityType, CosmosDBVectorSearchType
from langchain_openai import AzureOpenAIEmbeddings
from pymongo import MongoClient
from urllib.parse import quote_plus

load_dotenv()

prompt = """
You are a power point presentation specialist. You are asked to create
the content for a presentation about {topic}.
You have been given the following information to create a presentation:
---
{information}.
---
Structure the information in a way that it can be put in a power point
presentation. Each slide should have a title and content, with the content
being a summary of the information provided. Each slide should have one or
more sentences that capture the key points of the information.
Return the structured information as a JSON as follows.
Your answer should only contain the JSON - no markdown formatting.
"""
prompt_template = PromptTemplate.from_template(prompt)
prompt_examples = """
Example:
{"slides": [
{"title": "Slide 1", "content": "Content for slide 1"},
{"title": "Slide 2", "content": "Content for slide 2"},
{"title": "Slide 3", "content": "Content for slide 3"},
]}
"""

test_topic = "the benefits of exercise"
test_information = """
Exercise plays a crucial role in maintaining both physical and mental health.
Engaging in regular physical activity can significantly reduce the risk of
chronic diseases such as heart disease, diabetes, and obesity. It also enhances
muscular strength, flexibility, and endurance. Beyond physical benefits, exerci
contributes to improved mental health by reducing symptoms of depression and an
boosting mood through the release of endorphins, and improving cognitive functi
It fosters a sense of well-being and can be a great way to manage stress.
Overall, incorporating exercise into one's daily routine is a key factor in
achieving a healthier and more balanced lifestyle.
"""
content_prompt = (
    prompt_template.format(topic=test_topic, information=test_information)
    + prompt_examples
)


# LLM Initialization
api_key = os.getenv('CONST_GPT4o_API_KEY')
api_version = os.getenv('CONST_GPT4o_API_VERSION')
base_url = os.getenv('CONST_GPT4o_ENDPOINT')
llm = AzureChatOpenAI(
                api_key=api_key,
                api_version=api_version,
                base_url=base_url
            )


powerpoint_prompt = """
You are a PowerPoint presentation specialist. You'll get a list of slides, each
slide containing a title and content. You need to create a PowerPoint presentat
based on the provided slides.
But there is a catch: Instead of creating the presentation, provide python code
that generates the PowerPoint presentation based on the provided slides.
Use the package python-pptx to create the PowerPoint presentation.
The presentation should be visually appealing and professionally designed.
If the slides content contains more than one information, make bullet points.
Save the presentation as 'presentation.pptx'.
Your answer should only contain the python code, no explanatory text.
Slides:
"""

# Generating the slides content
slides_response = llm.invoke(content_prompt)
slides = slides_response.content # Assuming response is a dictionary with 'content' key

# Generating the PowerPoint creation code
presentation_code_response = llm.invoke(powerpoint_prompt + slides)
presentation_code = presentation_code_response.content

# Extracting the python code from the response
match = re.findall(r"python\n(.*?)\n```", presentation_code, re.DOTALL)
python_code = match[0]

# Executing the extracted Python code
exec(python_code)