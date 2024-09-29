import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

export default class KnowledgeComponent extends LightningElement {
    @api recordId;  // Declare recordId as an @api property
    @api urlName;   // Declare urlName as an @api property (if needed for future use)
    
    strTitle;
    strSummary;
    strContent;

    // Use getRecord to fetch article by recordId
    @wire(getRecord, {
        recordId: '$recordId',
        fields: [
            'Knowledge__kav.Title',
            'Knowledge__kav.Summary',
            'Knowledge__kav.Article_Details__c'
        ]
    })
    wiredRecord({ error, data }) {
        if (data) {
            this.setFields(data);
        } else if (error) {
            this.handleError(error);
        }
    }

    // Set the fields for the component
    setFields(data) {
        this.strTitle = getFieldValue(data, 'Knowledge__kav.Title');
        this.strSummary = getFieldValue(data, 'Knowledge__kav.Summary');
        this.strContent = getFieldValue(data, 'Knowledge__kav.Article_Details__c');
        this.injectContent();
    }

    // Inject content into the DOM
    injectContent() {
        const contentOutput = this.template.querySelector('.content-output');
        if (contentOutput && this.strContent) {
            contentOutput.innerHTML = this.strContent;
        }
    }

    // Ensure content is injected after rendering
    renderedCallback() {
        this.injectContent();
    }

    // Handle errors
    handleError(error) {
        console.error('Error:', error);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading record',
                message: 'There was a problem loading the article.',
                variant: 'error',
            })
        );
    }
}