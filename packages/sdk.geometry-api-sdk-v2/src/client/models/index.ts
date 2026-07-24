/* tslint:disable */
/* eslint-disable */
/**
 * Reference to the s-type parameter asset to be used.
 * @export
 * @interface CommmonsParameterAsset
 */
export interface CommmonsParameterAsset {
    /**
     * String ID of the asset.
     * @type {string}
     * @memberof CommmonsParameterAsset
     */
    id: string;
    /**
     * 
     * @type {CommonsParameterChunk}
     * @memberof CommmonsParameterAsset
     */
    chunk?: CommonsParameterChunk;
}
/**
 * @type CommonsBasicParameter
 * Definition of a basic ShapeDiver parameter.
 * @export
 */
export type CommonsBasicParameter = boolean | number | string;

/**
 * Status of a model computation.
 * @export
 */
export const CommonsComputationStatus = {
    SUCCESS: 'success',
    TIMEOUT: 'timeout',
    CHECK_CONFIRMED: 'checkconfirmed',
    CHECK_DENIED: 'checkdenied',
    CHECK_PENDING: 'checkpending',
    MAX_COMBINED_ASSET_SIZE_EXCEEDED: 'maxcombinedassetsizeexceeded',
    MAX_DB_SIZE_PER_OUTPUT_EXCEEDED: 'maxdbsizeperoutputexceeded',
    MAX_PARTS_PER_OUTPUT_EXCEEDED: 'maxpartsperoutputexceeded',
    MAX_ASSET_PARTS_PER_OUTPUT_EXCEEDED: 'maxassetpartsperoutputexceeded',
    MAX_TRANSFORMATIONS_PER_OUTPUT_EXCEEDED: 'maxtransformationsperoutputexceeded',
    MAX_PARTS_EXCEEDED: 'maxpartsexceeded',
    MAX_ASSET_PARTS_EXCEEDED: 'maxassetpartsexceeded',
    RECOVERABLE_ERROR: 'recoverableerror',
    UNRECOVERABLE_ERROR: 'unrecoverableerror',
    NO_OUTPUT_DATA_FOR_DEFAULT_PARAMETER_VALUES: 'nooutputdatafordefaultparametervalues',
    MODEL_WITHOUT_GEOMETRY_OUTPUT: 'modelwithoutgeometryoutput',
    UNKNOWN: 'unknown'
} as const;
export type CommonsComputationStatus = typeof CommonsComputationStatus[keyof typeof CommonsComputationStatus];

/**
 * Group of a parameter, export or output.
 * @export
 * @interface CommonsGroup
 */
export interface CommonsGroup {
    /**
     * 
     * @type {string}
     * @memberof CommonsGroup
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof CommonsGroup
     */
    name: string;
}
/**
 * Reasons why the model may be blocked.
 * @export
 * @interface CommonsModelBlockingReasons
 */
export interface CommonsModelBlockingReasons {
    /**
     * The model owner's credit limit has been exceeded.
     * @type {boolean}
     * @memberof CommonsModelBlockingReasons
     */
    creditLimit?: boolean;
    /**
     * The model has been blocked explicitly by its owner.
     * @type {boolean}
     * @memberof CommonsModelBlockingReasons
     */
    owner?: boolean;
    /**
     * The model owner has been restricted from accessing this backend system
     * @type {boolean}
     * @memberof CommonsModelBlockingReasons
     */
    backendPermission?: boolean;
}

/**
 * Status of a model.
 * @export
 */
export const CommonsModelStatus = {
    UNKNOWN: 'unknown',
    NOT_UPLOADED: 'not_uploaded',
    UPLOADED: 'uploaded',
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    DENIED: 'denied',
    DELETED: 'deleted'
} as const;
export type CommonsModelStatus = typeof CommonsModelStatus[keyof typeof CommonsModelStatus];

/**
 * Describing which chunk of the s-type asset to use. When not specified, the chunk of an asset gets chosen based on parameter ID and name.
 * @export
 * @interface CommonsParameterChunk
 */
export interface CommonsParameterChunk {
    /**
     * ID of the chunk to be used.
     * @type {string}
     * @memberof CommonsParameterChunk
     */
    id?: string;
    /**
     * Name attribute of the chunk to be used.
     * @type {string}
     * @memberof CommonsParameterChunk
     */
    name?: string;
}
/**
 * Definition of the value to use for s-type parameters.
 * @export
 * @interface CommonsStypeParameter
 */
export interface CommonsStypeParameter {
    /**
     * Optional embedded value. If this is set the asset is ignored.
     * @type {string}
     * @memberof CommonsStypeParameter
     */
    value?: string;
    /**
     * 
     * @type {CommmonsParameterAsset}
     * @memberof CommonsStypeParameter
     */
    asset?: CommmonsParameterAsset;
}
/**
 * Authorization ticket.
 * @export
 * @interface CommonsTicket
 */
export interface CommonsTicket {
    /**
     * List of domains (origins) this ticket should be limited to; may be empty.
     * @type {Array<string>}
     * @memberof CommonsTicket
     */
    accessdomains?: Array<string>;
    /**
     * Should this ticket provide access to model authoring (allows to change configuration)?
     * @type {boolean}
     * @memberof CommonsTicket
     */
    author?: boolean;
    /**
     * Should this ticket allow public access (ignore the model's `accessdomains` property)?
     * @type {boolean}
     * @memberof CommonsTicket
     */
    pub: boolean;
    /**
     * The timestamp until which the ticket should be valid.
     * @type {string}
     * @memberof CommonsTicket
     */
    until: string;
    /**
     * Does this ticket identify the model via its secondary ID (model property `id2`)?
     * @type {boolean}
     * @memberof CommonsTicket
     */
    use_id2?: boolean;
}

/**
 * Type of a ticket.
 * @export
 */
export const CommonsTicketType = {
    BACKEND: 'backend',
    NONE: ''
} as const;
export type CommonsTicketType = typeof CommonsTicketType[keyof typeof CommonsTicketType];

/**
 * A substitution for the JSON-value `null`.
 * @export
 * @interface NullObj
 */
export interface NullObj {
    /**
     * The value of this property does not matter.
     * @type {boolean}
     * @memberof NullObj
     */
    nullObj: boolean;
}

/**
 * Filter by model computation statistics status.
 * @export
 */
export const QueryComputationStatisticsStatus = {
    SUCCESS: 'success',
    TIMEOUT: 'timeout',
    OTHER: 'other',
    ALL: '*'
} as const;
export type QueryComputationStatisticsStatus = typeof QueryComputationStatisticsStatus[keyof typeof QueryComputationStatisticsStatus];


/**
 * Filter by model computation status.
 * @export
 */
export const QueryComputationStatus = {
    SUCCESS: 'success',
    TIMEOUT: 'timeout',
    CHECK_CONFIRMED: 'checkconfirmed',
    CHECK_DENIED: 'checkdenied',
    CHECK_PENDING: 'checkpending',
    MAX_COMBINED_ASSET_SIZE_EXCEEDED: 'maxcombinedassetsizeexceeded',
    MAX_DB_SIZE_PER_OUTPUT_EXCEEDED: 'maxdbsizeperoutputexceeded',
    MAX_PARTS_PER_OUTPUT_EXCEEDED: 'maxpartsperoutputexceeded',
    MAX_ASSET_PARTS_PER_OUTPUT_EXCEEDED: 'maxassetpartsperoutputexceeded',
    MAX_TRANSFORMATIONS_PER_OUTPUT_EXCEEDED: 'maxtransformationsperoutputexceeded',
    MAX_PARTS_EXCEEDED: 'maxpartsexceeded',
    MAX_ASSET_PARTS_EXCEEDED: 'maxassetpartsexceeded',
    RECOVERABLE_ERROR: 'recoverableerror',
    UNRECOVERABLE_ERROR: 'unrecoverableerror',
    NO_OUTPUT_DATA_FOR_DEFAULT_PARAMETER_VALUES: 'nooutputdatafordefaultparametervalues',
    MODEL_WITHOUT_GEOMETRY_OUTPUT: 'modelwithoutgeometryoutput',
    UNKNOWN: 'unknown'
} as const;
export type QueryComputationStatus = typeof QueryComputationStatus[keyof typeof QueryComputationStatus];


/**
 * Filter by computation type.
 * @export
 */
export const QueryComputationType = {
    COMPUTATION: 'computation',
    EXPORT: 'export',
    LOAD: 'load',
    ALL: '*'
} as const;
export type QueryComputationType = typeof QueryComputationType[keyof typeof QueryComputationType];


/**
 * Conversion type of a glTF upoad:
 * * `none`: no further processing of the file.
 * * `usdz`: converts the glTF into the USDZ format.
 * * `scene`: creates a temporary AR scene that holds both, a glTF and a USDZ file.
 * @export
 */
export const QueryGltfConversion = {
    NONE: 'none',
    SCENE: 'scene',
    USDZ: 'usdz'
} as const;
export type QueryGltfConversion = typeof QueryGltfConversion[keyof typeof QueryGltfConversion];


/**
 * Filter by model status.
 * @export
 */
export const QueryModelStatus = {
    UNKNOWN: 'unknown',
    NOT_UPLOADED: 'not_uploaded',
    UPLOADED: 'uploaded',
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    DENIED: 'denied',
    DELETED: 'deleted'
} as const;
export type QueryModelStatus = typeof QueryModelStatus[keyof typeof QueryModelStatus];


/**
 * Specifies the order of the results.
 * @export
 */
export const QueryOrder = {
    ASC: 'asc',
    DESC: 'desc'
} as const;
export type QueryOrder = typeof QueryOrder[keyof typeof QueryOrder];

/**
 * @type ReqAnyCreditMetricId
 * Either a single or multiple IDs. Multiple IDs are aggregated and result in a single credit metrics object.
 * @export
 */
export type ReqAnyCreditMetricId = ReqModelCreditMetricId | ReqModelOrganizationCreditMetricId | ReqModelUserCreditMetricId | ReqOrganizationCreditMetricId | ReqSystemCreditMetricId | ReqUserCreditMetricId;
/**
 * Body of an authorization group request.
 * @export
 * @interface ReqAuthorizationGroup
 */
export interface ReqAuthorizationGroup {
    /**
     * The model IDs that should form the new authorization group.
     * @type {Array<string>}
     * @memberof ReqAuthorizationGroup
     */
    models?: Array<string>;
    /**
     * The user IDs that should form the new authorization group.
     * @type {Array<string>}
     * @memberof ReqAuthorizationGroup
     */
    users?: Array<string>;
    /**
     * The organization IDs that should form the new authorization group.
     * @type {Array<string>}
     * @memberof ReqAuthorizationGroup
     */
    organizations?: Array<string>;
}
/**
 * @type ReqBasicParameter
 * Definition of a basic ShapeDiver parameter.
 * @export
 */
export type ReqBasicParameter = boolean | number | string;
/**
 * Body of an export or output cache request. A directory of export-/output-IDs and version-IDs.
 * @export
 * @interface ReqCache
 */
export interface ReqCache {
    [key: string]: string;
}
/**
 * Body of a configure request.
 * 
 * A dictionary of string keys and values of any type.
 * @export
 * @interface ReqConfigure
 */
export interface ReqConfigure {
    [key: string]: any;
}
/**
 * Parameters of a credit metrics request. When IDs or timestamps are requested, the resulting response-item represents an aggregation of the requested data.
 * @export
 * @interface ReqCreditMetric
 */
export interface ReqCreditMetric {
    /**
     * 
     * @type {ReqAnyCreditMetricId}
     * @memberof ReqCreditMetric
     */
    id: ReqAnyCreditMetricId;
    /**
     * Either a single extended date or an array of extended dates.
     * Multiple timestamps are aggregated and result in a single credit metrics object.
     * @type {Array<string>}
     * @memberof ReqCreditMetric
     */
    timestamp?: Array<string>;
    /**
     * Allows to define the beginning of a time range, instead of specifying individual timestamps.
     * @type {string}
     * @memberof ReqCreditMetric
     */
    timestamp_from?: string;
    /**
     * Allows to define the ending of a time range, instead of specifying individual timestamps.
     * @type {string}
     * @memberof ReqCreditMetric
     */
    timestamp_to?: string;
}
/**
 * Body of a credit metrics request. Every request-item results in exactly one response-item, whereby the order of response-items corresponds to the order of the request-items.
 * @export
 * @interface ReqCreditMetrics
 */
export interface ReqCreditMetrics {
    /**
     * 
     * @type {Array<ReqCreditMetric>}
     * @memberof ReqCreditMetrics
     */
    parameters: Array<ReqCreditMetric>;
}
/**
 * A directory of parameter keys and values.
 * 
 * Supported parameter keys are as follows, whereby the parameter resolution is done in the
 * same order as the keys are listed:
 * * `id`
 * * `name`
 * * `displayname`
 * 
 * Supported parameter values are:
 * * Basic parameter (`ReqBasicParameter`)
 * * S-type parameter (`ReqStypeParameter`)
 * @export
 * @interface ReqCustomization
 */
export interface ReqCustomization {
    [key: string]: ReqParameterValue;
}
/**
 * @type ReqCustomizationOrCache
 * Either a cache or a customization request.
 * @export
 */
export type ReqCustomizationOrCache = ReqCache | ReqCustomization;
/**
 * @type ReqCustomizationOrExport
 * 
 * @export
 */
export type ReqCustomizationOrExport = ReqCustomization | ReqExport;
/**
 * Body of an export request.
 * @export
 * @interface ReqExport
 */
export interface ReqExport {
    /**
     * 
     * @type {ReqCustomization}
     * @memberof ReqExport
     */
    parameters: ReqCustomization;
    /**
     * 
     * @type {Array<string>}
     * @memberof ReqExport
     */
    exports: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ReqExport
     */
    outputs?: Array<string>;
    /**
     * Maximum amount of milliseconds to wait for completion of export request before responding.
     * @type {number}
     * @memberof ReqExport
     */
    max_wait_time?: number;
}
/**
 * Data for a single export definition.
 * @export
 * @interface ReqExportDefinition
 */
export interface ReqExportDefinition {
    /**
     * Parameter name to display instead of _name_.
     * @type {string}
     * @memberof ReqExportDefinition
     */
    displayname?: string;
    /**
     * 
     * @type {ReqExportDefinitionGroup}
     * @memberof ReqExportDefinition
     */
    group?: ReqExportDefinitionGroup;
    /**
     * Controls whether the export should be hidden in the UI.
     * @type {boolean}
     * @memberof ReqExportDefinition
     */
    hidden?: boolean;
    /**
     * Ordering of the export in client applications.
     * @type {number}
     * @memberof ReqExportDefinition
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     * @type {string}
     * @memberof ReqExportDefinition
     */
    tooltip?: string;
}
/**
 * @type ReqExportDefinitionGroup
 * Set to `null` or `NullObj` to remove the export from the currently assigned group.
 * @export
 */
export type ReqExportDefinitionGroup = NullObj | ReqGroup;
/**
 * Definition of a exports. A directory of export-IDs and export-definitions.
 * @export
 * @interface ReqExportDefinitions
 */
export interface ReqExportDefinitions {
    [key: string]: ReqExportDefinition;
}
/**
 * @type ReqExportOrCache
 * Either a cache or an export request.
 * @export
 */
export type ReqExportOrCache = ReqCache | ReqExport;
/**
 * Data for a single file parameter.
 * @export
 * @interface ReqFileDefinition
 */
export interface ReqFileDefinition {
    /**
     * Name of the file to be uploaded.
     * 
     * If this property is set, the file upload request must include a `Content-Disposition`
     * HTTP header with the format `attachment; filename="{filename}"`. Failure to do so will
     * result in a signature mismatch. For convenience, the response will provide a
     * preformatted HTTP header value that can be used directly.
     * @type {string}
     * @memberof ReqFileDefinition
     */
    filename?: string;
    /**
     * Content-Type (MIME type) of the file to be uploaded.
     * @type {string}
     * @memberof ReqFileDefinition
     */
    format: string;
    /**
     * Size of the file to be uploaded, in bytes.
     * @type {number}
     * @memberof ReqFileDefinition
     */
    size: number;
}
/**
 * Body of a file upload request. A directory of file-parameter-IDs and upload-definitions.
 * @export
 * @interface ReqFileUpload
 */
export interface ReqFileUpload {
    [key: string]: ReqFileDefinition;
}
/**
 * Group of a parameter, export or output.
 * @export
 * @interface ReqGroup
 */
export interface ReqGroup {
    /**
     * 
     * @type {string}
     * @memberof ReqGroup
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ReqGroup
     */
    name: string;
}

/**
 * Log message level for log requests.
 * @export
 */
export const ReqLogLevel = {
    INFO: '0',
    WARN: '1',
    ERROR: '2'
} as const;
export type ReqLogLevel = typeof ReqLogLevel[keyof typeof ReqLogLevel];

/**
 * Body of a log message request.
 * @export
 * @interface ReqLogMessage
 */
export interface ReqLogMessage {
    /**
     * 
     * @type {ReqLogLevel}
     * @memberof ReqLogMessage
     */
    level: ReqLogLevel;
    /**
     * The message that should be logged.
     * @type {string}
     * @memberof ReqLogMessage
     */
    message: string;
}


/**
 * Body of a template request.
 * @export
 * @interface ReqModel
 */
export interface ReqModel {
    /**
     * List of domains (origins) this model is limited to (is ignored in case `pub` is true).
     * @type {Array<string>}
     * @memberof ReqModel
     */
    accessdomains?: Array<string>;
    /**
     * List of allowed Grasshopper libraries.
     * @type {Array<string>}
     * @memberof ReqModel
     */
    allowed_libraries?: Array<string>;
    /**
     * List of allowed auth-groups.
     * @type {Array<string>}
     * @memberof ReqModel
     */
    auth_groups?: Array<string>;
    /**
     * Should backend access to the model be allowed.
     * @type {boolean}
     * @memberof ReqModel
     */
    backendaccess?: boolean;
    /**
     * 
     * @type {ReqModelBlockingReasons}
     * @memberof ReqModel
     */
    blockingReasons?: ReqModelBlockingReasons;
    /**
     * Original name of the model's grasshopper file.
     * @type {string}
     * @memberof ReqModel
     */
    filename?: string;
    /**
     * File type of the model.
     * @type {ReqModelFileType}
     * @memberof ReqModel
     */
    ftype?: ReqModelFileType;
    /**
     * Allows to control whether the model should be warmed up immediately after loading by running a computation. This increases the likelihood of following computation requests to be faster.
     * @type {boolean}
     * @memberof ReqModel
     */
    initial_warmup?: boolean;
    /**
     * Optional second model ID.
     * @type {string}
     * @memberof ReqModel
     */
    id2?: string;
    /**
     * Maximum number of milliseconds allowed for computations of this model.
     * @type {number}
     * @memberof ReqModel
     */
    max_comp_time?: number;
    /**
     * Maximum number of bytes allowed to be exported from a model for a specific set of parameter values.
     * @type {number}
     * @memberof ReqModel
     */
    max_export_size?: number;
    /**
     * Maximum amount of minutes a loaded model may be unused before it gets unloaded.
     * 
     * Note: Models may get unloaded earlier than that.
     * @type {number}
     * @memberof ReqModel
     */
    max_idle_minutes?: number;
    /**
     * Maximum number of bytes allowed for the model's Grasshopper file size.
     * @type {number}
     * @memberof ReqModel
     */
    max_model_size?: number;
    /**
     * Maximum number of bytes allowed for an output of a model for a specific set of parameter values.
     * @type {number}
     * @memberof ReqModel
     */
    max_output_size?: number;
    /**
     * Allows to configure the maximum number of bytes allowed for a single texture.
     * @type {number}
     * @memberof ReqModel
     */
    max_texture_size?: number;
    /**
     * Maximum time a computation request may stay waiting before a further worker goes ahead regardless of whether it already has the model loaded, and regardless of `num_loaded_max`. This allows to configure a soft or a hard upper boundary for the number of loaded models.
     * @type {number}
     * @memberof ReqModel
     */
    max_wait_time?: number;
    /**
     * Name of the model.
     * @type {string}
     * @memberof ReqModel
     */
    name?: string;
    /**
     * Maximum number of workers that should have the model loaded at the same time.
     * @type {number}
     * @memberof ReqModel
     */
    num_loaded_max?: number;
    /**
     * Minimum number of workers which should have the model loaded once a session to the model gets opened.
     * @type {number}
     * @memberof ReqModel
     */
    num_loaded_min?: number;
    /**
     * Minimum number of workers that should always have the model loaded, regardless of session activity. This allows to minimise the likelihood of computation requests being slower due to model loading.
     * @type {number}
     * @memberof ReqModel
     */
    num_preloaded_min?: number;
    /**
     * Optional organization ID.
     * @type {string}
     * @memberof ReqModel
     */
    org_id?: string;
    /**
     * The Model ID of the previous version of this model.
     * This property is applicable only when creating a new model and cannot be used in conjunction with `prev_id`.
     * @type {string}
     * @memberof ReqModel
     */
    prev_id?: string;
    /**
     * If set to `true`, a new repository will be created for the model.
     * This property is applicable only when creating a new model and cannot be used in conjunction with `prev_id`.
     * @type {boolean}
     * @memberof ReqModel
     */
    with_repo?: boolean;
    /**
     * Allows public access (ignore `accessdomains`).
     * @type {boolean}
     * @memberof ReqModel
     */
    pub?: boolean;
    /**
     * Enforces iframe embedding instead of direct embedding.
     * @type {boolean}
     * @memberof ReqModel
     */
    require_iframe?: boolean;
    /**
     * Enforces token-based authentication for this model.
     * @type {boolean}
     * @memberof ReqModel
     */
    require_token?: boolean;
    /**
     * Limits the number of sessions that can be created by a specific IP address in one hour.
     * @type {number}
     * @memberof ReqModel
     */
    session_rate_limit?: number;
    /**
     * Can this model be trusted (controls whether failed computations will be retried).
     * @type {ReqTrustLevel}
     * @memberof ReqModel
     */
    trust?: ReqTrustLevel;
    /**
     * Allows the usage of the CDN for fast content distribution.
     * @type {boolean}
     * @memberof ReqModel
     */
    use_cdn?: boolean;
    /**
     * Optional user ID.
     * @type {string}
     * @memberof ReqModel
     */
    user_id?: string;
    /**
     * The webhook-url for updating the platform backend about model status changes.
     * @type {string}
     * @memberof ReqModel
     */
    webhook_url?: string;
    /**
     * The webhook-token for authentication used by the webhook-url.
     * @type {string}
     * @memberof ReqModel
     */
    webhook_token?: string;
    /**
     * Allows to control whether the model's Grasshopper file can contain scripts.
     * @type {boolean}
     * @memberof ReqModel
     */
    deny_scripts?: boolean;
}


