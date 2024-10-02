import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getKnowledgeArticle from '@salesforce/apex/KnowledgeController.getKnowledgeArticle';

export default class KnowledgeComponent extends LightningElement {
    @api recordId;
    @api urlName;
    @api articleWidth; // Removed default value for articleWidth

    strTitle;
    strSummary;
    strContent;

    // Lifecycle hook: Called when the component has been rendered in the DOM
    renderedCallback() {
        this.updateArticleWidth(); // Update width after the DOM is rendered
    }

    // Update the max-width of .kv-container
    updateArticleWidth() {
        const kvContainer = this.template.querySelector('.kv-container');
        if (kvContainer && this.articleWidth) {
            kvContainer.style.maxWidth = this.articleWidth; // Dynamically set the max-width
        }
    }

    connectedCallback() {
        // Fetch the article data
        if (this.recordId || this.urlName) {
            this.fetchKnowledgeArticle();
        } else {
            this.injectContent();
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