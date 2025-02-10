from openai import OpenAI

client = OpenAI(
  api_key="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"
)

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  store=True,
  messages=[
    {"role": "user", "content": "write a haiku about ai"}
  ]
)

print(completion.choices[0].message);