/**
 * Reasons why the model may be blocked.
 * @export
 * @interface ReqModelBlockingReasons
 */
export interface ReqModelBlockingReasons {
    /**
     * The model owner's credit limit has been exceeded.
     * @type {boolean}
     * @memberof ReqModelBlockingReasons
     */
    creditLimit?: boolean;
    /**
     * The model has been blocked explicitly by its owner.
     * @type {boolean}
     * @memberof ReqModelBlockingReasons
     */
    owner?: boolean;
    /**
     * The model owner has been restricted from accessing this backend system
     * @type {boolean}
     * @memberof ReqModelBlockingReasons
     */
    backendPermission?: boolean;
}
/**
 * Model metrics
 * @export
 * @interface ReqModelCreditMetricId
 */
export interface ReqModelCreditMetricId {
    /**
     * 
     * @type {Array<string>}
     * @memberof ReqModelCreditMetricId
     */
    modelIds: Array<string>;
}

/**
 * Supported Grasshopper file types for models.
 * @export
 */
export const ReqModelFileType = {
    GRASSHOPPER_BINARY: 'gh',
    GRASSHOPPER_XML: 'ghx'
} as const;
export type ReqModelFileType = typeof ReqModelFileType[keyof typeof ReqModelFileType];

/**
 * Model-Organization metrics
 * @export
 * @interface ReqModelOrganizationCreditMetricId
 */
export interface ReqModelOrganizationCreditMetricId {
    /**
     * 
     * @type {Array<string>}
     * @memberof ReqModelOrganizationCreditMetricId
     */
    modelIds: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ReqModelOrganizationCreditMetricId
     */
    orgIds: Array<string>;
}
/**
 * Description of a Model-State.
 * @export
 * @interface ReqModelState
 */
export interface ReqModelState {
    /**
     * 
     * @type {ReqCustomization}
     * @memberof ReqModelState
     */
    parameters: ReqCustomization;
    /**
     * Optional untyped data that can be used to store additional information.
     * @type {{ [key: string]: any; }}
     * @memberof ReqModelState
     */
    data?: { [key: string]: any; };
    /**
     * Details of the Model-State image file. If provided, the response will include a URL for uploading the file.
     * @type {ReqFileDefinition}
     * @memberof ReqModelState
     */
    image?: ReqFileDefinition;
    /**
     * The ID of an existing AR scene associated with this model. If provided, the scene's glTF and USDZ data will be duplicated into the newly created Model-State.
     * @type {string}
     * @memberof ReqModelState
     */
    arSceneId?: string;
}
/**
 * Model-User metrics
 * @export
 * @interface ReqModelUserCreditMetricId
 */
export interface ReqModelUserCreditMetricId {
    /**
     * 
     * @type {Array<string>}
     * @memberof ReqModelUserCreditMetricId
     */
    modelIds: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ReqModelUserCreditMetricId
     */
    userIds: Array<string>;
}
/**
 * Organization metrics
 * @export
 * @interface ReqOrganizationCreditMetricId
 */
export interface ReqOrganizationCreditMetricId {
    /**
     * 
     * @type {Array<string>}
     * @memberof ReqOrganizationCreditMetricId
     */
    orgIds: Array<string>;
}
/**
 * Data for a single output definition.
 * @export
 * @interface ReqOutputDefinition
 */
export interface ReqOutputDefinition {
    /**
     * Parameter name to display instead of `name`.
     * @type {string}
     * @memberof ReqOutputDefinition
     */
    displayname?: string;
    /**
     * 
     * @type {ReqOutputDefinitionGroup}
     * @memberof ReqOutputDefinition
     */
    group?: ReqOutputDefinitionGroup;
    /**
     * Controls whether the output should be hidden in the UI.
     * @type {boolean}
     * @memberof ReqOutputDefinition
     */
    hidden?: boolean;
    /**
     * Ordering of the output in client applications.
     * @type {number}
     * @memberof ReqOutputDefinition
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     * @type {string}
     * @memberof ReqOutputDefinition
     */
    tooltip?: string;
    /**
     * The chunk definitions of the sdTF file that is generated by the output. If specified, all existing sdTF chunks of the output must be given. The order of the given chunk items determines the order in that the chunks will be shown in the UI.
     * @type {Array<ReqOutputDefinitionChunk>}
     * @memberof ReqOutputDefinition
     */
    chunks?: Array<ReqOutputDefinitionChunk>;
}
/**
 * Definition of a single "chunk" of data in an sdTF file that is generated by the output component.
 * @export
 * @interface ReqOutputDefinitionChunk
 */
export interface ReqOutputDefinitionChunk {
    /**
     * ID of the chunk.
     * @type {string}
     * @memberof ReqOutputDefinitionChunk
     */
    id: string;
    /**
     * Chunk name to display instead of the chunk `name`. This value can be unset by specifying an empty string.
     * @type {string}
     * @memberof ReqOutputDefinitionChunk
     */
    displayname?: string;
    /**
     * Controls whether the chunk should be hidden in the UI.
     * @type {boolean}
     * @memberof ReqOutputDefinitionChunk
     */
    hidden?: boolean;
}
/**
 * @type ReqOutputDefinitionGroup
 * Set to `null` or `NullObj` to remove the export from the currently assigned group.
 * @export
 */
export type ReqOutputDefinitionGroup = NullObj | ReqGroup;
/**
 * Definition of outputs. A directory of output-IDs and output-definitions.
 * @export
 * @interface ReqOutputDefinitions
 */
export interface ReqOutputDefinitions {
    [key: string]: ReqOutputDefinition;
}
/**
 * Data for a single parameter definition.
 * @export
 * @interface ReqParameterDefinition
 */
export interface ReqParameterDefinition {
    /**
     * Parameter name to display instead of `name`.
     * @type {string}
     * @memberof ReqParameterDefinition
     */
    displayname?: string;
    /**
     * 
     * @type {ReqParameterDefinitionGroup}
     * @memberof ReqParameterDefinition
     */
    group?: ReqParameterDefinitionGroup;
    /**
     * Controls whether the parameter should be hidden in the UI.
     * @type {boolean}
     * @memberof ReqParameterDefinition
     */
    hidden?: boolean;
    /**
     * Ordering of the parameter in client applications.
     * @type {number}
     * @memberof ReqParameterDefinition
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     * @type {string}
     * @memberof ReqParameterDefinition
     */
    tooltip?: string;
    /**
     * Holds parameter-type specific information.
     * @type {object}
     * @memberof ReqParameterDefinition
     */
    settings?: object;
}
/**
 * @type ReqParameterDefinitionGroup
 * Set to `null` or `NullObj` to remove the export from the currently assigned group.
 * @export
 */
export type ReqParameterDefinitionGroup = NullObj | ReqGroup;
/**
 * Definition of model parameters. A directory of parameter-IDs and parameter-definitions.
 * @export
 * @interface ReqParameterDefinitions
 */
export interface ReqParameterDefinitions {
    [key: string]: ReqParameterDefinition;
}
/**
 * @type ReqParameterValue
 * The value of a single model parameter.
 * @export
 */
export type ReqParameterValue = ReqBasicParameter | ReqStypeParameter;
/**
 * Data for a single sdTF parameter.
 * @export
 * @interface ReqSdtfDefinition
 */
export interface ReqSdtfDefinition {
    /**
     * Encoding of the sdTF to be uploaded.
     * @type {string}
     * @memberof ReqSdtfDefinition
     */
    content_encoding?: string;
    /**
     * Size of the sdTF to be uploaded, in bytes.
     * @type {number}
     * @memberof ReqSdtfDefinition
     */
    content_length: number;
    /**
     * Content-type of the sdTF to be uploaded.
     * @type {ReqSdtfType}
     * @memberof ReqSdtfDefinition
     */
    content_type: ReqSdtfType;
    /**
     * Namespace the asset shall be created in.
     * @type {string}
     * @memberof ReqSdtfDefinition
     */
    namespace: string;
}



/**
 * Content-Type (MIME type) of the sdTF to be uploaded.
 * @export
 */
export const ReqSdtfType = {
    MODEL_SDTF: 'model/vnd.sdtf'
} as const;
export type ReqSdtfType = typeof ReqSdtfType[keyof typeof ReqSdtfType];

/**
 * Definition of the value to use for s-type parameters.
 * @export
 * @interface ReqStypeParameter
 */
export interface ReqStypeParameter {
    /**
     * Optional embedded value. If this is set the asset is ignored.
     * @type {string}
     * @memberof ReqStypeParameter
     */
    value?: string;
    /**
     * 
     * @type {CommmonsParameterAsset}
     * @memberof ReqStypeParameter
     */
    asset?: CommmonsParameterAsset;
}
/**
 * System-wide metrics
 * @export
 * @interface ReqSystemCreditMetricId
 */
export interface ReqSystemCreditMetricId {
    /**
     * 
     * @type {boolean}
     * @memberof ReqSystemCreditMetricId
     */
    systems: boolean;
}
/**
 * Body of a ticket request.
 * @export
 * @interface ReqTicket
 */
export interface ReqTicket {
    /**
     * List of domains (origins) this ticket should be limited to; may be empty.
     * @type {Array<string>}
     * @memberof ReqTicket
     */
    accessdomains?: Array<string>;
    /**
     * Should this ticket provide access to model authoring (allows to change configuration)?
     * @type {boolean}
     * @memberof ReqTicket
     */
    author?: boolean;
    /**
     * Should this ticket allow public access (ignore the model's `accessdomains` property)?
     * @type {boolean}
     * @memberof ReqTicket
     */
    pub: boolean;
    /**
     * The timestamp until which the ticket should be valid.
     * @type {string}
     * @memberof ReqTicket
     */
    until: string;
    /**
     * Does this ticket identify the model via its secondary ID (model property `id2`)?
     * @type {boolean}
     * @memberof ReqTicket
     */
    use_id2?: boolean;
    /**
     * 
     * @type {ReqTicketType}
     * @memberof ReqTicket
     */
    type: ReqTicketType;
}



/**
 * The type of the ticket.
 * @export
 */
export const ReqTicketType = {
    BACKEND: 'backend',
    NONE: ''
} as const;
export type ReqTicketType = typeof ReqTicketType[keyof typeof ReqTicketType];


/**
 * Level of trust granted for a model.
 * @export
 */
export const ReqTrustLevel = {
    UNDEFINED: '',
    NONE: 'none',
    FULL: 'full'
} as const;
export type ReqTrustLevel = typeof ReqTrustLevel[keyof typeof ReqTrustLevel];

/**
 * User metrics
 * @export
 * @interface ReqUserCreditMetricId
 */
export interface ReqUserCreditMetricId {
    /**
     * 
     * @type {Array<string>}
     * @memberof ReqUserCreditMetricId
     */
    userIds: Array<string>;
}
/**
 * Defines the actions to be taken on the response data.
 * @export
 * @interface ResAction
 */
export interface ResAction {
    /**
     * Name of the action, e.g. customize, close, default, etc.
     * @type {string}
     * @memberof ResAction
     */
    name: string;
    /**
     * Title of the action, e.g. 'Customize model', 'Close session', etc.
     * @type {string}
     * @memberof ResAction
     */
    title: string;
    /**
     * Hyperlink to make the request to.
     * @type {string}
     * @memberof ResAction
     */
    href: string;
    /**
     * HTTP method to use.
     * @type {string}
     * @memberof ResAction
     */
    method: string;
    /**
     * Template for the request body, references into the 'templates' array of the response (e.g. 'customize-request').
     * @type {string}
     * @memberof ResAction
     */
    template?: string;
}
/**
 * Contains the model checking configuration for the Grasshopper plugins.
 * @export
 * @interface ResAllowedWorkerPlugin
 */
export interface ResAllowedWorkerPlugin {
    /**
     * ID of the Grasshopper plugin.
     * @type {string}
     * @memberof ResAllowedWorkerPlugin
     */
    id: string;
    /**
     * Name of the Grasshopper plugin.
     * @type {string}
     * @memberof ResAllowedWorkerPlugin
     */
    name: string;
    /**
     * Minimum supported version of the plugin.
     * @type {string}
     * @memberof ResAllowedWorkerPlugin
     */
    minVersion: string;
    /**
     * Maximum supported version of the plugin.
     * @type {string}
     * @memberof ResAllowedWorkerPlugin
     */
    maxVersion: string;
    /**
     * Name of the plugin author.
     * @type {string}
     * @memberof ResAllowedWorkerPlugin
     */
    authorName?: string;
    /**
     * Link to a website related to the plugin.
     * @type {string}
     * @memberof ResAllowedWorkerPlugin
     */
    description?: string;
    /**
     * Link to a website related to the plugin.
     * @type {string}
     * @memberof ResAllowedWorkerPlugin
     */
    href?: string;
    /**
     * When `true` then `GH_AssemblyInfo.AssemblyVersion` may be used instead of
     * `GH_AssemblyInfo.Version` for version checking.
     * 
     * Defaults to `false`.
     * @type {boolean}
     * @memberof ResAllowedWorkerPlugin
     */
    allowFallbackToAssemblyVersion: boolean;
    /**
     * When `true` then only the major and minor version numbers recorded in Grasshopper
     * models will be checked.
     * 
     * Defaults to `false`.
     * @type {boolean}
     * @memberof ResAllowedWorkerPlugin
     */
    checkMajorMinorVersionOnly: boolean;
    /**
     * When `false` then the installation check of the plugin will be skipped.
     * 
     * Defaults to `true`.
     * @type {boolean}
     * @memberof ResAllowedWorkerPlugin
     */
    checkIfInstalled: boolean;
    /**
     * List of previous plugin IDs supported by this plugin version. This is used for the obscure case of the plugin developer changing the plugin ID.
     * @type {Array<string>}
     * @memberof ResAllowedWorkerPlugin
     */
    previousIds: Array<string>;
    /**
     * List of plugin components that are explicitly allowed. When this property is set, only the listed components are allowed, overruling the list in `disallowedComponents`.
     * @type {Array<ResWorkerPluginComponent>}
     * @memberof ResAllowedWorkerPlugin
     */
    allowedComponents: Array<ResWorkerPluginComponent>;
    /**
     * List of plugin components which may not be used. This list might be overruled by `allowedComponents`.
     * @type {Array<ResWorkerPluginComponent>}
     * @memberof ResAllowedWorkerPlugin
     */
    disallowedComponents: Array<ResWorkerPluginComponent>;
}
/**
 * Analytics components.
 * @export
 * @interface ResAnalytics
 */
export interface ResAnalytics {
    /**
     * 
     * @type {Array<ResAnyCreditMetric>}
     * @memberof ResAnalytics
     */
    creditMetrics: Array<ResAnyCreditMetric>;
}
/**
 * @type ResAnyCreditMetric
 * The ID of any type of credit metric.
 * @export
 */
export type ResAnyCreditMetric = ResModelCreditMetric | ResModelOrganizationCreditMetric | ResModelUserCreditMetric | ResOrganizationCreditMetric | ResSystemCreditMetric | ResUserCreditMetric;
/**
 * Downloads of AR scenes.
 * @export
 * @interface ResArCreditMetric
 */
export interface ResArCreditMetric {
    /**
     * Number of AR downloads charged.
     * @type {number}
     * @memberof ResArCreditMetric
     */
    credits: number;
}
/**
 * ShapeDiver API response for asset upload requests.
 * @export
 * @interface ResAsset
 */
export interface ResAsset {
    /**
     * A directory of parameter-IDs and asset-definitions.
     * @type {{ [key: string]: ResAssetDefinition; }}
     * @memberof ResAsset
     */
    file?: { [key: string]: ResAssetDefinition; };
    /**
     * 
     * @type {Array<ResAssetDefinition>}
     * @memberof ResAsset
     */
    sdtf?: Array<ResAssetDefinition>;
    /**
     * The asset-definition of a Model-State image.
     * @type {ResAssetDefinition}
     * @memberof ResAsset
     */
    modelState?: ResAssetDefinition;
}
/**
 * Result part for the response to an asset upload request.
 * @export
 * @interface ResAssetDefinition
 */
export interface ResAssetDefinition {
    /**
     * ID of the file to be uploaded ('' in case the asset is not linked to any specific ID).
     * @type {string}
     * @memberof ResAssetDefinition
     */
    id: string;
    /**
     * href the file should be uploaded to (typically a time-limited pre-signed url).
     * @type {string}
     * @memberof ResAssetDefinition
     */
    href: string;
    /**
     * 
     * @type {ResAssetUploadHeaders}
     * @memberof ResAssetDefinition
     */
    headers: ResAssetUploadHeaders;
}
/**
 * HTTP headers to use when uploading an asset to ShapeDiver.
 * @export
 * @interface ResAssetUploadHeaders
 */
export interface ResAssetUploadHeaders {
    /**
     * The value of the Content-Disposition HTTP header.
     * @type {string}
     * @memberof ResAssetUploadHeaders
     */
    contentDisposition?: string;
    /**
     * The value of the Content-Type HTTP header.
     * @type {string}
     * @memberof ResAssetUploadHeaders
     */
    contentType: string;
}
/**
 * 
 * @export
 * @interface ResAuthorizationSettings
 */
export interface ResAuthorizationSettings {
    /**
     * 
     * @type {ResTicketAuthorization}
     * @memberof ResAuthorizationSettings
     */
    ticket?: ResTicketAuthorization;
    /**
     * 
     * @type {ResTokenAuthorization}
     * @memberof ResAuthorizationSettings
     */
    token?: ResTokenAuthorization;
}
/**
 * 
 * @export
 * @interface ResBase
 */
