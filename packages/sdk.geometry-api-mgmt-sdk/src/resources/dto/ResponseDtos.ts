/**
 * ShapeDiver Model Mgmt API response
 */
export interface ShapeDiverModelResponse {

    collection: ShapeDiverModelResponseCollection

    /** Model config object */
    config?: object

}

export interface ShapeDiverModelResponseCollection {

    error?: ShapeDiverModelResponseCollectionError

    href?: string

    items?: ShapeDiverModelResponseCollectionItem[]

    links?: any[]

    queries?: any[]

    template?: ShapeDiverModelResponseCollectionTemplate

    version: string

}

export interface ShapeDiverModelResponseCollectionError {

    message: string

}

export interface ShapeDiverModelResponseCollectionItem {

    href: string

    data: ShapeDiverModelResponseCollectionItemData[]

    links: ShapeDiverModelResponseCollectionItemLink[]

}

export interface ShapeDiverModelResponseCollectionTemplate {

    data: ShapeDiverModelResponseCollectionItemData[]

}

/** See ISdModel for definition of these properties */
export enum ShapeDiverModelResponseCollectionItemDataName {
    ACCESSDOMAINS = "accessdomains",
    AUTH_GROUPS = "auth_groups",
    BACKENDACCESS = "backendaccess",
    BACKLINKURL = "backlinkurl",
    CHECKURL = "checkurl",
    CREATEDATE = "createdate",
    FTYPE = "ftype",
    ID = "id",
    MAX_COMP_TIME = "max_comp_time",
    MAX_EXPORT_SIZE = "max_export_size",
    MAX_OUTPUT_SIZE = "max_output_size",
    MSG = "msg",
    NAME = "name",
    NUMVIEWS = "numviews",
    NUM_LOADED_MIN = "num_loaded_min",
    PUB = "pub",
    STAT = "stat",
    S3URL = "s3url",
    TICKET = "ticket",
    TRUST = "trust",
}

export interface ShapeDiverModelResponseCollectionItemData {

    name: ShapeDiverModelResponseCollectionItemDataName

    value: string | string[] | boolean | number

}

export enum ShapeDiverResponseCollectionItemLinkRel {

    TICKET = "ticket",

}

export interface ShapeDiverModelResponseCollectionItemLink {

    href: string

    rel: ShapeDiverResponseCollectionItemLinkRel

}

export interface ShapeDiverConfigResponse {

    config: any

}
