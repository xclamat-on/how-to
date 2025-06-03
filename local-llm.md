# How to Install and Use LLM Locally


## Download LLM

#### Step 1: To download a LLM locally, you will first need to install Ollama.

`brew install ollama`

#### Step 2: Identify which LLM you want to use based on your use-case
You can find all available open-source models on https://ollama.com/search

I am currently trying `qwen2.5-coder:7b` from Alibaba. People online are saying its great as a Python coding assistant.

#### Step 3: download the model

Open a terminal and start the Ollama server: `ollama serve`

Open a new terminal and run `ollama pull qwen2.5-coder:7b`

#### Start running the model

You can run `ollama` to get all commands, such as list and show.

Run the model using `ollama run qwen2.5-coder:7b`

Now you can start asking questions and getting answers. I don't think it has persistant memory across interactions, so each conversation is a fresh one.


## Use local LLM with VS Code

#### Step 1: Install Continue extension 
You can find the instructions for this online. It's simple

#### Step 2: Setup Continue to use local LLM

From your home folder (~): `code .continue/config.yaml`

In the Models section, add this:

```
models: 
  - name: Ollama Qwen Coder
    provider: ollama
    model: qwen2.5-coder:7b
```

Restart VSCode. Once you open it and go to the Continue extension, you should see that the Ollama Qwuen Coder is selected and you can ask it questions and generate code for you.


