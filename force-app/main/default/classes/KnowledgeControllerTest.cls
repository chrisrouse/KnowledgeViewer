@isTest
public class KnowledgeControllerTest {

    @isTest
    static void testGetKnowledgeArticleByRecordId() {
        // Assuming Knowledge__kav data exists in your org
        Knowledge__kav existingArticle = [SELECT Id FROM Knowledge__kav LIMIT 1];

        Test.startTest();
        // Call the KnowledgeController method
        Knowledge__kav result = KnowledgeController.getKnowledgeArticle(existingArticle.Id, null);
        Test.stopTest();

        // Verify the results
        System.assertNotEquals(null, result, 'The result should not be null.');
        System.assertEquals(existingArticle.Id, result.Id, 'The result Id should match the existing article Id.');
    }

    @isTest
    static void testGetKnowledgeArticleByUrlName() {
        // Query an existing Knowledge__kav using UrlName
        Knowledge__kav existingArticle = [SELECT UrlName FROM Knowledge__kav WHERE UrlName != null LIMIT 1];

        Test.startTest();
        // Call the KnowledgeController method
        Knowledge__kav result = KnowledgeController.getKnowledgeArticle(null, existingArticle.UrlName);
        Test.stopTest();

        // Verify the results
        System.assertNotEquals(null, result, 'The result should not be null.');
        System.assertEquals(existingArticle.UrlName, result.UrlName, 'The result UrlName should match the existing article UrlName.');
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