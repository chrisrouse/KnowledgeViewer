import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getKnowledgeArticle from '@salesforce/apex/KnowledgeController.getKnowledgeArticle';

export default class KnowledgeComponent extends LightningElement {
    @api recordId;
    @api urlName;

    strTitle;
    strSummary;
    strContent;

    connectedCallback() {
        // If no recordId or urlName is passed, it will use the prefilled default text values
        if (this.recordId || this.urlName) {
            this.fetchKnowledgeArticle();
        } else {
            this.injectContent(); // Prefill with {!recordId} and {!recordURL} as text
        }
    }

    fetchKnowledgeArticle() {
        getKnowledgeArticle({ recordId: this.recordId, urlName: this.urlName })
            .then(data => {
                if (data) {
                    this.setFields(data);
                } else {
                    this.handleError(new Error('No data found for the specified record or URL.'));
                }
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    setFields(data) {
        this.strTitle = data.Title;
        this.strSummary = data.Summary;
        this.strContent = data.Article_Details__c;

        this.injectContent();
    }

    injectContent() {
        const contentOutput = this.template.querySelector('.content-output');
        if (contentOutput) {
            contentOutput.innerHTML = this.strContent || ''; 
        }
    }

    handleError(error) {
        console.error('Error:', error);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading article',
                message: error.message || 'There was a problem loading the article.',
                variant: 'error',
            })
        );
    }
}