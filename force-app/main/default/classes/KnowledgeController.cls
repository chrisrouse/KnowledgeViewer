public with sharing class KnowledgeController {
    @AuraEnabled(cacheable=true)
    public static Knowledge__kav getKnowledgeArticle(Id recordId, String urlName) {
        // Query the Knowledge Article using either recordId or urlName
        Knowledge__kav article;

        if (recordId != null) {
            article = [SELECT Id, Title, Summary, UrlName, Article_Details__c FROM Knowledge__kav WHERE Id = :recordId LIMIT 1];
        } else if (urlName != null) {
            article = [SELECT Id, Title, Summary, UrlName, Article_Details__c FROM Knowledge__kav WHERE UrlName = :urlName LIMIT 1];
        }
        
        return article;
    }
}