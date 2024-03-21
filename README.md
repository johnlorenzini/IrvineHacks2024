## Inspiration
We as developers and designers in the tech industry come home every night to friends, partners, and family members who work in the healthcare industry that know firsthand the shortcomings of the healthcare industry. Watching our loved ones share their frustrations of communicating with patients about their treatment plan and expressing their exhaustion with the often limiting ways in which they can fully understand the patients they interact with was heartbreaking to watch. All of us knew how deeply passionate our loved ones were about providing and caring for those who could not care for themselves, and to see that a systemic block was the primary reason for entirely preventable medical error was frustrating to recognize. We wanted to build a product that was not just a “band aid solution” to this infrastructural problem, but rather, reimagine the patient-provider relationship to work towards a stable systems-based diagnostic process.

## What it does
	Intended as a supplementary diagnosis tool for doctors and an avenue for facilitating an open conversation during diagnosis visits for chronic conditions between patient and provider, PatientPal is a product that simplifies complex medical terminology into simple language using OpenAI and displays the info in an intuitive graphic layout.  While a simple mechanic, the product is intended to act as a connector between patient and provider, inviting patients to join in the conversation during the diagnostic visit regarding their own treatment plan by  educating them of complex concepts in a simpler manner.

## How we built it
	PatientPal’s primary source of informational input was built using prompting fed to OpenAI. From there, we used Firebase to store conditional data related to specific chronic conditions, and power our search engine to filter between each condition. Powering both our frontend and backend development with NextJS, and using Tailwind CSS and NextUI to create PatientPal’s home page, we are able to display output from OpenAI prompting on the home page to be read by the patient and provider, all deployed on Vercel.

## Challenges we ran into
- Analyzing and parsing the AI output to transform the data into meaningful output for patients to view. 
- Difficulty training the AI based on specific medical-related prompts

## Accomplishments that we're proud of
- Connecting with our loved ones in healthcare, to further research how to best create an application that would be purposeful to this field
- Designing an intuitive and fluid UI that is simple to interact with for both patient and doctor.
- Creating a model that would output the correct information related the specific medical-related prompts (8-10 hours)

## What we learned
- Researching and developing for a field that we had very little personal background knowledge in.
- Working with AI in a development setting, coupled with connecting the proper API calls. 

## What's next for PatientPal
- Connecting with doctors to explore how the model can be trained on individual doctor’s research and notes, to tailor the application to the doctor’s personal workflow
- Dive into the world of healthcare, and understand how this application can potentially expand to other categories of patient safety, such as providing further information prior to surgical procedures.

