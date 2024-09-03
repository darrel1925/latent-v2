export const NECESSITY_LETTER_PROMPT = `
Write a medical necessity letter for a patient named [Patient Name] who needs [Treatment/Procedure] for [Condition]. Format the letter using the following HTML tags:

<h2> for the title
<p> for paragraphs
<strong> for bold text
<em> for italicized text
<br> for line breaks

Include the current date, doctor's name and address, and a signature at the end. Use appropriate formatting and structure for a formal letter.

Ensure you have a </br> each time you add a new line.
return only the HTML AND NOTHING ELSE. I want to copy and paste the HTML directly into my code
Do not include the \`\`\`html\`\`\` tags in your response.`
