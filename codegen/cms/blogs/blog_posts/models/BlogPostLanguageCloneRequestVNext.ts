/**
 * Blog Post endpoints
 * Use these endpoints for interacting with Blog Posts, Blog Authors, and Blog Tags
 *
 * OpenAPI spec version: v3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
* Request body object for creating new blog post language variant.
*/
export class BlogPostLanguageCloneRequestVNext {
    /**
    * ID of blog post to clone.
    */
    'id': string;
    /**
    * Target language of new variant.
    */
    'language'?: string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string",
            "format": ""
        },
        {
            "name": "language",
            "baseName": "language",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return BlogPostLanguageCloneRequestVNext.attributeTypeMap;
    }

    public constructor() {
    }
}

