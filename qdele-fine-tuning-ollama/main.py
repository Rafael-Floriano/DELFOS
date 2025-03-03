from transformers import LlamaForCausalLM, LlamaTokenizer
from datasets import load_dataset

model_name = "facebook/llama-3B"  # Substitua conforme necessário
model = LlamaForCausalLM.from_pretrained(model_name)
tokenizer = LlamaTokenizer.from_pretrained(model_name)


dataset = load_dataset("json", data_files="./dataset-2025-03-03-02:02:45.json")

def tokenize_function(examples):
    return tokenizer(examples['input'], truncation=True, padding="max_length", max_length=512)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

from transformers import Trainer, TrainingArguments

training_args = TrainingArguments(
    output_dir="./results",          # Diretório para armazenar o modelo treinado
    evaluation_strategy="epoch",     # Estratégia de avaliação
    learning_rate=2e-5,              # Taxa de aprendizado
    per_device_train_batch_size=4,   # Tamanho do batch
    num_train_epochs=3,             # Número de épocas de treinamento
    weight_decay=0.01,              # Decaimento de peso
)

trainer = Trainer(
    model=model,                         # O modelo a ser treinado
    args=training_args,                  # Argumentos de treinamento
    train_dataset=tokenized_datasets['train'],  # Dataset de treinamento
    eval_dataset=tokenized_datasets['test'],    # Dataset de validação (opcional)
)

# Iniciar o treinamento
trainer.train()
trainer.save_model("./modelo_finetuned")
