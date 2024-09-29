/**
 * This class contains unit tests for validating the behavior of Apex classes
 * and triggers.
 *
 * Unit tests are class methods that verify whether a particular piece
 * of code is working properly. Unit test methods take no arguments,
 * commit no data to the database, and are flagged with the testMethod
 * keyword in the method definition.
 *
 * All test methods in an org are executed whenever Apex code is deployed
 * to a production org to confirm correctness, ensure code
 * coverage, and prevent regressions. All Apex classes are
 * required to have at least 75% code coverage in order to be deployed
 * to a production org. In addition, all triggers must have some code coverage.
 * 
 * The @isTest class annotation indicates this class only contains test
 * methods. Classes defined with the @isTest annotation do not count against
 * the org size limit for all Apex scripts.
 *
 * See the Apex Language Reference for more information about Testing and Code Coverage.
 */
@IsTest
public class KnowledgeArticleControllerTest {

    // Create test data for Knowledge Article
    @TestSetup
    static void setup() {
        Knowledge__kav article = new Knowledge__kav(
            Title = 'Test Article',
            UrlName = 'test-article',
            Summary = 'This is a test summary',
            Article_Details__c = 'Test content for the article'
        );
        insert article;
    }

    // Test method to validate fetching the article by urlName
    @IsTest
    static void testFetchArticleByUrlName() {
        // Get the test article
        Knowledge__kav article = [SELECT Id, Title, UrlName FROM Knowledge__kav WHERE UrlName = 'test-article' LIMIT 1];

        // Call the method and verify results
        Knowledge__kav result = KnowledgeArticleController.fetchArticleByUrlName('test-article');
        
        // Verify the fetched article matches the expected values
        System.assertNotEquals(null, result, 'Expected a valid article result');
        System.assertEquals(article.Id, result.Id, 'Expected the fetched article to match the inserted article');
        System.assertEquals('Test Article', result.Title, 'Expected Title to match');
        System.assertEquals('test-article', result.UrlName, 'Expected UrlName to match');
    }

    // Test for handling non-existing articles
    @IsTest
    static void testFetchNonExistentArticle() {
        // Call the method with a non-existent urlName
        Knowledge__kav result = KnowledgeArticleController.fetchArticleByUrlName('non-existent-url');
        
        // Verify no article is returned
        System.assertEquals(null, result, 'Expected no article for non-existent urlName');
    }
}