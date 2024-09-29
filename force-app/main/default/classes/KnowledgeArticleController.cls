public with sharing class KnowledgeArticleController {
    @AuraEnabled(cacheable=true)
    public static Knowledge__kav fetchArticleByUrlName(String urlName) {
        return [
            SELECT Title, Summary, Article_Details__c
            FROM Knowledge__kav
            WHERE UrlName = :urlName
            LIMIT 1
        ];
    }
}