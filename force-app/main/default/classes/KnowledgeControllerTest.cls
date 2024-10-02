@isTest
public class KnowledgeControllerTest {

    @isTest
    static void testGetKnowledgeArticleByRecordId() {
        // Create a Knowledge__kav record
        Knowledge__kav article = new Knowledge__kav(
            Title = 'Test Article',
            Summary = 'This is a test article summary',
            UrlName = 'test-article-url'
        );
        insert article;

        Test.startTest();
        // Call the KnowledgeController method
        Knowledge__kav result = KnowledgeController.getKnowledgeArticle(article.Id, null);
        Test.stopTest();

        // Verify the results
        System.assertNotEquals(null, result, 'The result should not be null.');
        System.assertEquals(article.Id, result.Id, 'The result Id should match the created article Id.');
    }

    @isTest
    static void testGetKnowledgeArticleByUrlName() {
        // Create a Knowledge__kav record
        Knowledge__kav article = new Knowledge__kav(
            Title = 'Test Article',
            Summary = 'This is a test article summary',
            UrlName = 'test-article-url'
        );
        insert article;

        Test.startTest();
        // Call the KnowledgeController method
        Knowledge__kav result = KnowledgeController.getKnowledgeArticle(null, article.UrlName);
        Test.stopTest();

        // Verify the results
        System.assertNotEquals(null, result, 'The result should not be null.');
        System.assertEquals(article.UrlName, result.UrlName, 'The result UrlName should match the created article UrlName.');
    }

    @isTest
    static void testGetKnowledgeArticleNoParameters() {
        Test.startTest();
        // Call the KnowledgeController method with no parameters
        Knowledge__kav result = KnowledgeController.getKnowledgeArticle(null, null);
        Test.stopTest();

        // Verify the result should be null since no valid parameters were passed
        System.assertEquals(null, result, 'The result should be null when no parameters are passed.');
    }
}