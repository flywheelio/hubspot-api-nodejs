export * from './BatchInputPropertyCreate';
export * from './BatchInputPropertyName';
export * from './BatchReadInputPropertyName';
export * from './BatchResponseProperty';
export * from './CollectionResponseProperty';
export * from './CollectionResponsePropertyGroup';
export * from './ErrorCategory';
export * from './ErrorDetail';
export * from './ModelError';
export * from './NextPage';
export * from './Option';
export * from './OptionInput';
export * from './Paging';
export * from './Property';
export * from './PropertyCreate';
export * from './PropertyGroup';
export * from './PropertyGroupCreate';
export * from './PropertyGroupUpdate';
export * from './PropertyModificationMetadata';
export * from './PropertyName';
export * from './PropertyUpdate';
export * from './StandardError';

import { BatchInputPropertyCreate } from './BatchInputPropertyCreate';
import { BatchInputPropertyName } from './BatchInputPropertyName';
import { BatchReadInputPropertyName } from './BatchReadInputPropertyName';
import { BatchResponseProperty, BatchResponsePropertyStatusEnum          } from './BatchResponseProperty';
import { CollectionResponseProperty } from './CollectionResponseProperty';
import { CollectionResponsePropertyGroup } from './CollectionResponsePropertyGroup';
import { ErrorCategory, ErrorCategoryHttpStatusEnum    } from './ErrorCategory';
import { ErrorDetail } from './ErrorDetail';
import { ModelError } from './ModelError';
import { NextPage } from './NextPage';
import { Option } from './Option';
import { OptionInput } from './OptionInput';
import { Paging } from './Paging';
import { Property } from './Property';
import { PropertyCreate  , PropertyCreateTypeEnum  , PropertyCreateFieldTypeEnum          } from './PropertyCreate';
import { PropertyGroup } from './PropertyGroup';
import { PropertyGroupCreate } from './PropertyGroupCreate';
import { PropertyGroupUpdate } from './PropertyGroupUpdate';
import { PropertyModificationMetadata } from './PropertyModificationMetadata';
import { PropertyName } from './PropertyName';
import { PropertyUpdate , PropertyUpdateTypeEnum  , PropertyUpdateFieldTypeEnum         } from './PropertyUpdate';
import { StandardError } from './StandardError';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

const supportedMediaTypes: { [mediaType: string]: number } = {
  "application/json": Infinity,
  "application/octet-stream": 0,
  "application/x-www-form-urlencoded": 0
}


let enumsMap: Set<string> = new Set<string>([
    "BatchResponsePropertyStatusEnum",
    "ErrorCategoryHttpStatusEnum",
    "PropertyCreateTypeEnum",
    "PropertyCreateFieldTypeEnum",
    "PropertyUpdateTypeEnum",
    "PropertyUpdateFieldTypeEnum",
]);

let typeMap: {[index: string]: any} = {
    "BatchInputPropertyCreate": BatchInputPropertyCreate,
    "BatchInputPropertyName": BatchInputPropertyName,
    "BatchReadInputPropertyName": BatchReadInputPropertyName,
    "BatchResponseProperty": BatchResponseProperty,
    "CollectionResponseProperty": CollectionResponseProperty,
    "CollectionResponsePropertyGroup": CollectionResponsePropertyGroup,
    "ErrorCategory": ErrorCategory,
    "ErrorDetail": ErrorDetail,
    "ModelError": ModelError,
    "NextPage": NextPage,
    "Option": Option,
    "OptionInput": OptionInput,
    "Paging": Paging,
    "Property": Property,
    "PropertyCreate": PropertyCreate,
    "PropertyGroup": PropertyGroup,
    "PropertyGroupCreate": PropertyGroupCreate,
    "PropertyGroupUpdate": PropertyGroupUpdate,
    "PropertyModificationMetadata": PropertyModificationMetadata,
    "PropertyName": PropertyName,
    "PropertyUpdate": PropertyUpdate,
    "StandardError": StandardError,
}

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap.has(expectedType)) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string, format: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType, format));
            }
            return transformedData;
        } else if (type === "Date") {
            if (format == "date") {
                let month = data.getMonth()+1
                month = month < 10 ? "0" + month.toString() : month.toString()
                let day = data.getDate();
                day = day < 10 ? "0" + day.toString() : day.toString();

                return data.getFullYear() + "-" + month + "-" + day;
            } else {
                return data.toISOString();
            }
        } else {
            if (enumsMap.has(type)) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type, attributeType.format);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string, format: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType, format));
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap.has(type)) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                let value = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type, attributeType.format);
                if (value !== undefined) {
                    instance[attributeType.name] = value;
                }
            }
            return instance;
        }
    }


    /**
     * Normalize media type
     *
     * We currently do not handle any media types attributes, i.e. anything
     * after a semicolon. All content is assumed to be UTF-8 compatible.
     */
    public static normalizeMediaType(mediaType: string | undefined): string | undefined {
        if (mediaType === undefined) {
            return undefined;
        }
        return mediaType.split(";")[0].trim().toLowerCase();
    }

    /**
     * From a list of possible media types, choose the one we can handle best.
     *
     * The order of the given media types does not have any impact on the choice
     * made.
     */
    public static getPreferredMediaType(mediaTypes: Array<string>): string {
        /** According to OAS 3 we should default to json */
        if (!mediaTypes) {
            return "application/json";
        }

        const normalMediaTypes = mediaTypes.map(this.normalizeMediaType);
        let selectedMediaType: string | undefined = undefined;
        let selectedRank: number = -Infinity;
        for (const mediaType of normalMediaTypes) {
            if (supportedMediaTypes[mediaType!] > selectedRank) {
                selectedMediaType = mediaType;
                selectedRank = supportedMediaTypes[mediaType!];
            }
        }

        if (selectedMediaType === undefined) {
            throw new Error("None of the given media types are supported: " + mediaTypes.join(", "));
        }

        return selectedMediaType!;
    }

    /**
     * Convert data to a string according the given media type
     */
    public static stringify(data: any, mediaType: string): string {
        if (mediaType === "application/json") {
            return JSON.stringify(data);
        }

        throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.stringify.");
    }

    /**
     * Parse data from a string according to the given media type
     */
    public static parse(rawData: string, mediaType: string | undefined) {
        if (mediaType === undefined) {
            throw new Error("Cannot parse content. No Content-Type defined.");
        }

        if (mediaType === "application/json") {
            return JSON.parse(rawData);
        }

        if (mediaType === "text/html") {
            return rawData;
        }

        throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.parse.");
    }
}
