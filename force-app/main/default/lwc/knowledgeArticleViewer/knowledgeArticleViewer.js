import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getKnowledgeArticle from '@salesforce/apex/KnowledgeController.getKnowledgeArticle';

export default class KnowledgeComponent extends LightningElement {
    @api recordId;
    @api urlName;

    @api
    get articleRecordId() {
        console.log('Getting articleRecordId:', this.recordId);
        return this.recordId;
    }

    strTitle;
    strSummary;
    strContent;

    connectedCallback() {
        console.log('Connected callback - recordId:', this.recordId);

        // Fetch the article data
        if (this.recordId || this.urlName) {
            this.fetchKnowledgeArticle();
        } else {
            this.injectContent();
        }
    }

    fetchKnowledgeArticle() {
        console.log('Fetching article with recordId:', this.recordId);

        getKnowledgeArticle({ recordId: this.recordId, urlName: this.urlName })
            .then(data => {
                console.log('Article data received:', data?.Id);

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