export interface ResBase {
    /**
     * 
     * @type {ResAsset}
     * @memberof ResBase
     */
    asset?: ResAsset;
    /**
     * 
     * @type {ResList}
     * @memberof ResBase
     */
    list?: ResList;
    /**
     * 
     * @type {ResModelStateOrData}
     * @memberof ResBase
     */
    modelState?: ResModelStateOrData;
    /**
     * 
     * @type {ResSystem}
     * @memberof ResBase
     */
    system?: ResSystem;
    /**
     * Actions the client may take.
     * @type {Array<ResAction>}
     * @memberof ResBase
     */
    actions?: Array<ResAction>;
    /**
     * Analytics information.
     * @type {ResAnalytics}
     * @memberof ResBase
     */
    analytics?: ResAnalytics;
    /**
     * The auth-group to use for ticked-based authentication.
     * @type {string}
     * @memberof ResBase
     */
    auth_group?: string;
    /**
     * Model cleanup information.
     * @type {Array<ResModelCleanupProcess>}
     * @memberof ResBase
     */
    cleanup?: Array<ResModelCleanupProcess>;
    /**
     * Decrypted ticket details.
     * @type {ResTicket}
     * @memberof ResBase
     */
    decryptedTicket?: ResTicket;
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     * @type {{ [key: string]: ResExportOrDefinition; }}
     * @memberof ResBase
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Links regarding the model file.
     * @type {ResFile}
     * @memberof ResBase
     */
    file?: ResFile;
    /**
     * glTF information.
     * @type {ResGltfUpload}
     * @memberof ResBase
     */
    gltf?: ResGltfUpload;
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResBase
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     * @type {ResModel}
     * @memberof ResBase
     */
    model?: ResModel;
    /**
     * Statistics about model computations.
     * @type {Array<ResModelComputation>}
     * @memberof ResBase
     */
    computations?: Array<ResModelComputation>;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     * @type {{ [key: string]: ResOutputOrDefinition; }}
     * @memberof ResBase
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Pagination information.
     * @type {ResPagination}
     * @memberof ResBase
     */
    pagination?: ResPagination;
    /**
     * Parameter definitions, not contained with every response. A directory of parameter-IDs and parameters.
     * @type {{ [key: string]: ResParameter; }}
     * @memberof ResBase
     */
    parameters?: { [key: string]: ResParameter; };
    /**
     * 
     * @type {ResPlugins}
     * @memberof ResBase
     */
    plugins?: ResPlugins;
    /**
     * The ID of the created session.
     * @type {string}
     * @memberof ResBase
     */
    sessionId?: string;
    /**
     * Various settings.
     * @type {ResSettings}
     * @memberof ResBase
     */
    setting?: ResSettings;
    /**
     * Statistics of a model.
     * @type {ResStatistic}
     * @memberof ResBase
     */
    statistic?: ResStatistic;
    /**
     * Request templates for actions.
     * @type {Array<ResTemplate>}
     * @memberof ResBase
     */
    templates?: Array<ResTemplate>;
    /**
     * The ticket to create a model session.
     * @type {string}
     * @memberof ResBase
     */
    ticket?: string;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResBase
     */
    version: string;
    /**
     * Viewer specific data.
     * @type {ResViewer}
     * @memberof ResBase
     */
    viewer?: ResViewer;
    /**
     * The current version of the viewer settings.
     * @type {string}
     * @memberof ResBase
     */
    viewerSettingsVersion?: string;
    /**
     * An array of warnings encountered during request processing. These warnings indicate potential issues or non-critical conditions but did not prevent the request from being successfully processed.
     * @type {Array<string>}
     * @memberof ResBase
     */
    warnings?: Array<string>;
}
/**
 * 
 * @export
 * @interface ResBaseAsset
 */
export interface ResBaseAsset {
    /**
     * 
     * @type {ResAsset}
     * @memberof ResBaseAsset
     */
    asset?: ResAsset;
}
/**
 * 
 * @export
 * @interface ResBaseCreditMetric
 */
export interface ResBaseCreditMetric {
    /**
     * Either an extended date-time or a 'merged'-specifier.
     * @type {string}
     * @memberof ResBaseCreditMetric
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     * @type {boolean}
     * @memberof ResBaseCreditMetric
     */
    isCompilationDone: boolean;
    /**
     * 
     * @type {ResArCreditMetric}
     * @memberof ResBaseCreditMetric
     */
    ar: ResArCreditMetric;
    /**
     * 
     * @type {ResLoadingCreditMetric}
     * @memberof ResBaseCreditMetric
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     * @type {ResLimitedCreditMetric}
     * @memberof ResBaseCreditMetric
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     * @type {ResDefaultCreditMetric}
     * @memberof ResBaseCreditMetric
     */
    _default: ResDefaultCreditMetric;
}
/**
 * 
 * @export
 * @interface ResBaseList
 */
export interface ResBaseList {
    /**
     * 
     * @type {ResList}
     * @memberof ResBaseList
     */
    list?: ResList;
}
/**
 * 
 * @export
 * @interface ResBaseModelState
 */
export interface ResBaseModelState {
    /**
     * 
     * @type {ResModelStateOrData}
     * @memberof ResBaseModelState
     */
    modelState?: ResModelStateOrData;
}
/**
 * 
 * @export
 * @interface ResBaseSystem
 */
export interface ResBaseSystem {
    /**
     * 
     * @type {ResSystem}
     * @memberof ResBaseSystem
     */
    system?: ResSystem;
}
/**
 * @type ResBasicParameter
 * Definition of a basic ShapeDiver parameter.
 * @export
 */
export type ResBasicParameter = boolean | number | string;
/**
 * 
 * @export
 * @interface ResCleanupExports
 */
