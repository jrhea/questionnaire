var _questions = {
 "clearInvisibleValues": true,
 "pages": [
  {
   "elements": [
    {
     "type": "html",
     "html": "<h3>Patient Health Questionnaire</h3>",
     "name": "page1_title"
    },
    {
     "type": "text",
     "isRequired": true,
     "name": "patientInfoFirstName",
     "placeHolder": "First Name",
     "title": "First Name"
    },
    {
     "type": "text",
     "isRequired": true,
     "name": "patientInfoLastName",
     "placeHolder": "Last Name",
     "startWithNewLine": false,
     "title": "Last Name"
    },
    {
     "type": "text",
     "isRequired": true,
     "name": "patientInfoSSN",
     "placeHolder": "123-45-6789",
     "title": "SSN",
     "validators": [
      {
       "type": "regex",
       "regex": "^(\\d{3}-?\\d{2}-?\\d{4}|XXX-XX-XXXX)$",
       "text": "Please enter a valid SSN"
      }
     ],
     "width": "50"
    }
   ],
   "name": "page1",
   "navigationButtonsVisibility": "show",
   "startWithNewLine": false
  },
  {
   "elements": [
    {
     "type": "html",
     "html": "<h3>Patient Health Questionnaire</h3>\n",
     "name": "page2_title",
     "startWithNewLine": false
    },
    {
     "type": "html",
     "html": "<h3>Patient Name: {patientInfoFirstName} {patientInfoLastName}</h3>",
     "name": "page2_subtitle",
     "startWithNewLine": false
    },
    {
     "type": "matrix",
     "columns": [
      {
       "value": "0",
       "text": "Not At All"
      },
      {
       "value": "1",
       "text": "Several Days"
      },
      {
       "value": "2",
       "text": "More Than Half the Days"
      },
      {
       "value": "3",
       "text": "Nearly Every Day"
      }
     ],
     "isAllRowRequired": true,
     "isRequired": true,
     "name": "question1",
     "rows": [
      {
       "value": "1",
       "text": "Little interest or pleasure in doing things"
      },
      {
       "value": "2",
       "text": "Feeling down, depressed, or hopeless"
      },
      {
       "value": "3",
       "text": "Trouble falling asleep, staying asleep, or sleeping too much"
      },
      {
       "value": "4",
       "text": "Feeling tired or having little energy"
      },
      {
       "value": "5",
       "text": "Poor appetite or overeating"
      },
      {
       "value": "6",
       "text": "Feeling bad about yourself - or that you're a failure or have let yourself or your family down"
      },
      {
       "value": "7",
       "text": "Trouble concentrating on things, such as reading the newspaper or watching television"
      },
      {
       "value": "8",
       "text": "Moving or speaking so slowly that other people could have noticed.  Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual "
      },
      {
       "value": "9",
       "text": "Thoughts that you would be better off dead or of hurting yourself in some way"
      }
     ],
     "title": "Over the past two weeks, how often have you been bothered by any of the following problems?"
    },
    {
     "type": "matrix",
     "columns": [
      {
       "value": "0",
       "text": "Not difficult at all"
      },
      {
       "value": "1",
       "text": "Somewhat difficult"
      },
      {
       "value": "2",
       "text": "Very difficult"
      },
      {
       "value": "3",
       "text": "Extremely difficult"
      }
     ],
     "isAllRowRequired": true,
     "isRequired": true,
     "name": "question2",
     "rows": [
      {
       "value": "1",
       "text": "Do your work, take care of things at home, or get along with other people?"
      }
     ],
     "title": "If you checked off any problems, how difficult have those problems made it for you to: "
    },
    {
     "type": "radiogroup",
     "choices": [
      {
       "value": "0",
       "text": "Yes"
      },
      {
       "value": "1",
       "text": "No"
      }
     ],
     "colCount": 2,
     "isRequired": true,
     "name": "question3",
     "title": "Are you currently smoking?"
    },
    {
     "type": "text",
     "inputType": "number",
     "isRequired": true,
     "name": "question4",
     "placeHolder": "Enter number of packs per day",
     "title": "How much do you smoke per day?",
     "visible": false,
     "visibleIf": "{question3}=0"
    }
   ],
   "name": "page2",
   "startWithNewLine": false
  }
 ],
 "showPageTitles": false,
 "showQuestionNumbers": "off",
 "showTitle": false
}