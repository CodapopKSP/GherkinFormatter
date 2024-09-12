// Function to add a new rule field with a plus button for description
document.getElementById('addRuleButton').addEventListener('click', function() {
    const container = document.getElementById('rules-choices-container');
    
    // Create rule label and input
    const ruleDiv = document.createElement('div');
    ruleDiv.classList.add('rule-group');

    const newRuleLabel = document.createElement('label');
    newRuleLabel.textContent = 'Rule:';
    newRuleLabel.classList.add('rule-label');  // Add specific class to Rule label
    
    const newRuleInput = document.createElement('input');
    newRuleInput.type = 'text';
    newRuleInput.name = 'Rule[]';
    newRuleInput.placeholder = 'Enter rule';

    const addDescriptionButton = document.createElement('button');
    addDescriptionButton.type = 'button';
    addDescriptionButton.textContent = '+';
    addDescriptionButton.classList.add('add-description');
    
    // Add event listener to add description for this specific rule
    addDescriptionButton.addEventListener('click', function() {
        addDescriptionField(ruleDiv, 'Description');
    });

    ruleDiv.appendChild(newRuleLabel);
    ruleDiv.appendChild(newRuleInput);
    ruleDiv.appendChild(addDescriptionButton);
    
    container.appendChild(ruleDiv);
});

// Function to add a new choice field with a plus button for description
document.getElementById('addChoiceButton').addEventListener('click', function() {
    const container = document.getElementById('rules-choices-container');

    // Create choice label and input
    const choiceDiv = document.createElement('div');
    choiceDiv.classList.add('choice-group');

    const newChoiceLabel = document.createElement('label');
    newChoiceLabel.textContent = 'Choice:';
    newChoiceLabel.classList.add('choice-label');  // Add specific class to Choice label
    
    const newChoiceInput = document.createElement('input');
    newChoiceInput.type = 'text';
    newChoiceInput.name = 'Choice[]';
    newChoiceInput.placeholder = 'Enter choice';

    const addDescriptionButton = document.createElement('button');
    addDescriptionButton.type = 'button';
    addDescriptionButton.textContent = '+';
    addDescriptionButton.classList.add('add-description');
    
    // Add event listener to add description for this specific choice
    addDescriptionButton.addEventListener('click', function() {
        addDescriptionField(choiceDiv, 'Description');
    });

    choiceDiv.appendChild(newChoiceLabel);
    choiceDiv.appendChild(newChoiceInput);
    choiceDiv.appendChild(addDescriptionButton);
    
    container.appendChild(choiceDiv);
});

// Function to add a description field beneath a rule or choice
function addDescriptionField(parentDiv, labelText) {
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = labelText;
    descriptionLabel.classList.add('description-label');  // Add specific class to Description label

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.name = 'Description[]';
    descriptionInput.placeholder = `Enter ${labelText.toLowerCase()}`;

    // Append the description input directly to the parent div (rule/choice group)
    parentDiv.appendChild(descriptionLabel);
    parentDiv.appendChild(descriptionInput);
}

// Function to handle form submission and display entered values
document.getElementById('submitButton').addEventListener('click', function() {
    const userStory = document.getElementById('input1').value;
    const rules = document.querySelectorAll('.rule-group');
    const choices = document.querySelectorAll('.choice-group');

    let outputHtml = `<p><strong>User Story:</strong> ${userStory}</p>`;

    // Get the rules and their descriptions
    rules.forEach((ruleGroup, index) => {
        const ruleInput = ruleGroup.querySelector('input[name="Rule[]"]');
        outputHtml += `<p><strong>Rule ${index + 1}:</strong> ${ruleInput.value}</p>`;

        const descriptionInput = ruleGroup.querySelector('input[name="Description[]"]');
        if (descriptionInput) {
            outputHtml += `<p>&nbsp;&nbsp;<strong>Description:</strong> ${descriptionInput.value}</p>`;
        }
    });

    // Get the choices and their descriptions
    choices.forEach((choiceGroup, index) => {
        const choiceInput = choiceGroup.querySelector('input[name="Choice[]"]');
        outputHtml += `<p><strong>Choice ${index + 1}:</strong> ${choiceInput.value}</p>`;

        const descriptionInput = choiceGroup.querySelector('input[name="Description[]"]');
        if (descriptionInput) {
            outputHtml += `<p>&nbsp;&nbsp;<strong>Description:</strong> ${descriptionInput.value}</p>`;
        }
    });

    // Display the output HTML in the output div
    document.getElementById('output').innerHTML = outputHtml;

    // After displaying the output, add the Copy to Clipboard button under the output
    addCopyButton();
});

// Function to add the "Copy to Clipboard" button after the output
function addCopyButton() {
    let copyButton = document.getElementById('copyButton');

    // Check if the button already exists; if not, create it
    if (!copyButton) {
        copyButton = document.createElement('button');
        copyButton.id = 'copyButton';
        copyButton.textContent = 'Copy to Clipboard';
        copyButton.classList.add('copy-button');

        // Append the button directly under the output
        const outputDiv = document.getElementById('output');
        outputDiv.parentNode.insertBefore(copyButton, outputDiv.nextSibling);

        // Add event listener to copy output to clipboard when button is clicked
        copyButton.addEventListener('click', function() {
            // Create a temporary textarea to copy the HTML as plain text
            const tempTextarea = document.createElement('textarea');
            tempTextarea.style.position = 'fixed'; // avoid scrolling to bottom
            tempTextarea.style.opacity = '0';
            tempTextarea.value = document.getElementById('output').innerText; // Get text (without HTML tags)
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextarea);
            alert('Copied to clipboard!');
        });
    }
}
