/* TODO: 
 * - Manage all type of inputs
 * - Reset creation questions form when change number of questions input
 * - Reset the generate form when generate a new one
 * - Create a button to copy the HTML code of the generated form
 * - Beautify code
 */ 

/**
 * This function generates new lines to create the differents question wanted
 * @param {Int} numQuest Number of questions wanted
 */
function onChangeNumberQuestion(numQuest) {
    // Get the form element
    let form = document.getElementById('generateForm');
    for (let i = 1; i < parseInt(numQuest) + 1; i++) {
        // Create a unique name to the new question
        let nameSelect = 'selectionType' + i.toString();
        let nameInput = 'nameQuest' + i.toString();

        // HTML content of the select and the input to create the question
        let selectTypeString = '<label for="' + nameSelect + '" class="mr4">Question '+ i +'</label>' +
                               '<select class="mr4" name="' + nameSelect + '" id="' + nameSelect + '"' + 
                                       'onchange="onChangeSelectionType(this)">' +
                                   '<option value="number">Number</option>' +
                                   '<option value="text">Text</option>' +
                                   '<option value="select">Selection</option>' +
                               '</select>' +
                               '<input type="text" name="' + nameInput + '" id="' + nameInput + '"' +
                                      'placeholder="Your Question"/>';

        let divContent = document.createElement('div');
        divContent.className = 'mb16';
        divContent.innerHTML = selectTypeString;

        // Add the new question into the generation form
        let newSelect = form.appendChild(divContent);
    }
}

/**
 * This function generates textarea for questions which want a selection answer
 * @param {Element} select Tag select which contains the type of answer wanted
 */
function onChangeSelectionType(select) {
    if (select.value === 'select') {
        let divParentSelect = select.parentNode;
        // Get the number of the selection type to create the new name of the textarea
        let numSelect = select.id.replace('selectionType', '');

        // Create the new textarea
        let inputSelections = document.createElement('textarea');

        // Set attributes of the textarea
        let nameTextArea = 'multipleSelection' + numSelect;
        inputSelections.setAttribute('name', nameTextArea);
        inputSelections.setAttribute('rows', 5);
        inputSelections.setAttribute('cols', 50);
        inputSelections.setAttribute('placeholder', 'Separate your differents selections by \',\'"');
        inputSelections.id = nameTextArea;
        inputSelections.className = 'mr4';

        /* Insert the textarea after the select tag 
         *(https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib/4793630)
         */
        divParentSelect.insertBefore(inputSelections, select.nextSibling);
    }
}

/**
 * This function generates the final form
 */
function generateNewForm() {
    // Create the new form element
    let tagGenerateForm = document.createElement('form');

    // Get the name of the form and put it in the new form
    let formName = document.getElementById('formName').value;
    let formNameHtml = '<h1>' + formName + '</h1>';
    tagGenerateForm.innerHTML = formNameHtml;

    let numQuestions = parseInt(document.getElementById('numberQuestion').value) + 1;
    for (i = 1; i < numQuestions; i++) {
        // Create new div which contain one question
        let divQuestion = document.createElement('div');
        
        // Get all informations of the questions
        let nameSelect = 'selectionType' + i.toString();
        let nameInput = 'nameQuest' + i.toString();
        let typeSelect = document.getElementById(nameSelect).value;
        let nameQuestion = document.getElementById(nameInput).value;

        let formQuestionsHtml = '<label>' + nameQuestion + '</label>';
        let inputHtml = '';
        if (typeSelect === 'select') {
            let nameMultipleSelect = 'multipleSelection' + i;
            let multipleSelections = document.getElementById(nameMultipleSelect).value;
            // Split to create array which contains every options of the select tag
            let splitSelections = multipleSelections.split(',');
            let options = ''
            splitSelections.forEach(function (element) {
                options += '<option>' + element + '</option>';
            });
            inputHtml = '<select>' + options + '</select>';
        } else {
            inputHtml = '<input type="' + typeSelect + '"/>';
        }
        formQuestionsHtml += inputHtml;
        divQuestion.innerHTML = formQuestionsHtml;
        // Add the input / select created into the furture generated form
        tagGenerateForm.appendChild(divQuestion);
    }
    // Append the generated form into the body of the document to display it
    document.body.appendChild(tagGenerateForm);
}