export interface ResCleanupExports {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResCleanupExports
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResCleanupOutputs
 */
export interface ResCleanupOutputs {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResCleanupOutputs
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResCleanupTextures
 */
export interface ResCleanupTextures {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResCleanupTextures
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResCloseSession
 */
export interface ResCloseSession {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResCloseSession
     */
    version: string;
}
/**
 * Information about the components taking most computation time in the model computations log.
 * @export
 * @interface ResComputationComponent
 */
export interface ResComputationComponent {
    /**
     * Components which were computed, ordered by descending processor time.
     * @type {Array<ResComputedComponent>}
     * @memberof ResComputationComponent
     */
    computed: Array<ResComputedComponent>;
    /**
     * Components which were currently computing at the time the computation was stopped.
     * @type {Array<ResComputingComponent>}
     * @memberof ResComputationComponent
     */
    computing: Array<ResComputingComponent>;
    /**
     * Component Errors.
     * @type {Array<ResErrorComponent>}
     * @memberof ResComputationComponent
     */
    errors: Array<ResErrorComponent>;
    /**
     * Component Warnings.
     * @type {Array<ResWarningComponent>}
     * @memberof ResComputationComponent
     */
    warnings: Array<ResWarningComponent>;
}
/**
 * Information about model computations.
 * @export
 * @interface ResComputationComponents
 */
export interface ResComputationComponents {
    /**
     * 
     * @type {ResComputationComponent}
     * @memberof ResComputationComponents
     */
    components: ResComputationComponent;
    /**
     * Count of successful computations for the given loaded instance of the model.
     * @type {number}
     * @memberof ResComputationComponents
     */
    count_success?: number;
    /**
     * Count of timed-out computations for the given loaded instance of the model.
     * @type {number}
     * @memberof ResComputationComponents
     */
    count_timeout?: number;
    /**
     * Lists the ids of the parameters whose values were changed before the computation.
     * @type {Array<string>}
     * @memberof ResComputationComponents
     */
    changes?: Array<string>;
}
/**
 * Limits of a model computation process.
 * @export
 * @interface ResComputationLimits
 */
export interface ResComputationLimits {
    /**
     * Maximum computation time in milliseconds allowed for the model.
     * @type {number}
     * @memberof ResComputationLimits
     */
    max_comp_time: number;
    /**
     * Maximum output size in bytes allowed for the model.
     * @type {number}
     * @memberof ResComputationLimits
     */
    max_output_size: number;
    /**
     * Maximum export size in bytes allowed for the model.
     * @type {number}
     * @memberof ResComputationLimits
     */
    max_export_size: number;
}

/**
 * Status of a model computation.
 * @export
 */
export const ResComputationStatus = {
    SUCCESS: 'success',
    TIMEOUT: 'timeout',
    CHECK_CONFIRMED: 'checkconfirmed',
    CHECK_DENIED: 'checkdenied',
    CHECK_PENDING: 'checkpending',
    MAX_COMBINED_ASSET_SIZE_EXCEEDED: 'maxcombinedassetsizeexceeded',
    MAX_DB_SIZE_PER_OUTPUT_EXCEEDED: 'maxdbsizeperoutputexceeded',
    MAX_PARTS_PER_OUTPUT_EXCEEDED: 'maxpartsperoutputexceeded',
    MAX_ASSET_PARTS_PER_OUTPUT_EXCEEDED: 'maxassetpartsperoutputexceeded',
    MAX_TRANSFORMATIONS_PER_OUTPUT_EXCEEDED: 'maxtransformationsperoutputexceeded',
    MAX_PARTS_EXCEEDED: 'maxpartsexceeded',
    MAX_ASSET_PARTS_EXCEEDED: 'maxassetpartsexceeded',
    RECOVERABLE_ERROR: 'recoverableerror',
    UNRECOVERABLE_ERROR: 'unrecoverableerror',
    NO_OUTPUT_DATA_FOR_DEFAULT_PARAMETER_VALUES: 'nooutputdatafordefaultparametervalues',
    MODEL_WITHOUT_GEOMETRY_OUTPUT: 'modelwithoutgeometryoutput',
    UNKNOWN: 'unknown'
} as const;
export type ResComputationStatus = typeof ResComputationStatus[keyof typeof ResComputationStatus];

/**
 * 
 * @export
 * @interface ResComputeExports
 */
export interface ResComputeExports {
    /**
     * Actions the client may take.
     * @type {Array<ResAction>}
     * @memberof ResComputeExports
     */
    actions?: Array<ResAction>;
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     * @type {{ [key: string]: ResExportOrDefinition; }}
     * @memberof ResComputeExports
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResComputeExports
     */
    message?: string;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     * @type {{ [key: string]: ResOutputOrDefinition; }}
     * @memberof ResComputeExports
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Request templates for actions.
     * @type {Array<ResTemplate>}
     * @memberof ResComputeExports
     */
    templates?: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResComputeExports
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResComputeOutputs
 */
export interface ResComputeOutputs {
    /**
     * Actions the client may take.
     * @type {Array<ResAction>}
     * @memberof ResComputeOutputs
     */
    actions?: Array<ResAction>;
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResComputeOutputs
     */
    message?: string;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     * @type {{ [key: string]: ResOutputOrDefinition; }}
     * @memberof ResComputeOutputs
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Request templates for actions.
     * @type {Array<ResTemplate>}
     * @memberof ResComputeOutputs
     */
    templates?: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResComputeOutputs
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResComputeSettings
 */
export interface ResComputeSettings {
    /**
     * Allows to control whether the model's Grasshopper file can contain scripts.
     * @type {boolean}
     * @memberof ResComputeSettings
     */
    deny_scripts: boolean;
    /**
     * File type of the model.
     * @type {string}
     * @memberof ResComputeSettings
     */
    ftype: string;
    /**
     * Allows to control whether the model should be warmed up immediately after loading by running a computation. This increases the likelihood of following computation requests to be faster.
     * @type {boolean}
     * @memberof ResComputeSettings
     */
    initial_warmup: boolean;
    /**
     * Maximum number of milliseconds allowed for computations of this model.
     * @type {number}
     * @memberof ResComputeSettings
     */
    max_comp_time: number;
    /**
     * Maximum number of bytes allowed to be exported from a model for a specific set of parameter values.
     * @type {number}
     * @memberof ResComputeSettings
     */
    max_export_size: number;
    /**
     * Maximum amount of minutes a loaded model may be unused before it gets unloaded.
     * 
     * Note: Models may get unloaded earlier than that.
     * @type {number}
     * @memberof ResComputeSettings
     */
    max_idle_minutes: number;
    /**
     * Maximum number of bytes allowed for the model's Grasshopper file size.
     * @type {number}
     * @memberof ResComputeSettings
     */
    max_model_size?: number;
    /**
     * Maximum number of bytes allowed for an output of a model for a specific set of parameter values.
     * @type {number}
     * @memberof ResComputeSettings
     */
    max_output_size: number;
    /**
     * Maximum number of bytes allowed for a single texture.
     * @type {number}
     * @memberof ResComputeSettings
     */
    max_texture_size?: number;
    /**
     * Maximum time a computation request may stay waiting before a further worker goes ahead regardless of whether it already has the model loaded, and regardless of `num_loaded_max`. This allows to configure a soft or a hard upper boundary for the number of loaded models.
     * @type {number}
     * @memberof ResComputeSettings
     */
    max_wait_time: number;
    /**
     * Maximum number of workers that should have the model loaded at the same time.
     * @type {number}
     * @memberof ResComputeSettings
     */
    num_loaded_max: number;
    /**
     * Minimum number of workers that should load the model and keep it open while there is session activity.
     * @type {number}
     * @memberof ResComputeSettings
     */
    num_loaded_min: number;
    /**
     * Minimum number of workers that should always have the model loaded, regardless of session activity. This allows to minimise the likelihood of computation requests being slower due to model loading.
     * @type {number}
     * @memberof ResComputeSettings
     */
    num_preloaded_min: number;
    /**
     * Limits the number of sessions that can be created by a specific IP address in one hour.
     * @type {number}
     * @memberof ResComputeSettings
     */
    session_rate_limit?: number;
    /**
     * Controls whether failed computations will be retried.
     * @type {string}
     * @memberof ResComputeSettings
     */
    trust: string;
}
/**
 * 
 * @export
 * @interface ResComputedComponent
 */
export interface ResComputedComponent {
    /**
     * Instance ID of component.
     * @type {string}
     * @memberof ResComputedComponent
     */
    instance: string;
    /**
     * ID of the component.
     * @type {string}
     * @memberof ResComputedComponent
     */
    component: string;
    /**
     * Name of component.
     * @type {string}
     * @memberof ResComputedComponent
     */
    name: string;
    /**
     * Nickname of component.
     * @type {string}
     * @memberof ResComputedComponent
     */
    nick_name: string;
    /**
     * Computation time used.
     * @type {number}
     * @memberof ResComputedComponent
     */
    time: number;
}
/**
 * 
 * @export
 * @interface ResComputingComponent
 */
export interface ResComputingComponent {
    /**
     * Instance ID of component.
     * @type {string}
     * @memberof ResComputingComponent
     */
    instance: string;
    /**
     * ID of component.
     * @type {string}
     * @memberof ResComputingComponent
     */
    component: string;
    /**
     * Name of component.
     * @type {string}
     * @memberof ResComputingComponent
     */
    name: string;
    /**
     * Nickname of component.
     * @type {string}
     * @memberof ResComputingComponent
     */
    nick_name: string;
}
/**
 * 
 * @export
 * @interface ResCreateAuthorizationGroup
 */
export interface ResCreateAuthorizationGroup {
    /**
     * The auth-group to use for ticked-based authentication.
     * @type {string}
     * @memberof ResCreateAuthorizationGroup
     */
    auth_group: string;
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResCreateAuthorizationGroup
     */
    message?: string;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResCreateAuthorizationGroup
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResCreateModel
 */
export interface ResCreateModel {
    /**
     * Links regarding the model file.
     * @type {ResFile}
     * @memberof ResCreateModel
     */
    file: ResFile;
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResCreateModel
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     * @type {ResModel}
     * @memberof ResCreateModel
     */
    model: ResModel;
    /**
     * Various settings.
     * @type {ResSettings}
     * @memberof ResCreateModel
     */
    setting: ResSettings;
    /**
     * Statistics of a model.
     * @type {ResStatistic}
     * @memberof ResCreateModel
     */
    statistic: ResStatistic;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResCreateModel
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResCreateModelConfig
 */
export interface ResCreateModelConfig {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResCreateModelConfig
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResCreateModelState
 */
export interface ResCreateModelState {
    /**
     * Model-State information.
     * @type {ResModelState}
     * @memberof ResCreateModelState
     */
    modelState: ResModelState;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResCreateModelState
     */
    version: string;
    /**
     * 
     * @type {ResModelStateAsset}
     * @memberof ResCreateModelState
     */
    asset?: ResModelStateAsset;
}
/**
 * 
 * @export
 * @interface ResCreateSessionByModel
 */
export interface ResCreateSessionByModel {
    /**
     * Actions the client may take.
     * @type {Array<ResAction>}
     * @memberof ResCreateSessionByModel
     */
    actions: Array<ResAction>;
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     * @type {{ [key: string]: ResExportOrDefinition; }}
     * @memberof ResCreateSessionByModel
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Links regarding the model file.
     * @type {ResFile}
     * @memberof ResCreateSessionByModel
     */
    file: ResFile;
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResCreateSessionByModel
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     * @type {ResModel}
     * @memberof ResCreateSessionByModel
     */
    model: ResModel;
    /**
     * Model-State information.
     * @type {ResModelStateData}
     * @memberof ResCreateSessionByModel
     */
    modelState?: ResModelStateData;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     * @type {{ [key: string]: ResOutputOrDefinition; }}
     * @memberof ResCreateSessionByModel
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Parameter definitions, not contained with every response. A directory of parameter-IDs and parameters.
     * @type {{ [key: string]: ResParameter; }}
     * @memberof ResCreateSessionByModel
     */
    parameters?: { [key: string]: ResParameter; };
    /**
     * The ID of the created session.
     * @type {string}
     * @memberof ResCreateSessionByModel
     */
    sessionId: string;
    /**
     * Various settings.
     * @type {ResSettings}
     * @memberof ResCreateSessionByModel
     */
    setting: ResSettings;
    /**
     * Statistics of a model.
     * @type {ResStatistic}
     * @memberof ResCreateSessionByModel
     */
    statistic: ResStatistic;
    /**
     * Request templates for actions.
     * @type {Array<ResTemplate>}
     * @memberof ResCreateSessionByModel
     */
    templates: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResCreateSessionByModel
     */
    version: string;
    /**
     * Viewer specific data.
     * @type {ResViewer}
     * @memberof ResCreateSessionByModel
     */
    viewer: ResViewer;
    /**
     * The current version of the viewer settings.
     * @type {string}
     * @memberof ResCreateSessionByModel
     */
    viewerSettingsVersion: string;
    /**
     * An array of warnings encountered during request processing. These warnings indicate potential issues or non-critical conditions but did not prevent the request from being successfully processed.
     * @type {Array<string>}
     * @memberof ResCreateSessionByModel
     */
    warnings?: Array<string>;
}
/**
 * 
 * @export
 * @interface ResCreateSessionByTicket
 */
export interface ResCreateSessionByTicket {
    /**
     * Actions the client may take.
     * @type {Array<ResAction>}
     * @memberof ResCreateSessionByTicket
     */
    actions: Array<ResAction>;
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     * @type {{ [key: string]: ResExportOrDefinition; }}
     * @memberof ResCreateSessionByTicket
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Links regarding the model file.
     * @type {ResFile}
     * @memberof ResCreateSessionByTicket
     */
    file: ResFile;
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResCreateSessionByTicket
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     * @type {ResModel}
     * @memberof ResCreateSessionByTicket
     */
    model: ResModel;
    /**
     * Model-State information.
     * @type {ResModelStateData}
     * @memberof ResCreateSessionByTicket
     */
    modelState?: ResModelStateData;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     * @type {{ [key: string]: ResOutputOrDefinition; }}
     * @memberof ResCreateSessionByTicket
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Parameter definitions, not contained with every response. A directory of parameter-IDs and parameters.
     * @type {{ [key: string]: ResParameter; }}
     * @memberof ResCreateSessionByTicket
     */
    parameters?: { [key: string]: ResParameter; };
    /**
     * The ID of the created session.
     * @type {string}
     * @memberof ResCreateSessionByTicket
     */
    sessionId: string;
    /**
     * Various settings.
     * @type {ResSettings}
     * @memberof ResCreateSessionByTicket
     */
    setting: ResSettings;
    /**
     * Statistics of a model.
     * @type {ResStatistic}
     * @memberof ResCreateSessionByTicket
     */
    statistic: ResStatistic;
    /**
     * Request templates for actions.
     * @type {Array<ResTemplate>}
     * @memberof ResCreateSessionByTicket
     */
    templates: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResCreateSessionByTicket
     */
    version: string;
    /**
     * Viewer specific data.
     * @type {ResViewer}
     * @memberof ResCreateSessionByTicket
     */
    viewer: ResViewer;
    /**
     * The current version of the viewer settings.
     * @type {string}
     * @memberof ResCreateSessionByTicket
     */
    viewerSettingsVersion: string;
    /**
     * An array of warnings encountered during request processing. These warnings indicate potential issues or non-critical conditions but did not prevent the request from being successfully processed.
     * @type {Array<string>}
     * @memberof ResCreateSessionByTicket
     */
    warnings?: Array<string>;
}
/**
 * 
 * @export
 * @interface ResCreateTicket
 */
export interface ResCreateTicket {
    /**
     * Links regarding the model file.
     * @type {ResFile}
     * @memberof ResCreateTicket
     */
    file: ResFile;
    /**
     * The definitions of a ShapeDiver model.
     * @type {ResModel}
     * @memberof ResCreateTicket
     */
    model: ResModel;
    /**
     * Various settings.
     * @type {ResSettings}
     * @memberof ResCreateTicket
     */
    setting: ResSettings;
    /**
     * Statistics of a model.
     * @type {ResStatistic}
     * @memberof ResCreateTicket
     */
    statistic: ResStatistic;
    /**
     * The ticket to create a model session.
     * @type {string}
     * @memberof ResCreateTicket
     */
    ticket: string;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResCreateTicket
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResDecryptTicket
 */
export interface ResDecryptTicket {
    /**
     * Decrypted ticket details.
     * @type {ResTicket}
     * @memberof ResDecryptTicket
     */
    decryptedTicket: ResTicket;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResDecryptTicket
     */
    version: string;
}
/**
 * Combined output and export requests.
 * @export
 * @interface ResDefaultCombinedMetric
 */
export interface ResDefaultCombinedMetric {
    /**
     * Number of combined output and export requests charged.
     * @type {number}
     * @memberof ResDefaultCombinedMetric
     */
    credits: number;
}
/**
 * Computations information.
 * @export
 * @interface ResDefaultComputationMetric
 */
export interface ResDefaultComputationMetric {
    /**
     * Number of computations.
     * @type {number}
     * @memberof ResDefaultComputationMetric
     */
    count: number;
    /**
     * Number of finished 10-second chunks charged.
     * @type {number}
     * @memberof ResDefaultComputationMetric
     */
    credits: number;
    /**
     * Total duration of computation time, in milliseconds.
     * @type {number}
     * @memberof ResDefaultComputationMetric
     */
    duration: number;
    /**
     * Count of computations per computation time expressed in started 10-second chunks.
     * @type {{ [key: string]: number; }}
     * @memberof ResDefaultComputationMetric
     */
    countPerChunks: { [key: string]: number; };
}
/**
 * Aggregated metrics for 'default' sessions.
 * @export
 * @interface ResDefaultCreditMetric
 */
export interface ResDefaultCreditMetric {
    /**
     * 
     * @type {ResDefaultOutputMetric}
     * @memberof ResDefaultCreditMetric
     */
    outputs: ResDefaultOutputMetric;
    /**
     * 
     * @type {ResDefaultExportMetric}
     * @memberof ResDefaultCreditMetric
     */
    exports: ResDefaultExportMetric;
    /**
     * 
     * @type {ResDefaultCombinedMetric}
     * @memberof ResDefaultCreditMetric
     */
    combined: ResDefaultCombinedMetric;
    /**
     * 
     * @type {ResDefaultSessionMetric}
     * @memberof ResDefaultCreditMetric
     */
    sessions: ResDefaultSessionMetric;
    /**
     * 
     * @type {ResDefaultComputationMetric}
     * @memberof ResDefaultCreditMetric
     */
    computations: ResDefaultComputationMetric;
}
/**
 * Pure export requests.
 * @export
 * @interface ResDefaultExportMetric
 */
export interface ResDefaultExportMetric {
    /**
     * Number of pure export requests charged.
     * @type {number}
     * @memberof ResDefaultExportMetric
     */
    credits: number;
}
/**
 * Pure output requests.
 * @export
 * @interface ResDefaultOutputMetric
 */
export interface ResDefaultOutputMetric {
    /**
     * Number of pure output requests charged.
     * @type {number}
     * @memberof ResDefaultOutputMetric
     */
    credits: number;
}
/**
 * Session information.
 * @export
 * @interface ResDefaultSessionMetric
 */
export interface ResDefaultSessionMetric {
    /**
     * Number of sessions.
     * @type {number}
     * @memberof ResDefaultSessionMetric
     */
    count: number;
    /**
     * The total duration of all sessions, in milliseconds.
     * @type {number}
     * @memberof ResDefaultSessionMetric
     */
    duration: number;
}
/**
 * 
 * @export
 * @interface ResDeleteFile
 */
export interface ResDeleteFile {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResDeleteFile
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResDeleteModel
 */
export interface ResDeleteModel {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResDeleteModel
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResDeleteModelState
 */
export interface ResDeleteModelState {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResDeleteModelState
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResDeleteSdtf
 */
export interface ResDeleteSdtf {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResDeleteSdtf
     */
    version: string;
}
/**
 * Body of an error object.
 * @export
 * @interface ResError
 */
export interface ResError {
    /**
     * The type of the error.
     * @type {ResErrorType}
     * @memberof ResError
     */
    error: ResErrorType;
    /**
     * General description of the error type.
     * @type {string}
     * @memberof ResError
     */
    desc: string;
    /**
     * Detailed error description.
     * @type {string}
     * @memberof ResError
     */
    message?: string;
}


/**
 * 
 * @export
 * @interface ResErrorComponent
 */
export interface ResErrorComponent {
    /**
     * ID of component.
     * @type {string}
     * @memberof ResErrorComponent
     */
    component: string;
    /**
     * Component Error descriptions.
     * @type {Array<string>}
     * @memberof ResErrorComponent
     */
    errors: Array<string>;
    /**
     * Instance ID of component.
     * @type {string}
     * @memberof ResErrorComponent
     */
    instance: string;
    /**
     * Name of component.
     * @type {string}
     * @memberof ResErrorComponent
     */
    name: string;
    /**
     * Nickname of component.
     * @type {string}
     * @memberof ResErrorComponent
     */
    nick_name: string;
    /**
     * Component Warnings descriptions.
     * @type {Array<string>}
     * @memberof ResErrorComponent
     */
    warnings: Array<string>;
}

/**
 * Possible error types.
 * @export
 */
export const ResErrorType = {
    ASSERTION_ERROR: 'SdAssertionError',
    CACHE_ERROR_GENERIC: 'SdCacheErrorGeneric',
    CONNECTOR_ERROR: 'SdConnectorError',
    DATABASE_ERROR_GENERIC: 'SdDatabaseErrorGeneric',
    EMAILING_ERROR: 'SdEmailingError',
    ERROR_ENTITY_NOT_FOUND: 'SdErrorEntityNotFound',
    ERROR_FORBIDDEN: 'SdErrorForbidden',
    ERROR_GENERIC_CLIENT: 'SdErrorGenericClient',
    ERROR_GENERIC_INTERNAL: 'SdErrorGenericInternal',
    ERROR_UNAUTHORIZED: 'SdErrorUnauthorized',
    ILLEGAL_ARGUMENT_ERROR: 'SdIllegalArgumentError',
    JWT_VALIDATION_ERROR: 'SdJwtValidationError',
    METHOD_NOT_ALLOWED_ERROR: 'SdMethodNotAllowedError',
    MODEL_VALIDATION_ERROR: 'SdModelValidationError',
    NOT_ACCEPTABLE: 'SdNotAcceptable',
    NOT_FOUND_ERROR: 'SdNotFoundError',
    PARAMETER_VALIDATION_ERROR: 'SdParameterValidationError',
    RATE_LIMIT_ERROR_GENERIC: 'SdRateLimitErrorGeneric',
    REQUEST_TIMEOUT: 'SdRequestTimeout',
    REQUEST_VALIDATION_ERROR: 'SdRequestValidationError',
    RESOURCE_GONE_ERROR: 'SdResourceGoneError',
    SESSION_GONE_ERROR: 'SdSessionGoneError',
    SESSION_VALIDATION_ERROR: 'SdSessionValidationError',
    STORAGE_ERROR_GENERIC: 'SdStorageErrorGeneric',
    TEXTURE_URL_ERROR: 'SdTextureUrlError',
    TICKET_VALIDATION_ERROR: 'SdTicketValidationError',
    TOKEN_MISSING_ERROR: 'SdTokenMissingError',
    TRANSFORM_CONTENT_ARRAY_ERROR: 'SdTransformContentArrayError',
    UNCONFIRMED_MODEL_ERROR: 'SdUnconfirmedModelError',
    UNKNOWN: ''
} as const;
export type ResErrorType = typeof ResErrorType[keyof typeof ResErrorType];

/**
 * Export definition WITH results as exposed on the API.
 * @export
 * @interface ResExport
 */
export interface ResExport {
    /**
     * ID of the export, dependent on model ID, and therefore changing each time a model gets uploaded.
     * @type {string}
     * @memberof ResExport
     */
    id: string;
    /**
     * Constant ID of the export, not dependent on model ID, and therefore NOT changing each time a model gets uploaded. Might be undefined because this property was introduced in summer 2020 and does not exist for exports of older models.
     * @type {string}
     * @memberof ResExport
     */
    uid?: string;
    /**
     * Name of the export.
     * @type {string}
     * @memberof ResExport
     */
    name: string;
    /**
     * Type of export.
     * @type {ResExportDefinitionType}
     * @memberof ResExport
     */
    type: ResExportDefinitionType;
    /**
     * List of IDs of parameters influencing this export.
     * @type {Array<string>}
     * @memberof ResExport
     */
    dependency: Array<string>;
    /**
     * Group information of an export definition.
     * @type {CommonsGroup}
     * @memberof ResExport
     */
    group?: CommonsGroup;
    /**
     * Ordering of the export in client applications.
     * @type {number}
     * @memberof ResExport
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     * @type {string}
     * @memberof ResExport
     */
    tooltip?: string;
    /**
     * Parameter name to display instead of `name`.
     * @type {string}
     * @memberof ResExport
     */
    displayname?: string;
    /**
     * Controls whether the parameter should be hidden in the UI.
     * @type {boolean}
     * @memberof ResExport
     */
    hidden: boolean;
    /**
     * Type-specific ID of the export. In case of exports defined by a single component, this corresponds to the component’s uuid.
     * @type {string}
     * @memberof ResExport
     */
    typeId?: string;
    /**
     * Type-specific name of the export. In case of exports defined by a single component, this corresponds to the component’s name (NOT its nickname).
     * @type {string}
     * @memberof ResExport
     */
    typeName?: string;
    /**
     * Requested version of the export.
     * @type {string}
     * @memberof ResExport
     */
    version: string;
    /**
     * The delay in milliseconds after which an export cache request shall be sent to
     * check again for this export version. This property is used ONLY if the export
     * version has not been computed yet.
     * 
     * Note that the existence of this property does not necessarily imply the presence of
     * an active or queued computation for the respective export version.
     * @type {number}
     * @memberof ResExport
     */
    delay?: number;
    /**
     * Result parts. In case this array does not exist, this means that the workers have not finished computation for this output version.
     * @type {Array<ResExportContent>}
     * @memberof ResExport
     */
    content?: Array<ResExportContent>;
    /**
     * In case computation of the export version (temporarily) failed. Contains a message explaining what went wrong.
     * @type {string}
     * @memberof ResExport
     */
    msg?: string;
    /**
     * Optional suggested filename for the files to be downloaded.
     * @type {string}
     * @memberof ResExport
     */
    filename?: string;
    /**
     * 
     * @type {ResExportResult}
     * @memberof ResExport
     */
    result?: ResExportResult;
    /**
     * Status of the computation which resulted in the export version.
     * @type {ResComputationStatus}
     * @memberof ResExport
     */
    status_computation?: ResComputationStatus;
    /**
     * Status of collecting results for the export version.
     * @type {ResComputationStatus}
     * @memberof ResExport
     */
    status_collect?: ResComputationStatus;
}


/**
 * An item of the `content` array for exports.
 * @export
 * @interface ResExportContent
 */
export interface ResExportContent {
    /**
     * Format of export result (file extension).
     * @type {string}
     * @memberof ResExportContent
     */
    format: string;
    /**
     * Link for download of exported asset.
     * @type {string}
     * @memberof ResExportContent
     */
    href: string;
    /**
     * Optional size of exported asset, in bytes.
     * @type {number}
     * @memberof ResExportContent
     */
    size?: number;
    /**
     * Optional Content-Type for parts of type `asset`.
     * @type {string}
     * @memberof ResExportContent
     */
    contentType?: string;
}
/**
 * Export definition WITHOUT results as exposed on the API.
 * @export
 * @interface ResExportDefinition
 */
export interface ResExportDefinition {
    /**
     * ID of the export, dependent on model ID, and therefore changing each time a model gets uploaded.
     * @type {string}
     * @memberof ResExportDefinition
     */
    id: string;
    /**
     * Constant ID of the export, not dependent on model ID, and therefore NOT changing each time a model gets uploaded. Might be undefined because this property was introduced in summer 2020 and does not exist for exports of older models.
     * @type {string}
     * @memberof ResExportDefinition
     */
    uid?: string;
    /**
     * Name of the export.
     * @type {string}
     * @memberof ResExportDefinition
     */
    name: string;
    /**
     * Type of export.
     * @type {ResExportDefinitionType}
     * @memberof ResExportDefinition
     */
    type: ResExportDefinitionType;
    /**
     * List of IDs of parameters influencing this export.
     * @type {Array<string>}
     * @memberof ResExportDefinition
     */
    dependency: Array<string>;
    /**
     * Group information of an export definition.
     * @type {CommonsGroup}
     * @memberof ResExportDefinition
     */
    group?: CommonsGroup;
    /**
     * Ordering of the export in client applications.
     * @type {number}
     * @memberof ResExportDefinition
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     * @type {string}
     * @memberof ResExportDefinition
     */
    tooltip?: string;
    /**
     * Parameter name to display instead of `name`.
     * @type {string}
     * @memberof ResExportDefinition
     */
    displayname?: string;
    /**
     * Controls whether the parameter should be hidden in the UI.
     * @type {boolean}
     * @memberof ResExportDefinition
     */
    hidden: boolean;
    /**
     * Type-specific ID of the export. In case of exports defined by a single component, this corresponds to the component’s uuid.
     * @type {string}
     * @memberof ResExportDefinition
     */
    typeId?: string;
    /**
     * Type-specific name of the export. In case of exports defined by a single component, this corresponds to the component’s name (NOT its nickname).
     * @type {string}
     * @memberof ResExportDefinition
     */
    typeName?: string;
    /**
     * This property is never set.
     * @type {boolean}
     * @memberof ResExportDefinition
     * @deprecated
     */
    version?: boolean | null;
}



/**
 * Types of exports.
 * @export
 */
export const ResExportDefinitionType = {
    UNKNOWN: 'unknown',
    DOWNLOAD: 'download',
    EMAIL: 'email',
    SHAPEWAYS: 'shapeways'
} as const;
export type ResExportDefinitionType = typeof ResExportDefinitionType[keyof typeof ResExportDefinitionType];

/**
 * 
 * @export
 * @interface ResExportList
 */
export interface ResExportList {
    /**
     * A directory of file objects.
     * @type {Array<ResFileInfo>}
     * @memberof ResExportList
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     * @type {Array<ResSdtfInfo>}
     * @memberof ResExportList
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     * @type {Array<ResModel>}
     * @memberof ResExportList
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     * @type {Array<ResModelStateInfo>}
     * @memberof ResExportList
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     * @type {Array<ResOutput>}
     * @memberof ResExportList
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     * @type {Array<ResExport>}
     * @memberof ResExportList
     */
    export: Array<ResExport>;
    /**
     * A directory of model textures.
     * @type {Array<ResTexture>}
     * @memberof ResExportList
     */
    texture?: Array<ResTexture>;
}
/**
 * @type ResExportOrDefinition
 * Either a full export or it's definition.
 * @export
 */
export type ResExportOrDefinition = ResExport | ResExportDefinition;
/**
 * Optional result object for exports of type `email` and `shapeways`.
 * @export
 * @interface ResExportResult
 */
export interface ResExportResult {
    /**
     * Optional success message for user.
     * @type {string}
     * @memberof ResExportResult
     */
    msg?: string;
    /**
     * Optional error message for user.
     * @type {string}
     * @memberof ResExportResult
     */
    err?: string;
    /**
     * Optional href to redirect user to for download.
     * @type {string}
     * @memberof ResExportResult
     */
    href?: string;
    /**
     * Optional shapeways model ID.
     * @type {string}
     * @memberof ResExportResult
     */
    modelId?: string;
}
/**
 * Definitions of a model file.
 * @export
 * @interface ResFile
 */
export interface ResFile {
    /**
     * URL to upload a model file.
     * @type {string}
     * @memberof ResFile
     */
    upload?: string;
    /**
     * URL to download a model file.
     * @type {string}
     * @memberof ResFile
     */
    download?: string;
}
/**
 * File assets.
 * @export
 * @interface ResFileAsset
 */
export interface ResFileAsset {
    /**
     * A directory of parameter-IDs and asset-definitions.
     * @type {{ [key: string]: ResAssetDefinition; }}
     * @memberof ResFileAsset
     */
    file: { [key: string]: ResAssetDefinition; };
    /**
     * 
     * @type {Array<ResAssetDefinition>}
     * @memberof ResFileAsset
     */
    sdtf?: Array<ResAssetDefinition>;
    /**
     * The asset-definition of a Model-State image.
     * @type {ResAssetDefinition}
     * @memberof ResFileAsset
     */
    modelState?: ResAssetDefinition;
}
/**
 * Result part for the response to a list request for file objects.
 * @export
 * @interface ResFileInfo
 */
export interface ResFileInfo {
    /**
     * ID of the file.
     * @type {string}
     * @memberof ResFileInfo
     */
    id: string;
    /**
     * ID of the parameter that the file is assigned to.
     * @type {string}
     * @memberof ResFileInfo
     */
    parameterId: string;
    /**
     * The size of the file in bytes.
     * @type {number}
     * @memberof ResFileInfo
     */
    size: number;
    /**
     * The name of the file, when specified during the upload.
     * @type {string}
     * @memberof ResFileInfo
     */
    filename?: string;
}
/**
 * 
 * @export
 * @interface ResFileList
 */
export interface ResFileList {
    /**
     * A directory of file objects.
     * @type {Array<ResFileInfo>}
     * @memberof ResFileList
     */
    file: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     * @type {Array<ResSdtfInfo>}
     * @memberof ResFileList
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     * @type {Array<ResModel>}
     * @memberof ResFileList
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     * @type {Array<ResModelStateInfo>}
     * @memberof ResFileList
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     * @type {Array<ResOutput>}
     * @memberof ResFileList
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     * @type {Array<ResExport>}
     * @memberof ResFileList
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
     * @type {Array<ResTexture>}
     * @memberof ResFileList
     */
    texture?: Array<ResTexture>;
}
/**
 * 
 * @export
 * @interface ResGetCachedExports
 */
export interface ResGetCachedExports {
    /**
     * Actions the client may take.
     * @type {Array<ResAction>}
     * @memberof ResGetCachedExports
     */
    actions?: Array<ResAction>;
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     * @type {{ [key: string]: ResExportOrDefinition; }}
     * @memberof ResGetCachedExports
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResGetCachedExports
     */
    message?: string;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     * @type {{ [key: string]: ResOutputOrDefinition; }}
     * @memberof ResGetCachedExports
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Request templates for actions.
     * @type {Array<ResTemplate>}
     * @memberof ResGetCachedExports
     */
    templates?: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetCachedExports
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetCachedOutputs
 */
export interface ResGetCachedOutputs {
    /**
     * Actions the client may take.
     * @type {Array<ResAction>}
     * @memberof ResGetCachedOutputs
     */
    actions?: Array<ResAction>;
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResGetCachedOutputs
     */
    message?: string;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     * @type {{ [key: string]: ResOutputOrDefinition; }}
     * @memberof ResGetCachedOutputs
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Request templates for actions.
     * @type {Array<ResTemplate>}
     * @memberof ResGetCachedOutputs
     */
    templates?: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetCachedOutputs
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetCleanupStatus
 */
export interface ResGetCleanupStatus {
    /**
     * Model cleanup information.
     * @type {Array<ResModelCleanupProcess>}
     * @memberof ResGetCleanupStatus
     */
    cleanup: Array<ResModelCleanupProcess>;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetCleanupStatus
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetCreditMetrics
 */
export interface ResGetCreditMetrics {
    /**
     * Analytics information.
     * @type {ResAnalytics}
     * @memberof ResGetCreditMetrics
     */
    analytics: ResAnalytics;
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResGetCreditMetrics
     */
    message?: string;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetCreditMetrics
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetMinionsInfo
 */
export interface ResGetMinionsInfo {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetMinionsInfo
     */
    version: string;
    /**
     * 
     * @type {ResMinionSystem}
     * @memberof ResGetMinionsInfo
     */
    system: ResMinionSystem;
}
/**
 * 
 * @export
 * @interface ResGetModel
 */
export interface ResGetModel {
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     * @type {{ [key: string]: ResExportOrDefinition; }}
     * @memberof ResGetModel
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Links regarding the model file.
     * @type {ResFile}
     * @memberof ResGetModel
     */
    file: ResFile;
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResGetModel
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     * @type {ResModel}
     * @memberof ResGetModel
     */
    model: ResModel;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     * @type {{ [key: string]: ResOutputOrDefinition; }}
     * @memberof ResGetModel
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Parameter definitions, not contained with every response. A directory of parameter-IDs and parameters.
     * @type {{ [key: string]: ResParameter; }}
     * @memberof ResGetModel
     */
    parameters?: { [key: string]: ResParameter; };
    /**
     * 
     * @type {ResPlugins}
     * @memberof ResGetModel
     */
    plugins?: ResPlugins;
    /**
     * Various settings.
     * @type {ResSettings}
     * @memberof ResGetModel
     */
    setting: ResSettings;
    /**
     * Statistics of a model.
     * @type {ResStatistic}
     * @memberof ResGetModel
     */
    statistic: ResStatistic;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetModel
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetModelComputations
 */
export interface ResGetModelComputations {
    /**
     * Statistics about model computations.
     * @type {Array<ResModelComputation>}
     * @memberof ResGetModelComputations
     */
    computations: Array<ResModelComputation>;
    /**
     * Pagination information.
     * @type {ResPagination}
     * @memberof ResGetModelComputations
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetModelComputations
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetModelConfig
 */
export interface ResGetModelConfig {
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResGetModelConfig
     */
    message?: string;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetModelConfig
     */
    version: string;
    /**
     * Viewer specific data.
     * @type {ResViewer}
     * @memberof ResGetModelConfig
     */
    viewer: ResViewer;
}
/**
 * 
 * @export
 * @interface ResGetModelOrganizationCreditMetrics
 */
export interface ResGetModelOrganizationCreditMetrics {
    /**
     * Analytics information.
     * @type {ResAnalytics}
     * @memberof ResGetModelOrganizationCreditMetrics
     */
    analytics: ResAnalytics;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetModelOrganizationCreditMetrics
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetModelState
 */
export interface ResGetModelState {
    /**
     * Model-State information.
     * @type {ResModelState}
     * @memberof ResGetModelState
     */
    modelState: ResModelState;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetModelState
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetModelStateData
 */
export interface ResGetModelStateData {
    /**
     * Model-State information.
     * @type {ResModelStateData}
     * @memberof ResGetModelStateData
     */
    modelState: ResModelStateData;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetModelStateData
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetModelUserCreditMetrics
 */
export interface ResGetModelUserCreditMetrics {
    /**
     * Analytics information.
     * @type {ResAnalytics}
     * @memberof ResGetModelUserCreditMetrics
     */
    analytics: ResAnalytics;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetModelUserCreditMetrics
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetOrganizationCreditMetrics
 */
export interface ResGetOrganizationCreditMetrics {
    /**
     * Analytics information.
     * @type {ResAnalytics}
     * @memberof ResGetOrganizationCreditMetrics
     */
    analytics: ResAnalytics;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetOrganizationCreditMetrics
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetScaleInCandidate
 */
export interface ResGetScaleInCandidate {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetScaleInCandidate
     */
    version: string;
    /**
     * 
     * @type {ResScaleInCandidate}
     * @memberof ResGetScaleInCandidate
     */
    system: ResScaleInCandidate;
}
/**
 * 
 * @export
 * @interface ResGetSessionDefaults
 */
export interface ResGetSessionDefaults {
    /**
     * Actions the client may take.
     * @type {Array<ResAction>}
     * @memberof ResGetSessionDefaults
     */
    actions: Array<ResAction>;
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     * @type {{ [key: string]: ResExportOrDefinition; }}
     * @memberof ResGetSessionDefaults
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResGetSessionDefaults
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     * @type {ResModel}
     * @memberof ResGetSessionDefaults
     */
    model: ResModel;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     * @type {{ [key: string]: ResOutputOrDefinition; }}
     * @memberof ResGetSessionDefaults
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Parameter definitions, not contained with every response. A directory of parameter-IDs and parameters.
     * @type {{ [key: string]: ResParameter; }}
     * @memberof ResGetSessionDefaults
     */
    parameters?: { [key: string]: ResParameter; };
    /**
     * The ID of the created session.
     * @type {string}
     * @memberof ResGetSessionDefaults
     */
    sessionId: string;
    /**
     * Statistics of a model.
     * @type {ResStatistic}
     * @memberof ResGetSessionDefaults
     */
    statistic: ResStatistic;
    /**
     * Request templates for actions.
     * @type {Array<ResTemplate>}
     * @memberof ResGetSessionDefaults
     */
    templates: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetSessionDefaults
     */
    version: string;
    /**
     * Viewer specific data.
     * @type {ResViewer}
     * @memberof ResGetSessionDefaults
     */
    viewer: ResViewer;
    /**
     * The current version of the viewer settings.
     * @type {string}
     * @memberof ResGetSessionDefaults
     */
    viewerSettingsVersion: string;
}
/**
 * 
 * @export
 * @interface ResGetUserCreditMetrics
 */
export interface ResGetUserCreditMetrics {
    /**
     * Analytics information.
     * @type {ResAnalytics}
     * @memberof ResGetUserCreditMetrics
     */
    analytics: ResAnalytics;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetUserCreditMetrics
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetWorkersInfo
 */
export interface ResGetWorkersInfo {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResGetWorkersInfo
     */
    version: string;
    /**
     * 
     * @type {ResWorkerSystem}
     * @memberof ResGetWorkersInfo
     */
    system: ResWorkerSystem;
}
/**
 * Information about uploaded glTF object.
 * @export
 * @interface ResGltfUpload
 */
export interface ResGltfUpload {
    /**
     * The URL to download the glTF file.
     * @type {string}
     * @memberof ResGltfUpload
     */
    href: string;
    /**
     * Contains the unique ID of the uploaded scene. Only present for uploads with the conversion type `scene`.
     * @type {string}
     * @memberof ResGltfUpload
     */
    sceneId?: string;
}
/**
 * Contains information about all installed Grasshopper plugins.
 * @export
 * @interface ResInstalledWorkerPlugin
 */
export interface ResInstalledWorkerPlugin {
    /**
     * ID of the Grasshopper plugin.
     * @type {string}
     * @memberof ResInstalledWorkerPlugin
     */
    id: string;
    /**
     * Name of the Grasshopper plugin.
     * @type {string}
     * @memberof ResInstalledWorkerPlugin
     */
    name: string;
    /**
     * Version of the Grasshopper plugin.
     * @type {string}
     * @memberof ResInstalledWorkerPlugin
     */
    version: string;
    /**
     * Name of the plugin author.
     * @type {string}
     * @memberof ResInstalledWorkerPlugin
     */
    authorName: string;
    /**
     * Contact information of the plugin author (homepage URL, email address, etc.).
     * @type {string}
     * @memberof ResInstalledWorkerPlugin
     */
    authorContact: string;
    /**
     * General description of the Grasshopper plugin.
     * @type {string}
     * @memberof ResInstalledWorkerPlugin
     */
    description: string;
    /**
     * Assembly version of the Grasshopper plugin DLL.
     * 
     * See the [documentation](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.assemblyname.version?view=net-8.0)
     * for more information.
     * @type {string}
     * @memberof ResInstalledWorkerPlugin
     */
    assemblyVersion: string;
    /**
     * Full assembly name of the Grasshopper plugin DLL.
     * 
     * See the [documentation](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.assembly.fullname?view=net-8.0)
     * for more information.
     * @type {string}
     * @memberof ResInstalledWorkerPlugin
     */
    assemblyFullName: string;
    /**
     * Gets whether this library is a Grasshopper core library. Core libraries are installed along with Grasshopper and thus should always be available anywhere.
     * @type {boolean}
     * @memberof ResInstalledWorkerPlugin
     */
    isCoreLibrary: boolean;
    /**
     * The license type of the plugin.
     * 
     * See the [documentation](https://developer.rhino3d.com/api/grasshopper/html/T_Grasshopper_Kernel_GH_LibraryLicense.htm)
     * for more information.
     * @type {number}
     * @memberof ResInstalledWorkerPlugin
     */
    license: number;
    /**
     * The mechanism used to load the plugin.
     * 
     * See the [documentation](https://developer.rhino3d.com/api/grasshopper/html/T_Grasshopper_Kernel_GH_LoadingMechanism.htm)
     * for more information.
     * @type {number}
     * @memberof ResInstalledWorkerPlugin
     */
    loadingMechanism: number;
    /**
     * Installation path of the Grasshopper plugin.
     * @type {string}
     * @memberof ResInstalledWorkerPlugin
     */
    location: string;
}
/**
 * Aggregated metrics for 'rate-limited timeslot' sessions.
 * @export
 * @interface ResLimitedCreditMetric
 */
export interface ResLimitedCreditMetric {
    /**
     * 
     * @type {ResRateLimitedOutputMetric}
     * @memberof ResLimitedCreditMetric
     */
    outputs: ResRateLimitedOutputMetric;
    /**
     * 
     * @type {ResRateLimitedExportMetric}
     * @memberof ResLimitedCreditMetric
     */
    exports: ResRateLimitedExportMetric;
    /**
     * 
     * @type {ResRateLimitedCombinedMetric}
     * @memberof ResLimitedCreditMetric
     */
    combined: ResRateLimitedCombinedMetric;
    /**
     * 
     * @type {ResRateLimitedSessionMetric}
     * @memberof ResLimitedCreditMetric
     */
    sessions: ResRateLimitedSessionMetric;
    /**
     * 
     * @type {ResRateLimitedComputationMetric}
     * @memberof ResLimitedCreditMetric
     */
    computations: ResRateLimitedComputationMetric;
}
/**
 * ShapeDiver API response of a list-request.
 * @export
 * @interface ResList
 */
export interface ResList {
    /**
     * A directory of file objects.
     * @type {Array<ResFileInfo>}
     * @memberof ResList
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     * @type {Array<ResSdtfInfo>}
     * @memberof ResList
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     * @type {Array<ResModel>}
     * @memberof ResList
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     * @type {Array<ResModelStateInfo>}
     * @memberof ResList
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     * @type {Array<ResOutput>}
     * @memberof ResList
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     * @type {Array<ResExport>}
     * @memberof ResList
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
     * @type {Array<ResTexture>}
     * @memberof ResList
     */
    texture?: Array<ResTexture>;
}
/**
 * 
 * @export
 * @interface ResListExportVersions
 */
export interface ResListExportVersions {
    /**
     * Pagination information.
     * @type {ResPagination}
     * @memberof ResListExportVersions
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResListExportVersions
     */
    version: string;
    /**
     * 
     * @type {ResExportList}
     * @memberof ResListExportVersions
     */
    list: ResExportList;
}
/**
 * 
 * @export
 * @interface ResListFiles
 */
export interface ResListFiles {
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResListFiles
     */
    message?: string;
    /**
     * Pagination information.
     * @type {ResPagination}
     * @memberof ResListFiles
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResListFiles
     */
    version: string;
    /**
     * 
     * @type {ResFileList}
     * @memberof ResListFiles
     */
    list: ResFileList;
}
/**
 * 
 * @export
 * @interface ResListModelStates
 */
export interface ResListModelStates {
    /**
     * Pagination information.
     * @type {ResPagination}
     * @memberof ResListModelStates
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResListModelStates
     */
    version: string;
    /**
     * 
     * @type {ResModelStateList}
     * @memberof ResListModelStates
     */
    list: ResModelStateList;
}
/**
 * 
 * @export
 * @interface ResListModels
 */
export interface ResListModels {
    /**
     * Pagination information.
     * @type {ResPagination}
     * @memberof ResListModels
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResListModels
     */
    version: string;
    /**
     * 
     * @type {ResModelList}
     * @memberof ResListModels
     */
    list: ResModelList;
}
/**
 * 
 * @export
 * @interface ResListOutputVersions
 */
export interface ResListOutputVersions {
    /**
     * Pagination information.
     * @type {ResPagination}
     * @memberof ResListOutputVersions
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResListOutputVersions
     */
    version: string;
    /**
     * 
     * @type {ResOutputList}
     * @memberof ResListOutputVersions
     */
    list: ResOutputList;
}
/**
 * 
 * @export
 * @interface ResListSdtfs
 */
export interface ResListSdtfs {
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResListSdtfs
     */
    message?: string;
    /**
     * Pagination information.
     * @type {ResPagination}
     * @memberof ResListSdtfs
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResListSdtfs
     */
    version: string;
    /**
     * 
     * @type {ResSdtfList}
     * @memberof ResListSdtfs
     */
    list: ResSdtfList;
}
/**
 * 
 * @export
 * @interface ResListTextures
 */
export interface ResListTextures {
    /**
     * Pagination information.
     * @type {ResPagination}
     * @memberof ResListTextures
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResListTextures
     */
    version: string;
    /**
     * 
     * @type {ResTextureList}
     * @memberof ResListTextures
     */
    list: ResTextureList;
}
/**
 * Information about loading times on the Geometry Workers.
 * @export
 * @interface ResLoadingCreditMetric
 */
export interface ResLoadingCreditMetric {
    /**
     * Number of started 10-second chunks charged.
     * @type {number}
     * @memberof ResLoadingCreditMetric
     */
    credits: number;
    /**
     * Number of load requests.
     * @type {number}
     * @memberof ResLoadingCreditMetric
     */
    count: number;
}
/**
 * 
 * @export
 * @interface ResLogMessage
 */
export interface ResLogMessage {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResLogMessage
     */
    version: string;
}
/**
 * Holds system information of all currently running Geometry Minion services.
 * @export
 * @interface ResMinionInfo
 */
export interface ResMinionInfo {
    /**
     * Information per instance. A directory of process-IDs and process data.
     * @type {{ [key: string]: ResMinionProcess; }}
     * @memberof ResMinionInfo
     */
    instances: { [key: string]: ResMinionProcess; };
    /**
     * Aggregated task information. A directory of task types and task data.
     * @type {{ [key: string]: ResMinionTask; }}
     * @memberof ResMinionInfo
     */
    tasks: { [key: string]: ResMinionTask; };
}
/**
 * System information a single Geometry Minions process.
 * @export
 * @interface ResMinionProcess
 */
export interface ResMinionProcess {
    /**
     * Information about completed tasks, listed per task type.
     * @type {{ [key: string]: ResMinionTask; }}
     * @memberof ResMinionProcess
     */
    tasks: { [key: string]: ResMinionTask; };
}
/**
 * Minion system information.
 * @export
 * @interface ResMinionSystem
 */
export interface ResMinionSystem {
    /**
     * System information about the Geometry Minions.
     * @type {ResMinionInfo}
     * @memberof ResMinionSystem
     */
    minions: ResMinionInfo;
    /**
     * System information about the Geometry Workers.
     * @type {ResWorkerInfo}
     * @memberof ResMinionSystem
     */
    workers?: ResWorkerInfo;
    /**
     * Scale-in candidate information for worker instances.
     * @type {ResWorkerScaleInCandidate}
     * @memberof ResMinionSystem
     */
    scaleInCandidate?: ResWorkerScaleInCandidate;
}
/**
 * Statistics of a single Minion task.
 * @export
 * @interface ResMinionTask
 */
export interface ResMinionTask {
    /**
     * Average duration of the task in milliseconds.
     * @type {number}
     * @memberof ResMinionTask
     */
    avgDuration: number;
    /**
     * Maximum duration of the task in milliseconds.
     * @type {number}
     * @memberof ResMinionTask
     */
    maxDuration: number;
    /**
     * Average difference between the configured task interval and the last global task execution in milliseconds.
     * @type {number}
     * @memberof ResMinionTask
     */
    avgIntervalDiff: number;
    /**
     * Maximum difference between the configured task interval and the last global task execution in milliseconds.
     * @type {number}
     * @memberof ResMinionTask
     */
    maxIntervalDiff: number;
    /**
     * Execution interval of this task type in milliseconds.
     * @type {number}
     * @memberof ResMinionTask
     */
    interval: number;
    /**
     * Timestamp of the latest task completion.
     * @type {string}
     * @memberof ResMinionTask
     */
    latest: string;
    /**
     * The number of aggregated items.
     * @type {number}
     * @memberof ResMinionTask
     */
    count: number;
}
/**
 * Definition of a ShapeDiver model.
 * @export
 * @interface ResModel
 */
export interface ResModel {
    /**
     * List of allowed Grasshopper libraries.
     * @type {Array<string>}
     * @memberof ResModel
     */
    allowed_libraries?: Array<string>;
    /**
     * Link to view the model on the ShapeDiver Platform.
     * @type {string}
     * @memberof ResModel
     */
    backlinkurl?: string;
    /**
     * Link to continue the checking process of the model on the ShapeDiver Platform.
     * @type {string}
     * @memberof ResModel
     */
    checkurl?: string;
    /**
     * Timestamp of creation of the model.
     * @type {string}
     * @memberof ResModel
     */
    createdate?: string;
    /**
     * ID of the Grasshopper document.
     * @type {string}
     * @memberof ResModel
     */
    documentid?: string;
    /**
     * Original name of the model's grasshopper file.
     * @type {string}
     * @memberof ResModel
     */
    filename?: string;
    /**
     * ID of the model.
     * @type {string}
     * @memberof ResModel
     */
    id: string;
    /**
     * Optional second ID of the model. This value can be unset via an empty string.
     * @type {string}
     * @memberof ResModel
     */
    id2?: string;
    /**
     * Optional message, used in case the model was denied.
     * @type {string}
     * @memberof ResModel
     */
    msg?: string;
    /**
     * Model name.
     * @type {string}
     * @memberof ResModel
     */
    name?: string;
    /**
     * Organization ID of the user that owns the model.
     * @type {string}
     * @memberof ResModel
     */
    org_id?: string;
    /**
     * 
     * @type {ResModelStatus}
     * @memberof ResModel
     */
    stat: ResModelStatus;
    /**
     * ShapeDiver User ID of the model owner.
     * @type {string}
     * @memberof ResModel
     */
    user_id?: string;
    /**
     * The webhook-url for updating the platform backend about model status changes.
     * @type {string}
     * @memberof ResModel
     */
    webhook_url?: string;
    /**
     * The webhook-token for authentication used by the webhook-url.
     * @type {string}
     * @memberof ResModel
     */
    webhook_token?: string;
}


/**
 * 
 * @export
 * @interface ResModelBlockingReasons
 */
export interface ResModelBlockingReasons {
    /**
     * The model owner's credit limit has been exceeded.
     * @type {boolean}
     * @memberof ResModelBlockingReasons
     */
    creditLimit: boolean;
    /**
     * The model has been blocked explicitly by its owner.
     * @type {boolean}
     * @memberof ResModelBlockingReasons
     */
    owner: boolean;
    /**
     * The model owner has been restricted from accessing this backend system
     * @type {boolean}
     * @memberof ResModelBlockingReasons
     */
    backendPermission: boolean;
    /**
     * The model uses a Grasshopper plugin that is not allowed for the owner.
     * @type {boolean}
     * @memberof ResModelBlockingReasons
     */
    pluginPermission: boolean;
}
/**
 * Information about a model cleanup process.
 * @export
 * @interface ResModelCleanupProcess
 */
export interface ResModelCleanupProcess {
    /**
     * Type of the model cleanup process.
     * @type {ResModelCleanupProcessType}
     * @memberof ResModelCleanupProcess
     */
    type: ResModelCleanupProcessType;
    /**
     * The timestamp when the deletion job has been enqueued.
     * @type {string}
     * @memberof ResModelCleanupProcess
     */
    timestamp_enqueued: string;
    /**
     * The total number of items of this type that are going to be deleted.
     * @type {number}
     * @memberof ResModelCleanupProcess
     */
    total?: number;
    /**
     * The number of already deleted items of this type.
     * @type {number}
     * @memberof ResModelCleanupProcess
     */
    deleted?: number;
}



/**
 * Model cleanup process types.
 * @export
 */
export const ResModelCleanupProcessType = {
    DELETE_EXPORT_VERSION: 'delete_export_version',
    DELETE_MODEL_TEXTURE: 'delete_model_texture',
    DELETE_OUTPUT_VERSION: 'delete_output_version'
} as const;
export type ResModelCleanupProcessType = typeof ResModelCleanupProcessType[keyof typeof ResModelCleanupProcessType];

/**
 * Components of a model computation request.
 * @export
 * @interface ResModelComputation
 */
export interface ResModelComputation {
    /**
     * ID of the model.
     * @type {string}
     * @memberof ResModelComputation
     */
    id: string;
    /**
     * Numeric timestamp in format `YYYYMMDDHHMMSSMMM`.
     * 
     * Deprecated: Use `timestamp_str` instead.
     * @type {number}
     * @memberof ResModelComputation
     * @deprecated
     */
    timestamp: number;
    /**
     * Timestamp.
     * @type {string}
     * @memberof ResModelComputation
     */
    timestamp_str: string;
    /**
     * The ID of the compute request that was processed.
     * @type {string}
     * @memberof ResModelComputation
     */
    compute_request_id: string;
    /**
     * Requested export versions.
     * @type {{ [key: string]: string; }}
     * @memberof ResModelComputation
     */
    exports: { [key: string]: string; };
    /**
     * Requested output versions.
     * @type {{ [key: string]: string; }}
     * @memberof ResModelComputation
     */
    outputs: { [key: string]: string; };
    /**
     * Parameter values.
     * @type {object}
     * @memberof ResModelComputation
     */
    params: object;
    /**
     * The stats of the computation request.
     * @type {ResModelComputationStats}
     * @memberof ResModelComputation
     */
    stats: ResModelComputationStats;
    /**
     * Result of processing request.
     * @type {ResComputationStatus}
     * @memberof ResModelComputation
     */
    status: ResComputationStatus;
    /**
     * Timestamp when the computation request was finished.
     * @type {string}
     * @memberof ResModelComputation
     */
    timestamp_fin: string;
    /**
     * Timestamp when the work request was filed.
     * @type {string}
     * @memberof ResModelComputation
     */
    timestamp_req: string;
    /**
     * Timestamp when the computation request was filed.
     * @type {string}
     * @memberof ResModelComputation
     */
    timestamp_req_iso: string;
    /**
     * Timestamp when the computation request was picked up.
     * @type {string}
     * @memberof ResModelComputation
     */
    timestamp_resp: string;
    /**
     * Message containing information about the computation process.
     * @type {string}
     * @memberof ResModelComputation
     */
    msg?: string;
    /**
     * Model's limits at the time of the computation process.
     * @type {ResComputationLimits}
     * @memberof ResModelComputation
     */
    limit?: ResComputationLimits;
    /**
     * The number of credits that are charged for this computation.
     * @type {number}
     * @memberof ResModelComputation
     */
    credits?: number;
}


/**
 * Stats of a computation request.
 * @export
 * @interface ResModelComputationStats
 */
export interface ResModelComputationStats {
    /**
     * Total size in bytes of the uncompressed resulting assets.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    size_assets?: number;
    /**
     * Total size in bytes of the (potentially compressed) assets uploaded to storage.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    size_assets_storage?: number;
    /**
     * The number of milliseconds it took to answer the request.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_completion: number;
    /**
     * The number of milliseconds it took to download the model from storage. `0` in case model was already downloaded to the instance.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_model_download: number;
    /**
     * The number of milliseconds it took to  load (open) the model. `0` in case model was
     * already loaded.
     * 
     * Note: Does not include time for script compilation and first computation.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_model_open: number;
    /**
     * The number of milliseconds it took to process the request.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_processing: number;
    /**
     * The number of milliseconds it took to carry out checks that are done before loading the model.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_check_stored: number;
    /**
     * The number of milliseconds it took to carry out check that are done after loading the model.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_check_loaded: number;
    /**
     * The number of milliseconds it took to upload assets to storage.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_storage?: number;
    /**
     * The number of milliseconds for Grasshopper solver.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_solver: number;
    /**
     * The number of milliseconds it took to collect output and export data after computation.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_solver_collect?: number;
    /**
     * The number of milliseconds it took to download and load the model and setting parameters, and to compute the solution.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_solver_ext: number;
    /**
     * The number of milliseconds the request was waiting before being processed.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_wait: number;
    /**
     * The number of milliseconds it took to store the results of the request in the cache.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_cache_outputs?: number;
    /**
     * Information about model computations.
     * @type {ResComputationComponents}
     * @memberof ResModelComputationStats
     */
    model?: ResComputationComponents;
    /**
     * The number of milliseconds the CPU was used to carry out checks which are done before loading the model.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    cpu_time_check_stored?: number;
    /**
     * The number of milliseconds the CPU was used to carry out checks which are done after loading the model.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    cpu_time_check_loaded?: number;
    /**
     * The number of milliseconds the CPU was used to upload assets to storage.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    cpu_time_storage?: number;
    /**
     * The number of milliseconds the CPU was used to download the model from storage.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    cpu_time_model_download?: number;
    /**
     * The number of milliseconds the CPU was used to  load (open) the model. `0` in case model was already loaded.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    cpu_time_model_open?: number;
    /**
     * The number of milliseconds the CPU was used for Grasshopper solver.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    cpu_time_solver?: number;
    /**
     * The number of milliseconds the CPU was used to collect output and export data after computation.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    cpu_time_solver_collect?: number;
    /**
     * The number of milliseconds the CPU was used to download and load the model and setting parameters, and to compute the solution.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    cpu_time_solver_ext?: number;
    /**
     * The number of milliseconds the CPU was used to store the results of the request in the cache.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    cpu_time_cache_outputs?: number;
    /**
     * The number of milliseconds it took to prepare the model after loading it. As an example, preparation includes compilation of scripts.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    time_model_prepare?: number;
    /**
     * The number of milliseconds the CPU was used to prepare the model after loading it. As an example, preparation includes compilation of scripts.
     * @type {number}
     * @memberof ResModelComputationStats
     */
    cpu_time_model_prepare?: number;
}
/**
 * Aggregated credit metrics for a model.
 * @export
 * @interface ResModelCreditMetric
 */
export interface ResModelCreditMetric {
    /**
     * Either an extended date-time or a 'merged'-specifier.
     * @type {string}
     * @memberof ResModelCreditMetric
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     * @type {boolean}
     * @memberof ResModelCreditMetric
     */
    isCompilationDone: boolean;
    /**
     * 
     * @type {ResArCreditMetric}
     * @memberof ResModelCreditMetric
     */
    ar: ResArCreditMetric;
    /**
     * 
     * @type {ResLoadingCreditMetric}
     * @memberof ResModelCreditMetric
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     * @type {ResLimitedCreditMetric}
     * @memberof ResModelCreditMetric
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     * @type {ResDefaultCreditMetric}
     * @memberof ResModelCreditMetric
     */
    _default: ResDefaultCreditMetric;
    /**
     * Requested model ID.
     * @type {string}
     * @memberof ResModelCreditMetric
     */
    modelId: string;
    /**
     * This property is never set.
     * @type {boolean}
     * @memberof ResModelCreditMetric
     * @deprecated
     */
    userId?: boolean | null;
    /**
     * This property is never set.
     * @type {boolean}
     * @memberof ResModelCreditMetric
     * @deprecated
     */
    orgId?: boolean | null;
}
/**
 * 
 * @export
 * @interface ResModelList
 */
export interface ResModelList {
    /**
     * A directory of file objects.
     * @type {Array<ResFileInfo>}
     * @memberof ResModelList
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     * @type {Array<ResSdtfInfo>}
     * @memberof ResModelList
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     * @type {Array<ResModel>}
     * @memberof ResModelList
     */
    model: Array<ResModel>;
    /**
     * A directory of Model-States.
     * @type {Array<ResModelStateInfo>}
     * @memberof ResModelList
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     * @type {Array<ResOutput>}
     * @memberof ResModelList
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     * @type {Array<ResExport>}
     * @memberof ResModelList
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
     * @type {Array<ResTexture>}
     * @memberof ResModelList
     */
    texture?: Array<ResTexture>;
}
/**
 * Aggregated credit metrics for a model-organization.
 * @export
 * @interface ResModelOrganizationCreditMetric
 */
export interface ResModelOrganizationCreditMetric {
    /**
     * Either an extended date-time or a 'merged'-specifier.
     * @type {string}
     * @memberof ResModelOrganizationCreditMetric
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     * @type {boolean}
     * @memberof ResModelOrganizationCreditMetric
     */
    isCompilationDone: boolean;
    /**
     * 
     * @type {ResArCreditMetric}
     * @memberof ResModelOrganizationCreditMetric
     */
    ar: ResArCreditMetric;
    /**
     * 
     * @type {ResLoadingCreditMetric}
     * @memberof ResModelOrganizationCreditMetric
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     * @type {ResLimitedCreditMetric}
     * @memberof ResModelOrganizationCreditMetric
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     * @type {ResDefaultCreditMetric}
     * @memberof ResModelOrganizationCreditMetric
     */
    _default: ResDefaultCreditMetric;
    /**
     * Requested model ID.
     * @type {string}
     * @memberof ResModelOrganizationCreditMetric
     */
    modelId: string;
    /**
     * Requested organization ID.
     * @type {string}
     * @memberof ResModelOrganizationCreditMetric
     */
    orgId: string;
}
/**
 * 
 * @export
 * @interface ResModelSettings
 */
export interface ResModelSettings {
    /**
     * Allows the usage of the CDN for fast content distribution.
     * @type {boolean}
     * @memberof ResModelSettings
     */
    use_cdn?: boolean;
    /**
     * Indicates if the model supports CDN-based asset URLs.
     * @type {boolean}
     * @memberof ResModelSettings
     */
    cdn_supported?: boolean;
    /**
     * 
     * @type {ResModelBlockingReasons}
     * @memberof ResModelSettings
     */
    blockingReasons?: ResModelBlockingReasons;
}
/**
 * Definition of a Model-State.
 * @export
 * @interface ResModelState
 */
export interface ResModelState {
    /**
     * A directory of parameter IDs and values.
     * @type {{ [key: string]: ResParameterValue; }}
     * @memberof ResModelState
     */
    parameters: { [key: string]: ResParameterValue; };
    /**
     * Optional untyped data that holds additional information.
     * @type {{ [key: string]: any; }}
     * @memberof ResModelState
     */
    data?: { [key: string]: any; };
    /**
     * ID of the Model-State.
     * @type {string}
     * @memberof ResModelState
     */
    id: string;
    /**
     * ID of the ShapeDiver model.
     * @type {string}
     * @memberof ResModelState
     */
    modelId: string;
    /**
     * Timestamp of creation of the Model-State.
     * @type {string}
     * @memberof ResModelState
     */
    createdate: string;
    /**
     * The URL of the Model-State image.
     * @type {string}
     * @memberof ResModelState
     */
    imageUrl?: string;
}
/**
 * Model-State image asset.
 * @export
 * @interface ResModelStateAsset
 */
export interface ResModelStateAsset {
    /**
     * A directory of parameter-IDs and asset-definitions.
     * @type {{ [key: string]: ResAssetDefinition; }}
     * @memberof ResModelStateAsset
     */
    file?: { [key: string]: ResAssetDefinition; };
    /**
     * 
     * @type {Array<ResAssetDefinition>}
     * @memberof ResModelStateAsset
     */
    sdtf?: Array<ResAssetDefinition>;
    /**
     * The asset-definition of a Model-State image.
     * @type {ResAssetDefinition}
     * @memberof ResModelStateAsset
     */
    modelState: ResAssetDefinition;
}
/**
 * Parameter and additional data of a Model-State.
 * @export
 * @interface ResModelStateData
 */
export interface ResModelStateData {
    /**
     * A directory of parameter IDs and values.
     * @type {{ [key: string]: ResParameterValue; }}
     * @memberof ResModelStateData
     */
    parameters: { [key: string]: ResParameterValue; };
    /**
     * Optional untyped data that holds additional information.
     * @type {{ [key: string]: any; }}
     * @memberof ResModelStateData
     */
    data?: { [key: string]: any; };
}
/**
 * Basic information about a Model-State.
 * @export
 * @interface ResModelStateInfo
 */
export interface ResModelStateInfo {
    /**
     * ID of the Model-State.
     * @type {string}
     * @memberof ResModelStateInfo
     */
    id: string;
    /**
     * A directory of parameter IDs and values.
     * @type {{ [key: string]: ResParameterValue; }}
     * @memberof ResModelStateInfo
     */
    parameters: { [key: string]: ResParameterValue; };
    /**
     * Indicates whether the Model-State includes an image.
     * @type {boolean}
     * @memberof ResModelStateInfo
     */
    hasImage: boolean;
    /**
     * Indicates whether the Model-State includes a glTF asset.
     * @type {boolean}
     * @memberof ResModelStateInfo
     */
    hasGltf: boolean;
    /**
     * Indicates whether the Model-State includes a USDZ asset.
     * @type {boolean}
     * @memberof ResModelStateInfo
     */
    hasUsdz: boolean;
}
/**
 * 
 * @export
 * @interface ResModelStateList
 */
export interface ResModelStateList {
    /**
     * A directory of file objects.
     * @type {Array<ResFileInfo>}
     * @memberof ResModelStateList
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     * @type {Array<ResSdtfInfo>}
     * @memberof ResModelStateList
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     * @type {Array<ResModel>}
     * @memberof ResModelStateList
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     * @type {Array<ResModelStateInfo>}
     * @memberof ResModelStateList
     */
    modelState: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     * @type {Array<ResOutput>}
     * @memberof ResModelStateList
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     * @type {Array<ResExport>}
     * @memberof ResModelStateList
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
     * @type {Array<ResTexture>}
     * @memberof ResModelStateList
     */
    texture?: Array<ResTexture>;
}
/**
 * @type ResModelStateOrData
 * 
 * @export
 */
export type ResModelStateOrData = ResModelState | ResModelStateData;

/**
 * Status of the model.
 * @export
 */
export const ResModelStatus = {
    UNKNOWN: 'unknown',
    NOT_UPLOADED: 'not_uploaded',
    UPLOADED: 'uploaded',
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    DENIED: 'denied',
    DELETED: 'deleted'
} as const;
export type ResModelStatus = typeof ResModelStatus[keyof typeof ResModelStatus];

/**
 * Aggregated credit metrics for a model-user.
 * @export
 * @interface ResModelUserCreditMetric
 */
export interface ResModelUserCreditMetric {
    /**
     * Either an extended date-time or a 'merged'-specifier.
     * @type {string}
     * @memberof ResModelUserCreditMetric
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     * @type {boolean}
     * @memberof ResModelUserCreditMetric
     */
    isCompilationDone: boolean;
    /**
     * 
     * @type {ResArCreditMetric}
     * @memberof ResModelUserCreditMetric
     */
    ar: ResArCreditMetric;
    /**
     * 
     * @type {ResLoadingCreditMetric}
     * @memberof ResModelUserCreditMetric
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     * @type {ResLimitedCreditMetric}
     * @memberof ResModelUserCreditMetric
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     * @type {ResDefaultCreditMetric}
     * @memberof ResModelUserCreditMetric
     */
    _default: ResDefaultCreditMetric;
    /**
     * Requested model ID.
     * @type {string}
     * @memberof ResModelUserCreditMetric
     */
    modelId: string;
    /**
     * Requested user ID.
     * @type {string}
     * @memberof ResModelUserCreditMetric
     */
    userId: string;
}
/**
 * Aggregated credit metrics for a organization.
 * @export
 * @interface ResOrganizationCreditMetric
 */
export interface ResOrganizationCreditMetric {
    /**
     * Either an extended date-time or a 'merged'-specifier.
     * @type {string}
     * @memberof ResOrganizationCreditMetric
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     * @type {boolean}
     * @memberof ResOrganizationCreditMetric
     */
    isCompilationDone: boolean;
    /**
     * 
     * @type {ResArCreditMetric}
     * @memberof ResOrganizationCreditMetric
     */
    ar: ResArCreditMetric;
    /**
     * 
     * @type {ResLoadingCreditMetric}
     * @memberof ResOrganizationCreditMetric
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     * @type {ResLimitedCreditMetric}
     * @memberof ResOrganizationCreditMetric
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     * @type {ResDefaultCreditMetric}
     * @memberof ResOrganizationCreditMetric
     */
    _default: ResDefaultCreditMetric;
    /**
     * This property is never set.
     * @type {boolean}
     * @memberof ResOrganizationCreditMetric
     * @deprecated
     */
    modelId?: boolean | null;
    /**
     * Requested organization ID.
     * @type {string}
     * @memberof ResOrganizationCreditMetric
     */
    orgId: string;
}
/**
 * Output definition WITH results as exposed on the API.
 * @export
 * @interface ResOutput
 */
export interface ResOutput {
    /**
     * ID of the output, dependent on model ID, and therefore changing each time a model gets uploaded.
     * @type {string}
     * @memberof ResOutput
     */
    id: string;
    /**
     * Constant ID of the output, not dependent on model ID, and therefore NOT changing each time a model gets uploaded. Might be undefined because this property was introduced in summer 2020 and does not exist for outputs of older models.
     * @type {string}
     * @memberof ResOutput
     */
    uid?: string;
    /**
     * Name of the output.
     * @type {string}
     * @memberof ResOutput
     */
    name: string;
    /**
     * Optional ID of the output holding material information for this output.
     * @type {string}
     * @memberof ResOutput
     */
    material?: string;
    /**
     * Information about which chunks exist in the asset/sdTF.
     * @type {Array<ResOutputChunk>}
     * @memberof ResOutput
     */
    chunks?: Array<ResOutputChunk>;
    /**
     * List of IDs of parameters influencing this output.
     * @type {Array<string>}
     * @memberof ResOutput
     */
    dependency: Array<string>;
    /**
     * Group information of an output definition.
     * @type {CommonsGroup}
     * @memberof ResOutput
     */
    group?: CommonsGroup;
    /**
     * Ordering of the output in client applications.
     * @type {number}
     * @memberof ResOutput
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     * @type {string}
     * @memberof ResOutput
     */
    tooltip?: string;
    /**
     * Parameter name to display instead of `name`.
     * @type {string}
     * @memberof ResOutput
     */
    displayname?: string;
    /**
     * Controls whether the parameter should be hidden in the UI.
     * @type {boolean}
     * @memberof ResOutput
     */
    hidden: boolean;
    /**
     * Type-specific ID of the output. In case of outputs defined by a single component, this corresponds to the component’s uuid.
     * @type {string}
     * @memberof ResOutput
     */
    typeId?: string;
    /**
     * Type-specific name of the output. In case of outputs defined by a single component, this corresponds to the component’s name (NOT its nickname).
     * @type {string}
     * @memberof ResOutput
     */
    typeName?: string;
    /**
     * A unique identifier for the particular version of the output. This is a hash code which is based on the parameter values that were used to compute the resulting data. The hash code only depends on the values of the parameters which may theoretically influence the results of the output. As an example, parameters which are in no way connected to the output component in Grasshopper are not considered.
     * @type {string}
     * @memberof ResOutput
     */
    version: string;
    /**
     * The delay in milliseconds after which a cache request shall be sent to check again
     * for this output version. This property is used ONLY if the output version has not
     * been computed yet.
     * 
     * Note that the existence of this property does not necessarily imply the presence of
     * an active or queued computation for the respective output version.
     * @type {number}
     * @memberof ResOutput
     */
    delay?: number;
    /**
     * Result parts. In case this array does not exist, this means that the workers have not finished computation for this output version.
     * @type {Array<ResOutputContent>}
     * @memberof ResOutput
     */
    content?: Array<ResOutputContent>;
    /**
     * Optional bounding box, minimum corner.
     * @type {Array<number>}
     * @memberof ResOutput
     */
    bbmin?: Array<number>;
    /**
     * Optional bounding box, maximum corner.
     * @type {Array<number>}
     * @memberof ResOutput
     */
    bbmax?: Array<number>;
    /**
     * In case computation of the export version (temporarily) failed. Contains a message explaining what went wrong.
     * @type {string}
     * @memberof ResOutput
     */
    msg?: string;
    /**
     * Status of the computation which resulted in the output version.
     * @type {ResComputationStatus}
     * @memberof ResOutput
     */
    status_computation?: ResComputationStatus;
    /**
     * Status of collecting results for the output version.
     * @type {ResComputationStatus}
     * @memberof ResOutput
     */
    status_collect?: ResComputationStatus;
}


/**
 * Represents a collection of nodes where to start enumerating the content of the sdTF file (entry points).
 * @export
 * @interface ResOutputChunk
 */
export interface ResOutputChunk {
    /**
     * ID of the chunk.
     * @type {string}
     * @memberof ResOutputChunk
     */
    id: string;
    /**
     * Name of the chunk.
     * @type {string}
     * @memberof ResOutputChunk
     */
    name: string;
    /**
     * Indicates what type of data the data item holds.
     * @type {string}
     * @memberof ResOutputChunk
     */
    typeHint: string;
    /**
     * Description that is shown as a tooltip in the clients.
     * @type {string}
     * @memberof ResOutputChunk
     */
    tooltip?: string;
    /**
     * Custom name to display instead of `name`. Empty string if not set.
     * @type {string}
     * @memberof ResOutputChunk
     */
    displayname: string;
    /**
     * Controls whether the chunk should be hidden in the UI.
     * @type {boolean}
     * @memberof ResOutputChunk
     */
    hidden: boolean;
}
/**
 * An item of the `content` array for outputs.
 * @export
 * @interface ResOutputContent
 */
export interface ResOutputContent {
    /**
     * Optional link to asset.
     * @type {string}
     * @memberof ResOutputContent
     */
    href?: string;
    /**
     * Size in bytes for parts of type `asset`.
     * @type {number}
     * @memberof ResOutputContent
     */
    size?: number;
    /**
     * Optionally used for type `data`.
     * @type {string}
     * @memberof ResOutputContent
     */
    name?: string;
    /**
     * Transformations to be applied in case of type `external` or `asset`.
     * @type {Array<Array<number>>}
     * @memberof ResOutputContent
     */
    transformations?: Array<Array<number>>;
    /**
     * Format of part, used by all types of parts.
     * * File ending for parts of type `asset`.
     * * `material` (data contains a material definition).
     * * `data` (data contains arbitrary data).
     * * `external` (href or storage information that refer to an external asset).
     * @type {string}
     * @memberof ResOutputContent
     */
    format: string;
    /**
     * This was used by legacy `transform_content_array` in case of an error in getting texture URLs.
     * @type {string}
     * @memberof ResOutputContent
     */
    msg?: string;
    /**
     * Used for types `material` and `data`.
     * @type {any}
     * @memberof ResOutputContent
     */
    data?: any | null;
    /**
     * Optional Content-Type for parts of type `asset`.
     * @type {string}
     * @memberof ResOutputContent
     */
    contentType?: string;
}
/**
 * Output definition WITHOUT results as exposed on the API.
 * @export
 * @interface ResOutputDefinition
 */
export interface ResOutputDefinition {
    /**
     * ID of the output, dependent on model ID, and therefore changing each time a model gets uploaded.
     * @type {string}
     * @memberof ResOutputDefinition
     */
    id: string;
    /**
     * Constant ID of the output, not dependent on model ID, and therefore NOT changing each time a model gets uploaded. Might be undefined because this property was introduced in summer 2020 and does not exist for outputs of older models.
     * @type {string}
     * @memberof ResOutputDefinition
     */
    uid?: string;
    /**
     * Name of the output.
     * @type {string}
     * @memberof ResOutputDefinition
     */
    name: string;
    /**
     * Optional ID of the output holding material information for this output.
     * @type {string}
     * @memberof ResOutputDefinition
     */
    material?: string;
    /**
     * Information about which chunks exist in the asset/sdTF.
     * @type {Array<ResOutputChunk>}
     * @memberof ResOutputDefinition
     */
    chunks?: Array<ResOutputChunk>;
    /**
     * List of IDs of parameters influencing this output.
     * @type {Array<string>}
     * @memberof ResOutputDefinition
     */
    dependency: Array<string>;
    /**
     * Group information of an output definition.
     * @type {CommonsGroup}
     * @memberof ResOutputDefinition
     */
    group?: CommonsGroup;
    /**
     * Ordering of the output in client applications.
     * @type {number}
     * @memberof ResOutputDefinition
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     * @type {string}
     * @memberof ResOutputDefinition
     */
    tooltip?: string;
    /**
     * Parameter name to display instead of `name`.
     * @type {string}
     * @memberof ResOutputDefinition
     */
    displayname?: string;
    /**
     * Controls whether the parameter should be hidden in the UI.
     * @type {boolean}
     * @memberof ResOutputDefinition
     */
    hidden: boolean;
    /**
     * Type-specific ID of the output. In case of outputs defined by a single component, this corresponds to the component’s uuid.
     * @type {string}
     * @memberof ResOutputDefinition
     */
    typeId?: string;
    /**
     * Type-specific name of the output. In case of outputs defined by a single component, this corresponds to the component’s name (NOT its nickname).
     * @type {string}
     * @memberof ResOutputDefinition
     */
    typeName?: string;
    /**
     * This property is never set.
     * @type {boolean}
     * @memberof ResOutputDefinition
     * @deprecated
     */
    version?: boolean | null;
}
/**
 * 
 * @export
 * @interface ResOutputList
 */
export interface ResOutputList {
    /**
     * A directory of file objects.
     * @type {Array<ResFileInfo>}
     * @memberof ResOutputList
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     * @type {Array<ResSdtfInfo>}
     * @memberof ResOutputList
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     * @type {Array<ResModel>}
     * @memberof ResOutputList
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     * @type {Array<ResModelStateInfo>}
     * @memberof ResOutputList
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     * @type {Array<ResOutput>}
     * @memberof ResOutputList
     */
    output: Array<ResOutput>;
    /**
     * A directory of export versions.
     * @type {Array<ResExport>}
     * @memberof ResOutputList
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
     * @type {Array<ResTexture>}
     * @memberof ResOutputList
     */
    texture?: Array<ResTexture>;
}
/**
 * @type ResOutputOrDefinition
 * Either a full output or it's definition.
 * @export
 */
export type ResOutputOrDefinition = ResOutput | ResOutputDefinition;
/**
 * Pagination component.
 * @export
 * @interface ResPagination
 */
export interface ResPagination {
    /**
     * The query limit that has been used in the request.
     * @type {number}
     * @memberof ResPagination
     */
    limit: number;
    /**
     * The offset that can be used in the next request to query the remaining items. This property is missing when all items have been processed.
     * @type {string}
     * @memberof ResPagination
     */
    next_offset?: string;
}
/**
 * Definition of a parameter of a ShapeDiver Model.
 * @export
 * @interface ResParameter
 */
export interface ResParameter {
    /**
     * Unique ID of parameter, stays constant each time a model gets uploaded.
     * @type {string}
     * @memberof ResParameter
     */
    id: string;
    /**
     * Choice of parameter values for types `STRINGLIST`.
     * @type {Array<string>}
     * @memberof ResParameter
     */
    choices?: Array<string>;
    /**
     * Number of decimal places for numeric types.
     * @type {number}
     * @memberof ResParameter
     */
    decimalplaces?: number;
    /**
     * Default value of parameter, stringified.
     * @type {string}
     * @memberof ResParameter
     */
    defval?: string;
    /**
     * Optional expression to be applied to value for visualisation.
     * @type {string}
     * @memberof ResParameter
     */
    expression?: string;
    /**
     * List of file formats (content types) supported, used for type `FILE`.
     * @type {Array<string>}
     * @memberof ResParameter
     */
    format?: Array<string>;
    /**
     * Minimum value (stringified) for numeric types.
     * @type {number}
     * @memberof ResParameter
     */
    min?: number;
    /**
     * Maximum:
     * * value (stringified) for numeric types.
     * * string length for type `STRING`.
     * * file size allowed (stringified) for type FILE.
     * @type {number}
     * @memberof ResParameter
     */
    max?: number;
    /**
     * Minimum `u` value for two dimensional domain parameters.
     * @type {number}
     * @memberof ResParameter
     */
    umin?: number;
    /**
     * Maximum `u` value for two dimensional domain parameters.
     * @type {number}
     * @memberof ResParameter
     */
    umax?: number;
    /**
     * Minimum `v` value for two dimensional domain parameters.
     * @type {number}
     * @memberof ResParameter
     */
    vmin?: number;
    /**
     * Maximum `v` value for two dimensional domain parameters.
     * @type {number}
     * @memberof ResParameter
     */
    vmax?: number;
    /**
     * Step size used for domain parameters.
     * @type {number}
     * @memberof ResParameter
     */
    interval?: number;
    /**
     * Name of the parameter.
     * @type {string}
     * @memberof ResParameter
     */
    name: string;
    /**
     * Type of parameter.
     * @type {ResParameterType}
     * @memberof ResParameter
     */
    type: ResParameterType;
    /**
     * Optional preferred visualization for parameters of type `FILE` and `STRINGLIST`.
     * @type {ResVisualizationType}
     * @memberof ResParameter
     */
    visualization?: ResVisualizationType;
    /**
     * Structure of a parameter.
     * @type {ResStructureType}
     * @memberof ResParameter
     */
    structure?: ResStructureType;
    /**
     * Group information of a parameter.
     * @type {CommonsGroup}
     * @memberof ResParameter
     */
    group?: CommonsGroup;
    /**
     * Technical hint for the UI implementation.
     * @type {string}
     * @memberof ResParameter
     */
    hint?: string;
    /**
     * Ordering of the parameter in client applications.
     * @type {number}
     * @memberof ResParameter
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     * @type {string}
     * @memberof ResParameter
     */
    tooltip?: string;
    /**
     * Parameter name to display instead of `name`.
     * @type {string}
     * @memberof ResParameter
     */
    displayname?: string;
    /**
     * Controls whether the parameter should be hidden in the UI.
     * @type {boolean}
     * @memberof ResParameter
     */
    hidden: boolean;
    /**
     * Holds parameter-type specific information.
     * @type {object}
     * @memberof ResParameter
     */
    settings?: object;
}



/**
 * Type of parameter.
 * 
 * All types starting with 's' are s-type parameters while the others are basic parameter
 * types.
 * @export
 */
export const ResParameterType = {
    S_BITMAP: 'sBitmap',
    S_BOOL: 'sBool',
    S_BOX: 'sBox',
    S_BREP: 'sBrep',
    S_CIRCLE: 'sCircle',
    S_COLOR: 'sColor',
    S_CURVE: 'sCurve',
    S_DOMAIN: 'sDomain',
    S_DOMAIN_2D: 'sDomain2D',
    S_INTEGER: 'sInteger',
    S_LINE: 'sLine',
    S_MESH: 'sMesh',
    S_NUMBER: 'sNumber',
    S_PLANE: 'sPlane',
    S_POINT: 'sPoint',
    S_RECTANGLE: 'sRectangle',
    S_STRING: 'sString',
    S_SUBDIV: 'sSubdiv',
    S_SURFACE: 'sSurface',
    S_TIME: 'sTime',
    S_VECTOR: 'sVector',
    BOOL: 'Bool',
    COLOR: 'Color',
    DRAWING: 'Drawing',
    EVEN: 'Even',
    FILE: 'File',
    FLOAT: 'Float',
    INT: 'Int',
    INTERACTION: 'Interaction',
    ODD: 'Odd',
    STRING: 'String',
    STRINGLIST: 'StringList',
    TIME: 'Time',
    UNKNOWN: 'unknown'
} as const;
export type ResParameterType = typeof ResParameterType[keyof typeof ResParameterType];

/**
 * @type ResParameterValue
 * The value of a single model parameter.
 * Supported parameter values are: * Basic parameter (`ResBasicParameter`) * S-type parameter (`ResStypeParameter`)
 * @export
 */
export type ResParameterValue = ResBasicParameter | ResStypeParameter;
/**
 * 
 * @export
 * @interface ResPartActions
 */
export interface ResPartActions {
    /**
     * Actions the client may take.
     * @type {Array<ResAction>}
     * @memberof ResPartActions
     */
    actions?: Array<ResAction>;
}
/**
 * 
 * @export
 * @interface ResPartAnalytics
 */
export interface ResPartAnalytics {
    /**
     * Analytics information.
     * @type {ResAnalytics}
     * @memberof ResPartAnalytics
     */
    analytics?: ResAnalytics;
}
/**
 * 
 * @export
 * @interface ResPartAuthorizationGroup
 */
export interface ResPartAuthorizationGroup {
    /**
     * The auth-group to use for ticked-based authentication.
     * @type {string}
     * @memberof ResPartAuthorizationGroup
     */
    auth_group?: string;
}
/**
 * 
 * @export
 * @interface ResPartCleanup
 */
export interface ResPartCleanup {
    /**
     * Model cleanup information.
     * @type {Array<ResModelCleanupProcess>}
     * @memberof ResPartCleanup
     */
    cleanup?: Array<ResModelCleanupProcess>;
}
/**
 * 
 * @export
 * @interface ResPartDecryptedTicket
 */
export interface ResPartDecryptedTicket {
    /**
     * Decrypted ticket details.
     * @type {ResTicket}
     * @memberof ResPartDecryptedTicket
     */
    decryptedTicket?: ResTicket;
}
/**
 * 
 * @export
 * @interface ResPartExports
 */
export interface ResPartExports {
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     * @type {{ [key: string]: ResExportOrDefinition; }}
     * @memberof ResPartExports
     */
    exports?: { [key: string]: ResExportOrDefinition; };
}
/**
 * 
 * @export
 * @interface ResPartFile
 */
export interface ResPartFile {
    /**
     * Links regarding the model file.
     * @type {ResFile}
     * @memberof ResPartFile
     */
    file?: ResFile;
}
/**
 * 
 * @export
 * @interface ResPartGltfUpload
 */
export interface ResPartGltfUpload {
    /**
     * glTF information.
     * @type {ResGltfUpload}
     * @memberof ResPartGltfUpload
     */
    gltf?: ResGltfUpload;
}
/**
 * 
 * @export
 * @interface ResPartMessage
 */
export interface ResPartMessage {
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResPartMessage
     */
    message?: string;
}
/**
 * 
 * @export
 * @interface ResPartModel
 */
export interface ResPartModel {
    /**
     * The definitions of a ShapeDiver model.
     * @type {ResModel}
     * @memberof ResPartModel
     */
    model?: ResModel;
}
/**
 * 
 * @export
 * @interface ResPartModelComputation
 */
export interface ResPartModelComputation {
    /**
     * Statistics about model computations.
     * @type {Array<ResModelComputation>}
     * @memberof ResPartModelComputation
     */
    computations?: Array<ResModelComputation>;
}
/**
 * 
 * @export
 * @interface ResPartModelState
 */
export interface ResPartModelState {
    /**
     * Model-State information.
     * @type {ResModelState}
     * @memberof ResPartModelState
     */
    modelState?: ResModelState;
}
/**
 * 
 * @export
 * @interface ResPartModelStateData
 */
export interface ResPartModelStateData {
    /**
     * Model-State information.
     * @type {ResModelStateData}
     * @memberof ResPartModelStateData
     */
    modelState?: ResModelStateData;
}
/**
 * 
 * @export
 * @interface ResPartOutputs
 */
export interface ResPartOutputs {
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     * @type {{ [key: string]: ResOutputOrDefinition; }}
     * @memberof ResPartOutputs
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
}
/**
 * 
 * @export
 * @interface ResPartPagination
 */
export interface ResPartPagination {
    /**
     * Pagination information.
     * @type {ResPagination}
     * @memberof ResPartPagination
     */
    pagination?: ResPagination;
}
/**
 * 
 * @export
 * @interface ResPartParameters
 */
export interface ResPartParameters {
    /**
     * Parameter definitions, not contained with every response. A directory of parameter-IDs and parameters.
     * @type {{ [key: string]: ResParameter; }}
     * @memberof ResPartParameters
     */
    parameters?: { [key: string]: ResParameter; };
}
/**
 * 
 * @export
 * @interface ResPartPlugins
 */
export interface ResPartPlugins {
    /**
     * 
     * @type {ResPlugins}
     * @memberof ResPartPlugins
     */
    plugins?: ResPlugins;
}
/**
 * 
 * @export
 * @interface ResPartSessionId
 */
export interface ResPartSessionId {
    /**
     * The ID of the created session.
     * @type {string}
     * @memberof ResPartSessionId
     */
    sessionId?: string;
}
/**
 * 
 * @export
 * @interface ResPartSetting
 */
export interface ResPartSetting {
    /**
     * Various settings.
     * @type {ResSettings}
     * @memberof ResPartSetting
     */
    setting?: ResSettings;
}
/**
 * 
 * @export
 * @interface ResPartStatistic
 */
export interface ResPartStatistic {
    /**
     * Statistics of a model.
     * @type {ResStatistic}
     * @memberof ResPartStatistic
     */
    statistic?: ResStatistic;
}
/**
 * 
 * @export
 * @interface ResPartTemplates
 */
export interface ResPartTemplates {
    /**
     * Request templates for actions.
     * @type {Array<ResTemplate>}
     * @memberof ResPartTemplates
     */
    templates?: Array<ResTemplate>;
}
/**
 * 
 * @export
 * @interface ResPartTicket
 */
export interface ResPartTicket {
    /**
     * The ticket to create a model session.
     * @type {string}
     * @memberof ResPartTicket
     */
    ticket?: string;
}
/**
 * 
 * @export
 * @interface ResPartVersion
 */
export interface ResPartVersion {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResPartVersion
     */
    version?: string;
}
/**
 * 
 * @export
 * @interface ResPartViewer
 */
export interface ResPartViewer {
    /**
     * Viewer specific data.
     * @type {ResViewer}
     * @memberof ResPartViewer
     */
    viewer?: ResViewer;
}
/**
 * 
 * @export
 * @interface ResPartViewerSettingsVersion
 */
export interface ResPartViewerSettingsVersion {
    /**
     * The current version of the viewer settings.
     * @type {string}
     * @memberof ResPartViewerSettingsVersion
     */
    viewerSettingsVersion?: string;
}
/**
 * 
 * @export
 * @interface ResPartWarnings
 */
export interface ResPartWarnings {
    /**
     * An array of warnings encountered during request processing. These warnings indicate potential issues or non-critical conditions but did not prevent the request from being successfully processed.
     * @type {Array<string>}
     * @memberof ResPartWarnings
     */
    warnings?: Array<string>;
}
/**
 * Information about Grasshopper plugins.
 * @export
 * @interface ResPlugins
 */
export interface ResPlugins {
    /**
     * Libraries used by the model.
     * @type {Array<ResPluginsLibrary>}
     * @memberof ResPlugins
     */
    libraries?: Array<ResPluginsLibrary>;
}
/**
 * Definition of a model library.
 * @export
 * @interface ResPluginsLibrary
 */
export interface ResPluginsLibrary {
    /**
     * Library ID.
     * @type {string}
     * @memberof ResPluginsLibrary
     */
    id: string;
    /**
     * Library version.
     * @type {string}
     * @memberof ResPluginsLibrary
     */
    version: string;
    /**
     * Library name.
     * @type {string}
     * @memberof ResPluginsLibrary
     */
    name: string;
    /**
     * Library author.
     * @type {string}
     * @memberof ResPluginsLibrary
     */
    author: string;
    /**
     * Assembly name (not present in Rhino 5).
     * @type {string}
     * @memberof ResPluginsLibrary
     */
    assemblyFullName?: string;
    /**
     * Assembly version (not present in Rhino 5).
     * @type {string}
     * @memberof ResPluginsLibrary
     */
    assemblyVersion?: string;
}
/**
 * Combined output and export requests.
 * @export
 * @interface ResRateLimitedCombinedMetric
 */
export interface ResRateLimitedCombinedMetric {
    /**
     * Number of combined output and export requests charged.
     * @type {number}
     * @memberof ResRateLimitedCombinedMetric
     */
    credits: number;
}
/**
 * Computations information.
 * @export
 * @interface ResRateLimitedComputationMetric
 */
export interface ResRateLimitedComputationMetric {
    /**
     * Number of computations.
     * @type {number}
     * @memberof ResRateLimitedComputationMetric
     */
    count: number;
    /**
     * Number of finished 10-second chunks charged.
     * @type {number}
     * @memberof ResRateLimitedComputationMetric
     */
    credits: number;
    /**
     * Total duration of computation time, in milliseconds.
     * @type {number}
     * @memberof ResRateLimitedComputationMetric
     */
    duration: number;
    /**
     * Count of computations per computation time expressed in started 10-second chunks.
     * @type {{ [key: string]: number; }}
     * @memberof ResRateLimitedComputationMetric
     */
    countPerChunks: { [key: string]: number; };
}
/**
 * Pure export requests.
 * @export
 * @interface ResRateLimitedExportMetric
 */
export interface ResRateLimitedExportMetric {
    /**
     * Number of pure export requests charged.
     * @type {number}
     * @memberof ResRateLimitedExportMetric
     */
    credits: number;
}
/**
 * Pure output requests.
 * @export
 * @interface ResRateLimitedOutputMetric
 */
export interface ResRateLimitedOutputMetric {
    /**
     * Number of pure output requests.
     * @type {number}
     * @memberof ResRateLimitedOutputMetric
     */
    count: number;
}
/**
 * Session information.
 * @export
 * @interface ResRateLimitedSessionMetric
 */
export interface ResRateLimitedSessionMetric {
    /**
     * Number of sessions.
     * @type {number}
     * @memberof ResRateLimitedSessionMetric
     */
    count: number;
    /**
     * Number of started 10-minute periods of sessions charged.
     * @type {number}
     * @memberof ResRateLimitedSessionMetric
     */
    credits: number;
    /**
     * The total duration of all sessions, in milliseconds.
     * @type {number}
     * @memberof ResRateLimitedSessionMetric
     */
    duration: number;
}
/**
 * Scale-in candidate system information.
 * @export
 * @interface ResScaleInCandidate
 */
export interface ResScaleInCandidate {
    /**
     * System information about the Geometry Minions.
     * @type {ResMinionInfo}
     * @memberof ResScaleInCandidate
     */
    minions?: ResMinionInfo;
    /**
     * System information about the Geometry Workers.
     * @type {ResWorkerInfo}
     * @memberof ResScaleInCandidate
     */
    workers?: ResWorkerInfo;
    /**
     * Scale-in candidate information for worker instances.
     * @type {ResWorkerScaleInCandidate}
     * @memberof ResScaleInCandidate
     */
    scaleInCandidate: ResWorkerScaleInCandidate;
}
/**
 * sdTF assets.
 * @export
 * @interface ResSdtfAsset
 */
export interface ResSdtfAsset {
    /**
     * A directory of parameter-IDs and asset-definitions.
     * @type {{ [key: string]: ResAssetDefinition; }}
     * @memberof ResSdtfAsset
     */
    file?: { [key: string]: ResAssetDefinition; };
    /**
     * 
     * @type {Array<ResAssetDefinition>}
     * @memberof ResSdtfAsset
     */
    sdtf: Array<ResAssetDefinition>;
    /**
     * The asset-definition of a Model-State image.
     * @type {ResAssetDefinition}
     * @memberof ResSdtfAsset
     */
    modelState?: ResAssetDefinition;
}
/**
 * Result part for the response to a list request for sdTF objects.
 * @export
 * @interface ResSdtfInfo
 */
export interface ResSdtfInfo {
    /**
     * ID of the sdTF.
     * @type {string}
     * @memberof ResSdtfInfo
     */
    id: string;
    /**
     * The namespace of the sdTF.
     * @type {string}
     * @memberof ResSdtfInfo
     */
    namespace: string;
    /**
     * The size of the sdTF in bytes.
     * @type {number}
     * @memberof ResSdtfInfo
     */
    size: number;
}
/**
 * 
 * @export
 * @interface ResSdtfList
 */
export interface ResSdtfList {
    /**
     * A directory of file objects.
     * @type {Array<ResFileInfo>}
     * @memberof ResSdtfList
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     * @type {Array<ResSdtfInfo>}
     * @memberof ResSdtfList
     */
    sdtf: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     * @type {Array<ResModel>}
     * @memberof ResSdtfList
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     * @type {Array<ResModelStateInfo>}
     * @memberof ResSdtfList
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     * @type {Array<ResOutput>}
     * @memberof ResSdtfList
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     * @type {Array<ResExport>}
     * @memberof ResSdtfList
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
     * @type {Array<ResTexture>}
     * @memberof ResSdtfList
     */
    texture?: Array<ResTexture>;
}
/**
 * Definition of settings.
 * @export
 * @interface ResSettings
 */
export interface ResSettings {
    /**
     * 
     * @type {ResAuthorizationSettings}
     * @memberof ResSettings
     */
    auth?: ResAuthorizationSettings;
    /**
     * 
     * @type {ResComputeSettings}
     * @memberof ResSettings
     */
    compute?: ResComputeSettings;
    /**
     * 
     * @type {ResModelSettings}
     * @memberof ResSettings
     */
    model?: ResModelSettings;
}
/**
 * Model statistic object.
 * @export
 * @interface ResStatistic
 */
export interface ResStatistic {
    /**
     * Cumulative time (msec) which has been spent for processing computation requests by the workers (pure computation time).
     * @type {number}
     * @memberof ResStatistic
     */
    comptime?: number;
    /**
     * Timestamp of last session created for the model.
     * @type {string}
     * @memberof ResStatistic
     */
    lastsession?: string;
    /**
     * Timestamp of last view of the model.
     * @type {string}
     * @memberof ResStatistic
     */
    lastview?: string;
    /**
     * Approximate memory usage of model on workers, in bytes.
     * @type {number}
     * @memberof ResStatistic
     */
    memUsage?: number;
    /**
     * Number of computations which have been carried out for the model by the workers so far.
     * @type {number}
     * @memberof ResStatistic
     */
    numcomp?: number;
    /**
     * Number of sessions which have been opened for the model so far.
     * @type {number}
     * @memberof ResStatistic
     */
    numsessions?: number;
    /**
     * Cumulative time (msec) which has been spent for processing computation requests by the workers (computation time plus overheads).
     * @type {number}
     * @memberof ResStatistic
     */
    requesttime?: number;
    /**
     * File size of the model file in bytes.
     * @type {number}
     * @memberof ResStatistic
     */
    size?: number;
}

/**
 * Structural information of a parameter.
 * @export
 */
export const ResStructureType = {
    ITEM: 'item',
    LIST: 'list',
    TREE: 'tree'
} as const;
export type ResStructureType = typeof ResStructureType[keyof typeof ResStructureType];

/**
 * Definition of the value to use for s-type parameters.
 * @export
 * @interface ResStypeParameter
 */
export interface ResStypeParameter {
    /**
     * Optional embedded value. If this is set the asset is ignored.
     * @type {string}
     * @memberof ResStypeParameter
     */
    value?: string;
    /**
     * 
     * @type {CommmonsParameterAsset}
     * @memberof ResStypeParameter
     */
    asset?: CommmonsParameterAsset;
}
/**
 * ShapeDiver API response of system-request.
 * @export
 * @interface ResSystem
 */
export interface ResSystem {
    /**
     * System information about the Geometry Minions.
     * @type {ResMinionInfo}
     * @memberof ResSystem
     */
    minions?: ResMinionInfo;
    /**
     * System information about the Geometry Workers.
     * @type {ResWorkerInfo}
     * @memberof ResSystem
     */
    workers?: ResWorkerInfo;
    /**
     * Scale-in candidate information for worker instances.
     * @type {ResWorkerScaleInCandidate}
     * @memberof ResSystem
     */
    scaleInCandidate?: ResWorkerScaleInCandidate;
}
/**
 * Aggregated credit metrics for a system.
 * @export
 * @interface ResSystemCreditMetric
 */
export interface ResSystemCreditMetric {
    /**
     * Either an extended date-time or a 'merged'-specifier.
     * @type {string}
     * @memberof ResSystemCreditMetric
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     * @type {boolean}
     * @memberof ResSystemCreditMetric
     */
    isCompilationDone: boolean;
    /**
     * 
     * @type {ResArCreditMetric}
     * @memberof ResSystemCreditMetric
     */
    ar: ResArCreditMetric;
    /**
     * 
     * @type {ResLoadingCreditMetric}
     * @memberof ResSystemCreditMetric
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     * @type {ResLimitedCreditMetric}
     * @memberof ResSystemCreditMetric
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     * @type {ResDefaultCreditMetric}
     * @memberof ResSystemCreditMetric
     */
    _default: ResDefaultCreditMetric;
    /**
     * Requested system.
     * @type {boolean}
     * @memberof ResSystemCreditMetric
     */
    system: boolean;
}
/**
 * Provides templates for actions.
 * @export
 * @interface ResTemplate
 */
export interface ResTemplate {
    /**
     * Name of the template, e.g. 'customize-request'.
     * @type {string}
     * @memberof ResTemplate
     */
    name: string;
    /**
     * Title of the template, e.g. 'Template for model customization request'.
     * @type {string}
     * @memberof ResTemplate
     */
    title: string;
    /**
     * Template for the request body.
     * @type {object}
     * @memberof ResTemplate
     */
    data: object;
}
/**
 * Information about a model texture.
 * @export
 * @interface ResTexture
 */
export interface ResTexture {
    /**
     * The ID of the ShapeDiver model.
     * @type {string}
     * @memberof ResTexture
     */
    modelId: string;
    /**
     * The texture ID.
     * @type {string}
     * @memberof ResTexture
     */
    textureId: string;
    /**
     * The original URL of the texture asset.
     * @type {string}
     * @memberof ResTexture
     */
    url?: string;
    /**
     * The width of the texture.
     * @type {number}
     * @memberof ResTexture
     */
    width?: number;
    /**
     * The height of the texture.
     * @type {number}
     * @memberof ResTexture
     */
    height?: number;
    /**
     * Is `true` when the texture has been cached, otherwise `false`.
     * @type {boolean}
     * @memberof ResTexture
     */
    isAssetAvailable: boolean;
}
/**
 * 
 * @export
 * @interface ResTextureList
 */
export interface ResTextureList {
    /**
     * A directory of file objects.
     * @type {Array<ResFileInfo>}
     * @memberof ResTextureList
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     * @type {Array<ResSdtfInfo>}
     * @memberof ResTextureList
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     * @type {Array<ResModel>}
     * @memberof ResTextureList
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     * @type {Array<ResModelStateInfo>}
     * @memberof ResTextureList
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     * @type {Array<ResOutput>}
     * @memberof ResTextureList
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     * @type {Array<ResExport>}
     * @memberof ResTextureList
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
     * @type {Array<ResTexture>}
     * @memberof ResTextureList
     */
    texture: Array<ResTexture>;
}
/**
 * 
 * @export
 * @interface ResTicket
 */
export interface ResTicket {
    /**
     * List of domains (origins) this ticket should be limited to; may be empty.
     * @type {Array<string>}
     * @memberof ResTicket
     */
    accessdomains: Array<string>;
    /**
     * Should this ticket provide access to model authoring (allows to change configuration)?
     * @type {boolean}
     * @memberof ResTicket
     */
    author: boolean;
    /**
     * Should this ticket allow public access (ignore the model's `accessdomains` property)?
     * @type {boolean}
     * @memberof ResTicket
     */
    pub: boolean;
    /**
     * The timestamp until which the ticket should be valid.
     * @type {string}
     * @memberof ResTicket
     */
    until: string;
    /**
     * Does this ticket identify the model via its secondary ID (model property `id2`)?
     * @type {boolean}
     * @memberof ResTicket
     */
    use_id2: boolean;
    /**
     * 
     * @type {ResTicketType}
     * @memberof ResTicket
     */
    type: ResTicketType;
    /**
     * Either the model's `id` or `id2` property, depending on the ticket property `use_id2`.
     * @type {string}
     * @memberof ResTicket
     */
    model_id: string;
}


/**
 * 
 * @export
 * @interface ResTicketAuthorization
 */
export interface ResTicketAuthorization {
    /**
     * List of domains (origins) this model is limited to (is ignored in case `model.pub` is true).
     * @type {Array<string>}
     * @memberof ResTicketAuthorization
     */
    accessdomains: Array<string>;
    /**
     * Should backend access to the model be allowed.
     * @type {boolean}
     * @memberof ResTicketAuthorization
     */
    backendaccess: boolean;
    /**
     * If this model allows public access (ignore `model.accessdomains`)?
     * @type {boolean}
     * @memberof ResTicketAuthorization
     */
    pub: boolean;
}

/**
 * The type of the ticket.
 * @export
 */
export const ResTicketType = {
    BACKEND: 'backend',
    NONE: ''
} as const;
export type ResTicketType = typeof ResTicketType[keyof typeof ResTicketType];

/**
 * 
 * @export
 * @interface ResTokenAuthorization
 */
export interface ResTokenAuthorization {
    /**
     * List of allowed auth-groups.
     * @type {Array<string>}
     * @memberof ResTokenAuthorization
     */
    auth_groups?: Array<string>;
    /**
     * Enforces iframe embedding instead of direct embedding.
     * @type {boolean}
     * @memberof ResTokenAuthorization
     */
    require_iframe?: boolean;
    /**
     * Enforces token-based authentication for this model.
     * @type {boolean}
     * @memberof ResTokenAuthorization
     */
    require_token?: boolean;
}
/**
 * 
 * @export
 * @interface ResUpdateExportDefinitions
 */
export interface ResUpdateExportDefinitions {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResUpdateExportDefinitions
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResUpdateModel
 */
export interface ResUpdateModel {
    /**
     * Links regarding the model file.
     * @type {ResFile}
     * @memberof ResUpdateModel
     */
    file: ResFile;
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResUpdateModel
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     * @type {ResModel}
     * @memberof ResUpdateModel
     */
    model: ResModel;
    /**
     * Various settings.
     * @type {ResSettings}
     * @memberof ResUpdateModel
     */
    setting: ResSettings;
    /**
     * Statistics of a model.
     * @type {ResStatistic}
     * @memberof ResUpdateModel
     */
    statistic: ResStatistic;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResUpdateModel
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResUpdateModelConfig
 */
export interface ResUpdateModelConfig {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResUpdateModelConfig
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResUpdateOutputDefinitions
 */
export interface ResUpdateOutputDefinitions {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResUpdateOutputDefinitions
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResUpdateParameterDefaultValues
 */
export interface ResUpdateParameterDefaultValues {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResUpdateParameterDefaultValues
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResUpdateParameterDefinitions
 */
export interface ResUpdateParameterDefinitions {
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResUpdateParameterDefinitions
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResUploadFile
 */
export interface ResUploadFile {
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResUploadFile
     */
    message?: string;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResUploadFile
     */
    version: string;
    /**
     * 
     * @type {ResFileAsset}
     * @memberof ResUploadFile
     */
    asset: ResFileAsset;
}
/**
 * 
 * @export
 * @interface ResUploadGltf
 */
export interface ResUploadGltf {
    /**
     * glTF information.
     * @type {ResGltfUpload}
     * @memberof ResUploadGltf
     */
    gltf: ResGltfUpload;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResUploadGltf
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResUploadSdtf
 */
export interface ResUploadSdtf {
    /**
     * Contains urgent information about the system.
     * @type {string}
     * @memberof ResUploadSdtf
     */
    message?: string;
    /**
     * Version of the Geometry Backend API.
     * @type {string}
     * @memberof ResUploadSdtf
     */
    version: string;
    /**
     * 
     * @type {ResSdtfAsset}
     * @memberof ResUploadSdtf
     */
    asset: ResSdtfAsset;
}
/**
 * Aggregated credit metrics for a user.
 * @export
 * @interface ResUserCreditMetric
 */
export interface ResUserCreditMetric {
    /**
     * Either an extended date-time or a 'merged'-specifier.
     * @type {string}
     * @memberof ResUserCreditMetric
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     * @type {boolean}
     * @memberof ResUserCreditMetric
     */
    isCompilationDone: boolean;
    /**
     * 
     * @type {ResArCreditMetric}
     * @memberof ResUserCreditMetric
     */
    ar: ResArCreditMetric;
    /**
     * 
     * @type {ResLoadingCreditMetric}
     * @memberof ResUserCreditMetric
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     * @type {ResLimitedCreditMetric}
     * @memberof ResUserCreditMetric
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     * @type {ResDefaultCreditMetric}
     * @memberof ResUserCreditMetric
     */
    _default: ResDefaultCreditMetric;
    /**
     * This property is never set.
     * @type {boolean}
     * @memberof ResUserCreditMetric
     * @deprecated
     */
    modelId?: boolean | null;
    /**
     * Requested user ID.
     * @type {string}
     * @memberof ResUserCreditMetric
     */
    userId: string;
}
/**
 * Viewer config object.
 * @export
 * @interface ResViewer
 */
export interface ResViewer {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof ResViewer
     */
    config: { [key: string]: any; };
}

/**
 * Optional preferred visualization for parameters of type `FILE` and `STRINGLIST`.
 * @export
 */
export const ResVisualizationType = {
    UNKNOWN: 'unknown',
    BUTTON: 'button',
    CALENDAR: 'calendar',
    CHECKLIST: 'checklist',
    CLOCK: 'clock',
    CYCLE: 'cycle',
    DIAL: 'dial',
    DROPDOWN: 'dropdown',
    GEOMETRY: 'geometry',
    IMAGE: 'image',
    SEQUENCE: 'sequence',
    SLIDER: 'slider',
    SWATCH: 'swatch',
    TEXT: 'text',
    TOGGLE: 'toggle'
} as const;
export type ResVisualizationType = typeof ResVisualizationType[keyof typeof ResVisualizationType];

/**
 * 
 * @export
 * @interface ResWarningComponent
 */
export interface ResWarningComponent {
    /**
     * ID of component.
     * @type {string}
     * @memberof ResWarningComponent
     */
    component?: string;
    /**
     * Instance ID of component.
     * @type {string}
     * @memberof ResWarningComponent
     */
    instance: string;
    /**
     * Name of component.
     * @type {string}
     * @memberof ResWarningComponent
     */
    name: string;
    /**
     * Nickname of component.
     * @type {string}
     * @memberof ResWarningComponent
     */
    nick_name: string;
    /**
     * Component Warnings descriptions.
     * @type {Array<string>}
     * @memberof ResWarningComponent
     */
    warnings: Array<string>;
}
/**
 * System information about the Geometry Workers.
 * @export
 * @interface ResWorkerInfo
 */
export interface ResWorkerInfo {
    /**
     * Version of the Grasshopper application.
     * @type {string}
     * @memberof ResWorkerInfo
     */
    grasshopperVersion: string;
    /**
     * Holds information of all installed and allowed Grasshopper plugins.
     * @type {ResWorkerPlugins}
     * @memberof ResWorkerInfo
     */
    plugins: ResWorkerPlugins;
    /**
     * Version of the Rhino application.
     * @type {string}
     * @memberof ResWorkerInfo
     */
    rhinoVersion: string;
    /**
     * Version of the ShapeDiver worker plugin.
     * @type {string}
     * @memberof ResWorkerInfo
     */
    shapeDiverVersion: string;
}
/**
 * A Grasshopper plugin component that may not be used.
 * @export
 * @interface ResWorkerPluginComponent
 */
export interface ResWorkerPluginComponent {
    /**
     * ID of the plugin component.
     * @type {string}
     * @memberof ResWorkerPluginComponent
     */
    id: string;
    /**
     * Name of the plugin component.
     * @type {string}
     * @memberof ResWorkerPluginComponent
     */
    name: string;
    /**
     * Indicates whether the component is a script component.
     * @type {boolean}
     * @memberof ResWorkerPluginComponent
     */
    isScriptComponent?: boolean;
}
/**
 * Holds information of all installed and allowed Grasshopper plugins.
 * @export
 * @interface ResWorkerPlugins
 */
export interface ResWorkerPlugins {
    /**
     * Contains information about all installed Grasshopper plugins.
     * @type {Array<ResInstalledWorkerPlugin>}
     * @memberof ResWorkerPlugins
     */
    installed: Array<ResInstalledWorkerPlugin>;
    /**
     * Contains the model checking configuration for the Grasshopper plugins.
     * @type {Array<ResAllowedWorkerPlugin>}
     * @memberof ResWorkerPlugins
     */
    allowed: Array<ResAllowedWorkerPlugin>;
    /**
     * Contains information about plugin inconsistencies.
     * @type {Array<string>}
     * @memberof ResWorkerPlugins
     */
    inconsistent: Array<string>;
}
/**
 * Information about a recommended scale-in candidate.
 * @export
 * @interface ResWorkerScaleInCandidate
 */
export interface ResWorkerScaleInCandidate {
    /**
     * Indicates whether a scale-in candidate was successfully identified.
     * @type {boolean}
     * @memberof ResWorkerScaleInCandidate
     */
    success: boolean;
    /**
     * EC2 instance ID of the recommended scale-in candidate.
     * @type {string}
     * @memberof ResWorkerScaleInCandidate
     */
    instanceId?: string;
}
/**
 * Worker system information.
 * @export
 * @interface ResWorkerSystem
 */
export interface ResWorkerSystem {
    /**
     * System information about the Geometry Minions.
     * @type {ResMinionInfo}
     * @memberof ResWorkerSystem
     */
    minions?: ResMinionInfo;
    /**
     * System information about the Geometry Workers.
     * @type {ResWorkerInfo}
     * @memberof ResWorkerSystem
     */
    workers: ResWorkerInfo;
    /**
     * Scale-in candidate information for worker instances.
     * @type {ResWorkerScaleInCandidate}
     * @memberof ResWorkerSystem
     */
    scaleInCandidate?: ResWorkerScaleInCandidate;
}
