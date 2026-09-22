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
     */
    id: string;
    /**
     * 
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
    UNKNOWN: 'unknown',
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
     */
    id: string;
    /**
     * 
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
     */
    creditLimit?: boolean;
    /**
     * The model has been blocked explicitly by its owner.
     */
    owner?: boolean;
    /**
     * The model owner has been restricted from accessing this backend system
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
    DELETED: 'deleted',
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
     */
    id?: string;
    /**
     * Name attribute of the chunk to be used.
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
     */
    value?: string;
    /**
     * 
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
     */
    accessdomains?: Array<string>;
    /**
     * Should this ticket provide access to model authoring (allows to change configuration)?
     */
    author?: boolean;
    /**
     * Should this ticket allow public access (ignore the model's `accessdomains` property)?
     */
    pub: boolean;
    /**
     * The timestamp until which the ticket should be valid.
     */
    until: string;
    /**
     * Does this ticket identify the model via its secondary ID (model property `id2`)?
     */
    use_id2?: boolean;
}

/**
 * Type of a ticket.
 * @export
 */
export const CommonsTicketType = {
    BACKEND: 'backend',
    NONE: '',
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
    ALL: '*',
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
    UNKNOWN: 'unknown',
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
    ALL: '*',
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
    USDZ: 'usdz',
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
    DELETED: 'deleted',
} as const;
export type QueryModelStatus = typeof QueryModelStatus[keyof typeof QueryModelStatus];


/**
 * Specifies the order of the results.
 * @export
 */
export const QueryOrder = {
    ASC: 'asc',
    DESC: 'desc',
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
     */
    models?: Array<string>;
    /**
     * The user IDs that should form the new authorization group.
     */
    users?: Array<string>;
    /**
     * The organization IDs that should form the new authorization group.
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
     */
    id: ReqAnyCreditMetricId;
    /**
     * Either a single extended date or an array of extended dates.
     * Multiple timestamps are aggregated and result in a single credit metrics object.
     */
    timestamp?: Array<string>;
    /**
     * Allows to define the beginning of a time range, instead of specifying individual timestamps.
     */
    timestamp_from?: string;
    /**
     * Allows to define the ending of a time range, instead of specifying individual timestamps.
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
     */
    parameters: ReqCustomization;
    /**
     * 
     */
    exports: Array<string>;
    /**
     * 
     */
    outputs?: Array<string>;
    /**
     * Maximum amount of milliseconds to wait for completion of export request before responding.
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
     */
    displayname?: string;
    /**
     * 
     */
    group?: ReqExportDefinitionGroup;
    /**
     * Controls whether the export should be hidden in the UI.
     */
    hidden?: boolean;
    /**
     * Ordering of the export in client applications.
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
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
     */
    filename?: string;
    /**
     * Content-Type (MIME type) of the file to be uploaded.
     */
    format: string;
    /**
     * Size of the file to be uploaded, in bytes.
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
     */
    id: string;
    /**
     * 
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
    ERROR: '2',
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
     */
    level: ReqLogLevel;
    /**
     * The message that should be logged.
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
     */
    accessdomains?: Array<string>;
    /**
     * List of allowed Grasshopper libraries.
     */
    allowed_libraries?: Array<string>;
    /**
     * List of allowed auth-groups.
     */
    auth_groups?: Array<string>;
    /**
     * Should backend access to the model be allowed.
     */
    backendaccess?: boolean;
    /**
     * 
     */
    blockingReasons?: ReqModelBlockingReasons;
    /**
     * Original name of the model's grasshopper file.
     */
    filename?: string;
    /**
     * File type of the model.
     */
    ftype?: ReqModelFileType;
    /**
     * Allows to control whether the model should be warmed up immediately after loading by running a computation. This increases the likelihood of following computation requests to be faster.
     */
    initial_warmup?: boolean;
    /**
     * Optional second model ID.
     */
    id2?: string;
    /**
     * Maximum number of milliseconds allowed for computations of this model.
     */
    max_comp_time?: number;
    /**
     * Maximum number of bytes allowed to be exported from a model for a specific set of parameter values.
     */
    max_export_size?: number;
    /**
     * Maximum amount of minutes a loaded model may be unused before it gets unloaded.
     * 
     * Note: Models may get unloaded earlier than that.
     */
    max_idle_minutes?: number;
    /**
     * Maximum number of bytes allowed for the model's Grasshopper file size.
     */
    max_model_size?: number;
    /**
     * Maximum number of bytes allowed for an output of a model for a specific set of parameter values.
     */
    max_output_size?: number;
    /**
     * Allows to configure the maximum number of bytes allowed for a single texture.
     */
    max_texture_size?: number;
    /**
     * Maximum time a computation request may stay waiting before a further worker goes ahead regardless of whether it already has the model loaded, and regardless of `num_loaded_max`. This allows to configure a soft or a hard upper boundary for the number of loaded models.
     */
    max_wait_time?: number;
    /**
     * Name of the model.
     */
    name?: string;
    /**
     * Maximum number of workers that should have the model loaded at the same time.
     */
    num_loaded_max?: number;
    /**
     * Minimum number of workers which should have the model loaded once a session to the model gets opened.
     */
    num_loaded_min?: number;
    /**
     * Minimum number of workers that should always have the model loaded, regardless of session activity. This allows to minimise the likelihood of computation requests being slower due to model loading.
     */
    num_preloaded_min?: number;
    /**
     * Optional organization ID.
     */
    org_id?: string;
    /**
     * The Model ID of the previous version of this model.
     * This property is applicable only when creating a new model and cannot be used in conjunction with `prev_id`.
     */
    prev_id?: string;
    /**
     * If set to `true`, a new repository will be created for the model.
     * This property is applicable only when creating a new model and cannot be used in conjunction with `prev_id`.
     */
    with_repo?: boolean;
    /**
     * Allows public access (ignore `accessdomains`).
     */
    pub?: boolean;
    /**
     * Enforces iframe embedding instead of direct embedding.
     */
    require_iframe?: boolean;
    /**
     * Enforces token-based authentication for this model.
     */
    require_token?: boolean;
    /**
     * Limits the number of sessions that can be created by a specific IP address in one hour.
     */
    session_rate_limit?: number;
    /**
     * Can this model be trusted (controls whether failed computations will be retried).
     */
    trust?: ReqTrustLevel;
    /**
     * Allows the usage of the CDN for fast content distribution.
     */
    use_cdn?: boolean;
    /**
     * Optional user ID.
     */
    user_id?: string;
    /**
     * The webhook-url for updating the platform backend about model status changes.
     */
    webhook_url?: string;
    /**
     * The webhook-token for authentication used by the webhook-url.
     */
    webhook_token?: string;
    /**
     * Allows to control whether the model's Grasshopper file can contain scripts.
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
     */
    creditLimit?: boolean;
    /**
     * The model has been blocked explicitly by its owner.
     */
    owner?: boolean;
    /**
     * The model owner has been restricted from accessing this backend system
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
     */
    modelIds: Array<string>;
}

/**
 * Supported Grasshopper file types for models.
 * @export
 */
export const ReqModelFileType = {
    GRASSHOPPER_BINARY: 'gh',
    GRASSHOPPER_XML: 'ghx',
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
     */
    modelIds: Array<string>;
    /**
     * 
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
     */
    parameters: ReqCustomization;
    /**
     * Optional untyped data that can be used to store additional information.
     */
    data?: { [key: string]: any; };
    /**
     * Details of the Model-State image file. If provided, the response will include a URL for uploading the file.
     */
    image?: ReqFileDefinition;
    /**
     * The ID of an existing AR scene associated with this model. If provided, the scene's glTF and USDZ data will be duplicated into the newly created Model-State.
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
     */
    modelIds: Array<string>;
    /**
     * 
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
     */
    displayname?: string;
    /**
     * 
     */
    group?: ReqOutputDefinitionGroup;
    /**
     * Controls whether the output should be hidden in the UI.
     */
    hidden?: boolean;
    /**
     * Ordering of the output in client applications.
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     */
    tooltip?: string;
    /**
     * The chunk definitions of the sdTF file that is generated by the output. If specified, all existing sdTF chunks of the output must be given. The order of the given chunk items determines the order in that the chunks will be shown in the UI.
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
     */
    id: string;
    /**
     * Chunk name to display instead of the chunk `name`. This value can be unset by specifying an empty string.
     */
    displayname?: string;
    /**
     * Controls whether the chunk should be hidden in the UI.
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
     */
    displayname?: string;
    /**
     * 
     */
    group?: ReqParameterDefinitionGroup;
    /**
     * Controls whether the parameter should be hidden in the UI.
     */
    hidden?: boolean;
    /**
     * Ordering of the parameter in client applications.
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     */
    tooltip?: string;
    /**
     * Holds parameter-type specific information.
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
     */
    content_encoding?: string;
    /**
     * Size of the sdTF to be uploaded, in bytes.
     */
    content_length: number;
    /**
     * Content-type of the sdTF to be uploaded.
     */
    content_type: ReqSdtfType;
    /**
     * Namespace the asset shall be created in.
     */
    namespace: string;
}



/**
 * Content-Type (MIME type) of the sdTF to be uploaded.
 * @export
 */
export const ReqSdtfType = {
    MODEL_SDTF: 'model/vnd.sdtf',
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
     */
    value?: string;
    /**
     * 
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
     */
    accessdomains?: Array<string>;
    /**
     * Should this ticket provide access to model authoring (allows to change configuration)?
     */
    author?: boolean;
    /**
     * Should this ticket allow public access (ignore the model's `accessdomains` property)?
     */
    pub: boolean;
    /**
     * The timestamp until which the ticket should be valid.
     */
    until: string;
    /**
     * Does this ticket identify the model via its secondary ID (model property `id2`)?
     */
    use_id2?: boolean;
    /**
     * 
     */
    type: ReqTicketType;
}



/**
 * The type of the ticket.
 * @export
 */
export const ReqTicketType = {
    BACKEND: 'backend',
    NONE: '',
} as const;
export type ReqTicketType = typeof ReqTicketType[keyof typeof ReqTicketType];


/**
 * Level of trust granted for a model.
 * @export
 */
export const ReqTrustLevel = {
    UNDEFINED: '',
    NONE: 'none',
    FULL: 'full',
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
     */
    name: string;
    /**
     * Title of the action, e.g. 'Customize model', 'Close session', etc.
     */
    title: string;
    /**
     * Hyperlink to make the request to.
     */
    href: string;
    /**
     * HTTP method to use.
     */
    method: string;
    /**
     * Template for the request body, references into the 'templates' array of the response (e.g. 'customize-request').
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
     */
    id: string;
    /**
     * Name of the Grasshopper plugin.
     */
    name: string;
    /**
     * Minimum supported version of the plugin.
     */
    minVersion: string;
    /**
     * Maximum supported version of the plugin.
     */
    maxVersion: string;
    /**
     * Name of the plugin author.
     */
    authorName?: string;
    /**
     * Link to a website related to the plugin.
     */
    description?: string;
    /**
     * Link to a website related to the plugin.
     */
    href?: string;
    /**
     * When `true` then `GH_AssemblyInfo.AssemblyVersion` may be used instead of
     * `GH_AssemblyInfo.Version` for version checking.
     * 
     * Defaults to `false`.
     */
    allowFallbackToAssemblyVersion: boolean;
    /**
     * When `true` then only the major and minor version numbers recorded in Grasshopper
     * models will be checked.
     * 
     * Defaults to `false`.
     */
    checkMajorMinorVersionOnly: boolean;
    /**
     * When `false` then the installation check of the plugin will be skipped.
     * 
     * Defaults to `true`.
     */
    checkIfInstalled: boolean;
    /**
     * List of previous plugin IDs supported by this plugin version. This is used for the obscure case of the plugin developer changing the plugin ID.
     */
    previousIds: Array<string>;
    /**
     * List of plugin components that are explicitly allowed. When this property is set, only the listed components are allowed, overruling the list in `disallowedComponents`.
     */
    allowedComponents: Array<ResWorkerPluginComponent>;
    /**
     * List of plugin components which may not be used. This list might be overruled by `allowedComponents`.
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
     */
    file?: { [key: string]: ResAssetDefinition; };
    /**
     * 
     */
    sdtf?: Array<ResAssetDefinition>;
    /**
     * The asset-definition of a Model-State image.
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
     */
    id: string;
    /**
     * href the file should be uploaded to (typically a time-limited pre-signed url).
     */
    href: string;
    /**
     * 
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
     */
    contentDisposition?: string;
    /**
     * The value of the Content-Type HTTP header.
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
     */
    ticket?: ResTicketAuthorization;
    /**
     * 
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
     */
    asset?: ResAsset;
    /**
     * 
     */
    list?: ResList;
    /**
     * 
     */
    modelState?: ResModelStateOrData;
    /**
     * 
     */
    system?: ResSystem;
    /**
     * Actions the client may take.
     */
    actions?: Array<ResAction>;
    /**
     * Analytics information.
     */
    analytics?: ResAnalytics;
    /**
     * The auth-group to use for ticked-based authentication.
     */
    auth_group?: string;
    /**
     * Model cleanup information.
     */
    cleanup?: Array<ResModelCleanupProcess>;
    /**
     * Decrypted ticket details.
     */
    decryptedTicket?: ResTicket;
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Links regarding the model file.
     */
    file?: ResFile;
    /**
     * glTF information.
     */
    gltf?: ResGltfUpload;
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     */
    model?: ResModel;
    /**
     * Statistics about model computations.
     */
    computations?: Array<ResModelComputation>;
    /**
     * Analytics for model sessions.
     */
    sessions?: Array<ResModelSession>;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Pagination information.
     */
    pagination?: ResPagination;
    /**
     * Parameter definitions, not contained with every response. A directory of parameter-IDs and parameters.
     */
    parameters?: { [key: string]: ResParameter; };
    /**
     * 
     */
    plugins?: ResPlugins;
    /**
     * The ID of the created session.
     */
    sessionId?: string;
    /**
     * Various settings.
     */
    setting?: ResSettings;
    /**
     * Statistics of a model.
     */
    statistic?: ResStatistic;
    /**
     * Request templates for actions.
     */
    templates?: Array<ResTemplate>;
    /**
     * The ticket to create a model session.
     */
    ticket?: string;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * Viewer specific data.
     */
    viewer?: ResViewer;
    /**
     * The current version of the viewer settings.
     */
    viewerSettingsVersion?: string;
    /**
     * An array of warnings encountered during request processing. These warnings indicate potential issues or non-critical conditions but did not prevent the request from being successfully processed.
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
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     */
    isCompilationDone: boolean;
    /**
     * 
     */
    ar: ResArCreditMetric;
    /**
     * 
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
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
     */
    computed: Array<ResComputedComponent>;
    /**
     * Components which were currently computing at the time the computation was stopped.
     */
    computing: Array<ResComputingComponent>;
    /**
     * Component Errors.
     */
    errors: Array<ResErrorComponent>;
    /**
     * Component Warnings.
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
     */
    components: ResComputationComponent;
    /**
     * Count of successful computations for the given loaded instance of the model.
     */
    count_success?: number;
    /**
     * Count of timed-out computations for the given loaded instance of the model.
     */
    count_timeout?: number;
    /**
     * Lists the ids of the parameters whose values were changed before the computation.
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
     */
    max_comp_time: number;
    /**
     * Maximum output size in bytes allowed for the model.
     */
    max_output_size: number;
    /**
     * Maximum export size in bytes allowed for the model.
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
    UNKNOWN: 'unknown',
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
     */
    actions?: Array<ResAction>;
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Request templates for actions.
     */
    templates?: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
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
     */
    actions?: Array<ResAction>;
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Request templates for actions.
     */
    templates?: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
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
     */
    deny_scripts: boolean;
    /**
     * File type of the model.
     */
    ftype: string;
    /**
     * Allows to control whether the model should be warmed up immediately after loading by running a computation. This increases the likelihood of following computation requests to be faster.
     */
    initial_warmup: boolean;
    /**
     * Maximum number of milliseconds allowed for computations of this model.
     */
    max_comp_time: number;
    /**
     * Maximum number of bytes allowed to be exported from a model for a specific set of parameter values.
     */
    max_export_size: number;
    /**
     * Maximum amount of minutes a loaded model may be unused before it gets unloaded.
     * 
     * Note: Models may get unloaded earlier than that.
     */
    max_idle_minutes: number;
    /**
     * Maximum number of bytes allowed for the model's Grasshopper file size.
     */
    max_model_size?: number;
    /**
     * Maximum number of bytes allowed for an output of a model for a specific set of parameter values.
     */
    max_output_size: number;
    /**
     * Maximum number of bytes allowed for a single texture.
     */
    max_texture_size?: number;
    /**
     * Maximum time a computation request may stay waiting before a further worker goes ahead regardless of whether it already has the model loaded, and regardless of `num_loaded_max`. This allows to configure a soft or a hard upper boundary for the number of loaded models.
     */
    max_wait_time: number;
    /**
     * Maximum number of workers that should have the model loaded at the same time.
     */
    num_loaded_max: number;
    /**
     * Minimum number of workers that should load the model and keep it open while there is session activity.
     */
    num_loaded_min: number;
    /**
     * Minimum number of workers that should always have the model loaded, regardless of session activity. This allows to minimise the likelihood of computation requests being slower due to model loading.
     */
    num_preloaded_min: number;
    /**
     * Limits the number of sessions that can be created by a specific IP address in one hour.
     */
    session_rate_limit?: number;
    /**
     * Controls whether failed computations will be retried.
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
     */
    instance: string;
    /**
     * ID of the component.
     */
    component: string;
    /**
     * Name of component.
     */
    name: string;
    /**
     * Nickname of component.
     */
    nick_name: string;
    /**
     * Computation time used.
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
     */
    instance: string;
    /**
     * ID of component.
     */
    component: string;
    /**
     * Name of component.
     */
    name: string;
    /**
     * Nickname of component.
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
     */
    auth_group: string;
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * Version of the Geometry Backend API.
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
     */
    file: ResFile;
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     */
    model: ResModel;
    /**
     * Various settings.
     */
    setting: ResSettings;
    /**
     * Statistics of a model.
     */
    statistic: ResStatistic;
    /**
     * Version of the Geometry Backend API.
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
     */
    modelState: ResModelState;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * 
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
     */
    actions: Array<ResAction>;
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Links regarding the model file.
     */
    file: ResFile;
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     */
    model: ResModel;
    /**
     * Model-State information.
     */
    modelState?: ResModelStateData;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Parameter definitions, not contained with every response. A directory of parameter-IDs and parameters.
     */
    parameters?: { [key: string]: ResParameter; };
    /**
     * The ID of the created session.
     */
    sessionId: string;
    /**
     * Various settings.
     */
    setting: ResSettings;
    /**
     * Statistics of a model.
     */
    statistic: ResStatistic;
    /**
     * Request templates for actions.
     */
    templates: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * Viewer specific data.
     */
    viewer: ResViewer;
    /**
     * The current version of the viewer settings.
     */
    viewerSettingsVersion: string;
    /**
     * An array of warnings encountered during request processing. These warnings indicate potential issues or non-critical conditions but did not prevent the request from being successfully processed.
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
     */
    actions: Array<ResAction>;
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Links regarding the model file.
     */
    file: ResFile;
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     */
    model: ResModel;
    /**
     * Model-State information.
     */
    modelState?: ResModelStateData;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Parameter definitions, not contained with every response. A directory of parameter-IDs and parameters.
     */
    parameters?: { [key: string]: ResParameter; };
    /**
     * The ID of the created session.
     */
    sessionId: string;
    /**
     * Various settings.
     */
    setting: ResSettings;
    /**
     * Statistics of a model.
     */
    statistic: ResStatistic;
    /**
     * Request templates for actions.
     */
    templates: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * Viewer specific data.
     */
    viewer: ResViewer;
    /**
     * The current version of the viewer settings.
     */
    viewerSettingsVersion: string;
    /**
     * An array of warnings encountered during request processing. These warnings indicate potential issues or non-critical conditions but did not prevent the request from being successfully processed.
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
     */
    file: ResFile;
    /**
     * The definitions of a ShapeDiver model.
     */
    model: ResModel;
    /**
     * Various settings.
     */
    setting: ResSettings;
    /**
     * Statistics of a model.
     */
    statistic: ResStatistic;
    /**
     * The ticket to create a model session.
     */
    ticket: string;
    /**
     * Version of the Geometry Backend API.
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
     */
    decryptedTicket: ResTicket;
    /**
     * Version of the Geometry Backend API.
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
     */
    count: number;
    /**
     * Number of finished 10-second chunks charged.
     */
    credits: number;
    /**
     * Total duration of computation time, in milliseconds.
     */
    duration: number;
    /**
     * Count of computations per computation time expressed in started 10-second chunks.
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
     */
    outputs: ResDefaultOutputMetric;
    /**
     * 
     */
    exports: ResDefaultExportMetric;
    /**
     * 
     */
    combined: ResDefaultCombinedMetric;
    /**
     * 
     */
    sessions: ResDefaultSessionMetric;
    /**
     * 
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
     */
    count: number;
    /**
     * The total duration of all sessions, in milliseconds.
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
     */
    error: ResErrorType;
    /**
     * General description of the error type.
     */
    desc: string;
    /**
     * Detailed error description.
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
     */
    component: string;
    /**
     * Component Error descriptions.
     */
    errors: Array<string>;
    /**
     * Instance ID of component.
     */
    instance: string;
    /**
     * Name of component.
     */
    name: string;
    /**
     * Nickname of component.
     */
    nick_name: string;
    /**
     * Component Warnings descriptions.
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
    UNKNOWN: '',
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
     */
    id: string;
    /**
     * Constant ID of the export, not dependent on model ID, and therefore NOT changing each time a model gets uploaded. Might be undefined because this property was introduced in summer 2020 and does not exist for exports of older models.
     */
    uid?: string;
    /**
     * Name of the export.
     */
    name: string;
    /**
     * Type of export.
     */
    type: ResExportDefinitionType;
    /**
     * List of IDs of parameters influencing this export.
     */
    dependency: Array<string>;
    /**
     * Group information of an export definition.
     */
    group?: CommonsGroup;
    /**
     * Ordering of the export in client applications.
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     */
    tooltip?: string;
    /**
     * Parameter name to display instead of `name`.
     */
    displayname?: string;
    /**
     * Controls whether the parameter should be hidden in the UI.
     */
    hidden: boolean;
    /**
     * Type-specific ID of the export. In case of exports defined by a single component, this corresponds to the component’s uuid.
     */
    typeId?: string;
    /**
     * Type-specific name of the export. In case of exports defined by a single component, this corresponds to the component’s name (NOT its nickname).
     */
    typeName?: string;
    /**
     * Requested version of the export.
     */
    version: string;
    /**
     * The delay in milliseconds after which an export cache request shall be sent to
     * check again for this export version. This property is used ONLY if the export
     * version has not been computed yet.
     * 
     * Note that the existence of this property does not necessarily imply the presence of
     * an active or queued computation for the respective export version.
     */
    delay?: number;
    /**
     * Result parts. In case this array does not exist, this means that the workers have not finished computation for this output version.
     */
    content?: Array<ResExportContent>;
    /**
     * In case computation of the export version (temporarily) failed. Contains a message explaining what went wrong.
     */
    msg?: string;
    /**
     * Optional suggested filename for the files to be downloaded.
     */
    filename?: string;
    /**
     * 
     */
    result?: ResExportResult;
    /**
     * Status of the computation which resulted in the export version.
     */
    status_computation?: ResComputationStatus;
    /**
     * Status of collecting results for the export version.
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
     */
    format: string;
    /**
     * Link for download of exported asset.
     */
    href: string;
    /**
     * Optional size of exported asset, in bytes.
     */
    size?: number;
    /**
     * Optional Content-Type for parts of type `asset`.
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
     */
    id: string;
    /**
     * Constant ID of the export, not dependent on model ID, and therefore NOT changing each time a model gets uploaded. Might be undefined because this property was introduced in summer 2020 and does not exist for exports of older models.
     */
    uid?: string;
    /**
     * Name of the export.
     */
    name: string;
    /**
     * Type of export.
     */
    type: ResExportDefinitionType;
    /**
     * List of IDs of parameters influencing this export.
     */
    dependency: Array<string>;
    /**
     * Group information of an export definition.
     */
    group?: CommonsGroup;
    /**
     * Ordering of the export in client applications.
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     */
    tooltip?: string;
    /**
     * Parameter name to display instead of `name`.
     */
    displayname?: string;
    /**
     * Controls whether the parameter should be hidden in the UI.
     */
    hidden: boolean;
    /**
     * Type-specific ID of the export. In case of exports defined by a single component, this corresponds to the component’s uuid.
     */
    typeId?: string;
    /**
     * Type-specific name of the export. In case of exports defined by a single component, this corresponds to the component’s name (NOT its nickname).
     */
    typeName?: string;
    /**
     * This property is never set.
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
    SHAPEWAYS: 'shapeways',
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
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     */
    export: Array<ResExport>;
    /**
     * A directory of model textures.
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
     */
    msg?: string;
    /**
     * Optional error message for user.
     */
    err?: string;
    /**
     * Optional href to redirect user to for download.
     */
    href?: string;
    /**
     * Optional shapeways model ID.
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
     */
    upload?: string;
    /**
     * URL to download a model file.
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
     */
    file: { [key: string]: ResAssetDefinition; };
    /**
     * 
     */
    sdtf?: Array<ResAssetDefinition>;
    /**
     * The asset-definition of a Model-State image.
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
     */
    id: string;
    /**
     * ID of the parameter that the file is assigned to.
     */
    parameterId: string;
    /**
     * The size of the file in bytes.
     */
    size: number;
    /**
     * The name of the file, when specified during the upload.
     */
    filename?: string;
    /**
     * Timestamp of the last modification of the file.
     */
    lastModified?: string;
}
/**
 * 
 * @export
 * @interface ResFileList
 */
export interface ResFileList {
    /**
     * A directory of file objects.
     */
    file: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
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
     */
    actions?: Array<ResAction>;
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Request templates for actions.
     */
    templates?: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
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
     */
    actions?: Array<ResAction>;
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Request templates for actions.
     */
    templates?: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
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
     */
    cleanup: Array<ResModelCleanupProcess>;
    /**
     * Version of the Geometry Backend API.
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
     */
    analytics: ResAnalytics;
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * Version of the Geometry Backend API.
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
     */
    version: string;
    /**
     * 
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
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Links regarding the model file.
     */
    file: ResFile;
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     */
    model: ResModel;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Parameter definitions, not contained with every response. A directory of parameter-IDs and parameters.
     */
    parameters?: { [key: string]: ResParameter; };
    /**
     * 
     */
    plugins?: ResPlugins;
    /**
     * Various settings.
     */
    setting: ResSettings;
    /**
     * Statistics of a model.
     */
    statistic: ResStatistic;
    /**
     * Version of the Geometry Backend API.
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
     */
    computations: Array<ResModelComputation>;
    /**
     * Pagination information.
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
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
     */
    message?: string;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * Viewer specific data.
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
     */
    analytics: ResAnalytics;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
}
/**
 * 
 * @export
 * @interface ResGetModelSessionsAnalytics
 */
export interface ResGetModelSessionsAnalytics {
    /**
     * Analytics for model sessions.
     */
    sessions: Array<ResModelSession>;
    /**
     * Pagination information.
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
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
     */
    modelState: ResModelState;
    /**
     * Version of the Geometry Backend API.
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
     */
    modelState: ResModelStateData;
    /**
     * Version of the Geometry Backend API.
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
     */
    analytics: ResAnalytics;
    /**
     * Version of the Geometry Backend API.
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
     */
    analytics: ResAnalytics;
    /**
     * Version of the Geometry Backend API.
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
     */
    version: string;
    /**
     * 
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
     */
    actions: Array<ResAction>;
    /**
     * Exports of the model for the given parameter values. A directory of export-IDs and exports.
     */
    exports?: { [key: string]: ResExportOrDefinition; };
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     */
    model: ResModel;
    /**
     * Outputs of the model for the given parameter values. A directory of output-IDs and outputs.
     */
    outputs?: { [key: string]: ResOutputOrDefinition; };
    /**
     * Parameter definitions, not contained with every response. A directory of parameter-IDs and parameters.
     */
    parameters?: { [key: string]: ResParameter; };
    /**
     * The ID of the created session.
     */
    sessionId: string;
    /**
     * Statistics of a model.
     */
    statistic: ResStatistic;
    /**
     * Request templates for actions.
     */
    templates: Array<ResTemplate>;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * Viewer specific data.
     */
    viewer: ResViewer;
    /**
     * The current version of the viewer settings.
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
     */
    analytics: ResAnalytics;
    /**
     * Version of the Geometry Backend API.
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
     */
    version: string;
    /**
     * 
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
     */
    href: string;
    /**
     * Contains the unique ID of the uploaded scene. Only present for uploads with the conversion type `scene`.
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
     */
    id: string;
    /**
     * Name of the Grasshopper plugin.
     */
    name: string;
    /**
     * Version of the Grasshopper plugin.
     */
    version: string;
    /**
     * Name of the plugin author.
     */
    authorName: string;
    /**
     * Contact information of the plugin author (homepage URL, email address, etc.).
     */
    authorContact: string;
    /**
     * General description of the Grasshopper plugin.
     */
    description: string;
    /**
     * Assembly version of the Grasshopper plugin DLL.
     * 
     * See the [documentation](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.assemblyname.version?view=net-8.0)
     * for more information.
     */
    assemblyVersion: string;
    /**
     * Full assembly name of the Grasshopper plugin DLL.
     * 
     * See the [documentation](https://learn.microsoft.com/en-us/dotnet/api/system.reflection.assembly.fullname?view=net-8.0)
     * for more information.
     */
    assemblyFullName: string;
    /**
     * Gets whether this library is a Grasshopper core library. Core libraries are installed along with Grasshopper and thus should always be available anywhere.
     */
    isCoreLibrary: boolean;
    /**
     * The license type of the plugin.
     * 
     * See the [documentation](https://developer.rhino3d.com/api/grasshopper/html/T_Grasshopper_Kernel_GH_LibraryLicense.htm)
     * for more information.
     */
    license: number;
    /**
     * The mechanism used to load the plugin.
     * 
     * See the [documentation](https://developer.rhino3d.com/api/grasshopper/html/T_Grasshopper_Kernel_GH_LoadingMechanism.htm)
     * for more information.
     */
    loadingMechanism: number;
    /**
     * Installation path of the Grasshopper plugin.
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
     */
    outputs: ResRateLimitedOutputMetric;
    /**
     * 
     */
    exports: ResRateLimitedExportMetric;
    /**
     * 
     */
    combined: ResRateLimitedCombinedMetric;
    /**
     * 
     */
    sessions: ResRateLimitedSessionMetric;
    /**
     * 
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
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
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
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * 
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
     */
    message?: string;
    /**
     * Pagination information.
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * 
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
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * 
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
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * 
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
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * 
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
     */
    message?: string;
    /**
     * Pagination information.
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * 
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
     */
    pagination: ResPagination;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * 
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
     */
    credits: number;
    /**
     * Number of load requests.
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
     */
    instances: { [key: string]: ResMinionProcess; };
    /**
     * Aggregated task information. A directory of task types and task data.
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
     */
    minions: ResMinionInfo;
    /**
     * System information about the Geometry Workers.
     */
    workers?: ResWorkerInfo;
    /**
     * Scale-in candidate information for worker instances.
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
     */
    avgDuration: number;
    /**
     * Maximum duration of the task in milliseconds.
     */
    maxDuration: number;
    /**
     * Average difference between the configured task interval and the last global task execution in milliseconds.
     */
    avgIntervalDiff: number;
    /**
     * Maximum difference between the configured task interval and the last global task execution in milliseconds.
     */
    maxIntervalDiff: number;
    /**
     * Execution interval of this task type in milliseconds.
     */
    interval: number;
    /**
     * Timestamp of the latest task completion.
     */
    latest: string;
    /**
     * The number of aggregated items.
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
     */
    allowed_libraries?: Array<string>;
    /**
     * Link to view the model on the ShapeDiver Platform.
     */
    backlinkurl?: string;
    /**
     * Link to continue the checking process of the model on the ShapeDiver Platform.
     */
    checkurl?: string;
    /**
     * Timestamp of creation of the model.
     */
    createdate?: string;
    /**
     * ID of the Grasshopper document.
     */
    documentid?: string;
    /**
     * Original name of the model's grasshopper file.
     */
    filename?: string;
    /**
     * ID of the model.
     */
    id: string;
    /**
     * Optional second ID of the model. This value can be unset via an empty string.
     */
    id2?: string;
    /**
     * Optional message, used in case the model was denied.
     */
    msg?: string;
    /**
     * Model name.
     */
    name?: string;
    /**
     * Organization ID of the user that owns the model.
     */
    org_id?: string;
    /**
     * 
     */
    stat: ResModelStatus;
    /**
     * ShapeDiver User ID of the model owner.
     */
    user_id?: string;
    /**
     * The webhook-url for updating the platform backend about model status changes.
     */
    webhook_url?: string;
    /**
     * The webhook-token for authentication used by the webhook-url.
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
     */
    creditLimit: boolean;
    /**
     * The model has been blocked explicitly by its owner.
     */
    owner: boolean;
    /**
     * The model owner has been restricted from accessing this backend system
     */
    backendPermission: boolean;
    /**
     * The model uses a Grasshopper plugin that is not allowed for the owner.
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
     */
    type: ResModelCleanupProcessType;
    /**
     * The timestamp when the deletion job has been enqueued.
     */
    timestamp_enqueued: string;
    /**
     * The total number of items of this type that are going to be deleted.
     */
    total?: number;
    /**
     * The number of already deleted items of this type.
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
    DELETE_OUTPUT_VERSION: 'delete_output_version',
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
     */
    id: string;
    /**
     * Numeric timestamp in format `YYYYMMDDHHMMSSMMM`.
     * 
     * Deprecated: Use `timestamp_str` instead.
     * @deprecated
     */
    timestamp: number;
    /**
     * Timestamp.
     */
    timestamp_str: string;
    /**
     * The ID of the compute request that was processed.
     */
    compute_request_id: string;
    /**
     * Requested export versions.
     */
    exports: { [key: string]: string; };
    /**
     * Requested output versions.
     */
    outputs: { [key: string]: string; };
    /**
     * Parameter values.
     */
    params: object;
    /**
     * The stats of the computation request.
     */
    stats: ResModelComputationStats;
    /**
     * Result of processing request.
     */
    status: ResComputationStatus;
    /**
     * Timestamp when the computation request was finished.
     */
    timestamp_fin: string;
    /**
     * Timestamp when the work request was filed.
     */
    timestamp_req: string;
    /**
     * Timestamp when the computation request was filed.
     */
    timestamp_req_iso: string;
    /**
     * Timestamp when the computation request was picked up.
     */
    timestamp_resp: string;
    /**
     * Message containing information about the computation process.
     */
    msg?: string;
    /**
     * Model's limits at the time of the computation process.
     */
    limit?: ResComputationLimits;
    /**
     * The number of credits that are charged for this computation.
     */
    credits?: number;
    /**
     * ID of the session that triggered this computation.
     * 
     * The value may be redacted, or omitted when the computation is not associated with a
     * session.
     */
    sessionId?: string;
    /**
     * Identifier of the user billed for this computation. This may differ from the user who requested it.
     */
    chargeUserId?: string;
    /**
     * Identifier of the organization billed for this computation. This may differ from the organization of the user who requested it.
     */
    chargeOrgId?: string;
}


/**
 * Stats of a computation request.
 * @export
 * @interface ResModelComputationStats
 */
export interface ResModelComputationStats {
    /**
     * Total size in bytes of the uncompressed resulting assets.
     */
    size_assets?: number;
    /**
     * Total size in bytes of the (potentially compressed) assets uploaded to storage.
     */
    size_assets_storage?: number;
    /**
     * The number of milliseconds it took to answer the request.
     */
    time_completion: number;
    /**
     * The number of milliseconds it took to download the model from storage. `0` in case model was already downloaded to the instance.
     */
    time_model_download: number;
    /**
     * The number of milliseconds it took to  load (open) the model. `0` in case model was
     * already loaded.
     * 
     * Note: Does not include time for script compilation and first computation.
     */
    time_model_open: number;
    /**
     * The number of milliseconds it took to process the request.
     */
    time_processing: number;
    /**
     * The number of milliseconds it took to carry out checks that are done before loading the model.
     */
    time_check_stored: number;
    /**
     * The number of milliseconds it took to carry out check that are done after loading the model.
     */
    time_check_loaded: number;
    /**
     * The number of milliseconds it took to upload assets to storage.
     */
    time_storage?: number;
    /**
     * The number of milliseconds for Grasshopper solver.
     */
    time_solver: number;
    /**
     * The number of milliseconds it took to collect output and export data after computation.
     */
    time_solver_collect?: number;
    /**
     * The number of milliseconds it took to download and load the model and setting parameters, and to compute the solution.
     */
    time_solver_ext: number;
    /**
     * The number of milliseconds the request was waiting before being processed.
     */
    time_wait: number;
    /**
     * The number of milliseconds it took to store the results of the request in the cache.
     */
    time_cache_outputs?: number;
    /**
     * Information about model computations.
     */
    model?: ResComputationComponents;
    /**
     * The number of milliseconds the CPU was used to carry out checks which are done before loading the model.
     */
    cpu_time_check_stored?: number;
    /**
     * The number of milliseconds the CPU was used to carry out checks which are done after loading the model.
     */
    cpu_time_check_loaded?: number;
    /**
     * The number of milliseconds the CPU was used to upload assets to storage.
     */
    cpu_time_storage?: number;
    /**
     * The number of milliseconds the CPU was used to download the model from storage.
     */
    cpu_time_model_download?: number;
    /**
     * The number of milliseconds the CPU was used to  load (open) the model. `0` in case model was already loaded.
     */
    cpu_time_model_open?: number;
    /**
     * The number of milliseconds the CPU was used for Grasshopper solver.
     */
    cpu_time_solver?: number;
    /**
     * The number of milliseconds the CPU was used to collect output and export data after computation.
     */
    cpu_time_solver_collect?: number;
    /**
     * The number of milliseconds the CPU was used to download and load the model and setting parameters, and to compute the solution.
     */
    cpu_time_solver_ext?: number;
    /**
     * The number of milliseconds the CPU was used to store the results of the request in the cache.
     */
    cpu_time_cache_outputs?: number;
    /**
     * The number of milliseconds it took to prepare the model after loading it. As an example, preparation includes compilation of scripts.
     */
    time_model_prepare?: number;
    /**
     * The number of milliseconds the CPU was used to prepare the model after loading it. As an example, preparation includes compilation of scripts.
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
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     */
    isCompilationDone: boolean;
    /**
     * 
     */
    ar: ResArCreditMetric;
    /**
     * 
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     */
    _default: ResDefaultCreditMetric;
    /**
     * Requested model ID.
     */
    modelId: string;
    /**
     * This property is never set.
     * @deprecated
     */
    userId?: boolean | null;
    /**
     * This property is never set.
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
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     */
    model: Array<ResModel>;
    /**
     * A directory of Model-States.
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
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
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     */
    isCompilationDone: boolean;
    /**
     * 
     */
    ar: ResArCreditMetric;
    /**
     * 
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     */
    _default: ResDefaultCreditMetric;
    /**
     * Requested model ID.
     */
    modelId: string;
    /**
     * Requested organization ID.
     */
    orgId: string;
}
/**
 * 
 * @export
 * @interface ResModelSession
 */
export interface ResModelSession {
    /**
     * ID of the session. The value may be redacted.
     */
    id: string;
    /**
     * 
     */
    status: SessionAnalyticsStatus;
    /**
     * A ISO-8601 date-time, in numeric format.
     * 
     * Format: YYYYMMDDhhmmsszzz
     */
    openedAt: string;
    /**
     * A ISO-8601 date-time, in numeric format.
     * 
     * Format: YYYYMMDDhhmmsszzz
     */
    closedAt: string | null;
    /**
     * 
     */
    statistics?: ResModelSessionStatistics;
    /**
     * 
     */
    chargeUserId?: string;
    /**
     * 
     */
    chargeOrgId?: string;
    /**
     * 
     */
    request?: ResModelSessionRequest;
}


/**
 * 
 * @export
 * @interface ResModelSessionRequest
 */
export interface ResModelSessionRequest {
    /**
     * A subset of the request headers the client sent when opening the session.
     */
    headers: { [key: string]: string; };
    /**
     * Anonymized client IP address.
     */
    ip: string;
}
/**
 * 
 * @export
 * @interface ResModelSessionStatistics
 */
export interface ResModelSessionStatistics {
    /**
     * Number of billing windows started during the session (timeslot pricing).
     */
    billableCount: number;
    /**
     * Total duration of the session in milliseconds.
     */
    duration: number;
    /**
     * Number of successful export requests that did not also request outputs.
     */
    exportsCount: number;
    /**
     * Number of successful customization requests.
     */
    interactionsCount: number;
    /**
     * Number of successful export requests that also requested outputs.
     */
    combinedCount: number;
}
/**
 * 
 * @export
 * @interface ResModelSettings
 */
export interface ResModelSettings {
    /**
     * Allows the usage of the CDN for fast content distribution.
     */
    use_cdn?: boolean;
    /**
     * Indicates if the model supports CDN-based asset URLs.
     */
    cdn_supported?: boolean;
    /**
     * 
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
     */
    parameters: { [key: string]: ResParameterValue; };
    /**
     * Optional untyped data that holds additional information.
     */
    data?: { [key: string]: any; };
    /**
     * ID of the Model-State.
     */
    id: string;
    /**
     * ID of the ShapeDiver model.
     */
    modelId: string;
    /**
     * Timestamp of creation of the Model-State.
     */
    createdate: string;
    /**
     * The URL of the Model-State image.
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
     */
    file?: { [key: string]: ResAssetDefinition; };
    /**
     * 
     */
    sdtf?: Array<ResAssetDefinition>;
    /**
     * The asset-definition of a Model-State image.
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
     */
    parameters: { [key: string]: ResParameterValue; };
    /**
     * Optional untyped data that holds additional information.
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
     */
    id: string;
    /**
     * A directory of parameter IDs and values.
     */
    parameters: { [key: string]: ResParameterValue; };
    /**
     * Indicates whether the Model-State includes an image.
     */
    hasImage: boolean;
    /**
     * Indicates whether the Model-State includes a glTF asset.
     */
    hasGltf: boolean;
    /**
     * Indicates whether the Model-State includes a USDZ asset.
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
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     */
    modelState: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
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
    DELETED: 'deleted',
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
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     */
    isCompilationDone: boolean;
    /**
     * 
     */
    ar: ResArCreditMetric;
    /**
     * 
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     */
    _default: ResDefaultCreditMetric;
    /**
     * Requested model ID.
     */
    modelId: string;
    /**
     * Requested user ID.
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
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     */
    isCompilationDone: boolean;
    /**
     * 
     */
    ar: ResArCreditMetric;
    /**
     * 
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     */
    _default: ResDefaultCreditMetric;
    /**
     * This property is never set.
     * @deprecated
     */
    modelId?: boolean | null;
    /**
     * Requested organization ID.
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
     */
    id: string;
    /**
     * Constant ID of the output, not dependent on model ID, and therefore NOT changing each time a model gets uploaded. Might be undefined because this property was introduced in summer 2020 and does not exist for outputs of older models.
     */
    uid?: string;
    /**
     * Name of the output.
     */
    name: string;
    /**
     * Optional ID of the output holding material information for this output.
     */
    material?: string;
    /**
     * Information about which chunks exist in the asset/sdTF.
     */
    chunks?: Array<ResOutputChunk>;
    /**
     * List of IDs of parameters influencing this output.
     */
    dependency: Array<string>;
    /**
     * Group information of an output definition.
     */
    group?: CommonsGroup;
    /**
     * Ordering of the output in client applications.
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     */
    tooltip?: string;
    /**
     * Parameter name to display instead of `name`.
     */
    displayname?: string;
    /**
     * Controls whether the parameter should be hidden in the UI.
     */
    hidden: boolean;
    /**
     * Type-specific ID of the output. In case of outputs defined by a single component, this corresponds to the component’s uuid.
     */
    typeId?: string;
    /**
     * Type-specific name of the output. In case of outputs defined by a single component, this corresponds to the component’s name (NOT its nickname).
     */
    typeName?: string;
    /**
     * A unique identifier for the particular version of the output. This is a hash code which is based on the parameter values that were used to compute the resulting data. The hash code only depends on the values of the parameters which may theoretically influence the results of the output. As an example, parameters which are in no way connected to the output component in Grasshopper are not considered.
     */
    version: string;
    /**
     * The delay in milliseconds after which a cache request shall be sent to check again
     * for this output version. This property is used ONLY if the output version has not
     * been computed yet.
     * 
     * Note that the existence of this property does not necessarily imply the presence of
     * an active or queued computation for the respective output version.
     */
    delay?: number;
    /**
     * Result parts. In case this array does not exist, this means that the workers have not finished computation for this output version.
     */
    content?: Array<ResOutputContent>;
    /**
     * Optional bounding box, minimum corner.
     */
    bbmin?: Array<number>;
    /**
     * Optional bounding box, maximum corner.
     */
    bbmax?: Array<number>;
    /**
     * In case computation of the export version (temporarily) failed. Contains a message explaining what went wrong.
     */
    msg?: string;
    /**
     * Status of the computation which resulted in the output version.
     */
    status_computation?: ResComputationStatus;
    /**
     * Status of collecting results for the output version.
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
     */
    id: string;
    /**
     * Name of the chunk.
     */
    name: string;
    /**
     * Indicates what type of data the data item holds.
     */
    typeHint: string;
    /**
     * Description that is shown as a tooltip in the clients.
     */
    tooltip?: string;
    /**
     * Custom name to display instead of `name`. Empty string if not set.
     */
    displayname: string;
    /**
     * Controls whether the chunk should be hidden in the UI.
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
     */
    href?: string;
    /**
     * Size in bytes for parts of type `asset`.
     */
    size?: number;
    /**
     * Optionally used for type `data`.
     */
    name?: string;
    /**
     * Transformations to be applied in case of type `external` or `asset`.
     */
    transformations?: Array<Array<number>>;
    /**
     * Format of part, used by all types of parts.
     * * File ending for parts of type `asset`.
     * * `material` (data contains a material definition).
     * * `data` (data contains arbitrary data).
     * * `external` (href or storage information that refer to an external asset).
     */
    format: string;
    /**
     * This was used by legacy `transform_content_array` in case of an error in getting texture URLs.
     */
    msg?: string;
    /**
     * Used for types `material` and `data`.
     */
    data?: any | null;
    /**
     * Optional Content-Type for parts of type `asset`.
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
     */
    id: string;
    /**
     * Constant ID of the output, not dependent on model ID, and therefore NOT changing each time a model gets uploaded. Might be undefined because this property was introduced in summer 2020 and does not exist for outputs of older models.
     */
    uid?: string;
    /**
     * Name of the output.
     */
    name: string;
    /**
     * Optional ID of the output holding material information for this output.
     */
    material?: string;
    /**
     * Information about which chunks exist in the asset/sdTF.
     */
    chunks?: Array<ResOutputChunk>;
    /**
     * List of IDs of parameters influencing this output.
     */
    dependency: Array<string>;
    /**
     * Group information of an output definition.
     */
    group?: CommonsGroup;
    /**
     * Ordering of the output in client applications.
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     */
    tooltip?: string;
    /**
     * Parameter name to display instead of `name`.
     */
    displayname?: string;
    /**
     * Controls whether the parameter should be hidden in the UI.
     */
    hidden: boolean;
    /**
     * Type-specific ID of the output. In case of outputs defined by a single component, this corresponds to the component’s uuid.
     */
    typeId?: string;
    /**
     * Type-specific name of the output. In case of outputs defined by a single component, this corresponds to the component’s name (NOT its nickname).
     */
    typeName?: string;
    /**
     * This property is never set.
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
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     */
    output: Array<ResOutput>;
    /**
     * A directory of export versions.
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
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
     */
    limit: number;
    /**
     * The offset that can be used in the next request to query the remaining items. This property is missing when all items have been processed.
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
     */
    id: string;
    /**
     * Choice of parameter values for types `STRINGLIST`.
     */
    choices?: Array<string>;
    /**
     * Number of decimal places for numeric types.
     */
    decimalplaces?: number;
    /**
     * Default value of parameter, stringified.
     */
    defval?: string;
    /**
     * Optional expression to be applied to value for visualisation.
     */
    expression?: string;
    /**
     * List of file formats (content types) supported, used for type `FILE`.
     */
    format?: Array<string>;
    /**
     * Minimum value (stringified) for numeric types.
     */
    min?: number;
    /**
     * Maximum:
     * * value (stringified) for numeric types.
     * * string length for type `STRING`.
     * * file size allowed (stringified) for type FILE.
     */
    max?: number;
    /**
     * Minimum `u` value for two dimensional domain parameters.
     */
    umin?: number;
    /**
     * Maximum `u` value for two dimensional domain parameters.
     */
    umax?: number;
    /**
     * Minimum `v` value for two dimensional domain parameters.
     */
    vmin?: number;
    /**
     * Maximum `v` value for two dimensional domain parameters.
     */
    vmax?: number;
    /**
     * Step size used for domain parameters.
     */
    interval?: number;
    /**
     * Name of the parameter.
     */
    name: string;
    /**
     * Type of parameter.
     */
    type: ResParameterType;
    /**
     * Optional preferred visualization for parameters of type `FILE` and `STRINGLIST`.
     */
    visualization?: ResVisualizationType;
    /**
     * Structure of a parameter.
     */
    structure?: ResStructureType;
    /**
     * Group information of a parameter.
     */
    group?: CommonsGroup;
    /**
     * Technical hint for the UI implementation.
     */
    hint?: string;
    /**
     * Ordering of the parameter in client applications.
     */
    order?: number;
    /**
     * Description that is shown as a tooltip in the clients.
     */
    tooltip?: string;
    /**
     * Parameter name to display instead of `name`.
     */
    displayname?: string;
    /**
     * Controls whether the parameter should be hidden in the UI.
     */
    hidden: boolean;
    /**
     * Holds parameter-type specific information.
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
    UNKNOWN: 'unknown',
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
     */
    computations?: Array<ResModelComputation>;
}
/**
 * 
 * @export
 * @interface ResPartModelSessions
 */
export interface ResPartModelSessions {
    /**
     * Analytics for model sessions.
     */
    sessions?: Array<ResModelSession>;
}
/**
 * 
 * @export
 * @interface ResPartModelState
 */
export interface ResPartModelState {
    /**
     * Model-State information.
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
     */
    id: string;
    /**
     * Library version.
     */
    version: string;
    /**
     * Library name.
     */
    name: string;
    /**
     * Library author.
     */
    author: string;
    /**
     * Assembly name (not present in Rhino 5).
     */
    assemblyFullName?: string;
    /**
     * Assembly version (not present in Rhino 5).
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
     */
    count: number;
    /**
     * Number of finished 10-second chunks charged.
     */
    credits: number;
    /**
     * Total duration of computation time, in milliseconds.
     */
    duration: number;
    /**
     * Count of computations per computation time expressed in started 10-second chunks.
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
     */
    count: number;
    /**
     * Number of started 10-minute periods of sessions charged.
     */
    credits: number;
    /**
     * The total duration of all sessions, in milliseconds.
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
     */
    minions?: ResMinionInfo;
    /**
     * System information about the Geometry Workers.
     */
    workers?: ResWorkerInfo;
    /**
     * Scale-in candidate information for worker instances.
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
     */
    file?: { [key: string]: ResAssetDefinition; };
    /**
     * 
     */
    sdtf: Array<ResAssetDefinition>;
    /**
     * The asset-definition of a Model-State image.
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
     */
    id: string;
    /**
     * The namespace of the sdTF.
     */
    namespace: string;
    /**
     * The size of the sdTF in bytes.
     */
    size: number;
    /**
     * Timestamp of the last modification of the sdTF.
     */
    lastModified?: string;
}
/**
 * 
 * @export
 * @interface ResSdtfList
 */
export interface ResSdtfList {
    /**
     * A directory of file objects.
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     */
    sdtf: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
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
     */
    auth?: ResAuthorizationSettings;
    /**
     * 
     */
    compute?: ResComputeSettings;
    /**
     * 
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
     */
    comptime?: number;
    /**
     * Timestamp of last session created for the model.
     */
    lastsession?: string;
    /**
     * Timestamp of last view of the model.
     */
    lastview?: string;
    /**
     * Approximate memory usage of model on workers, in bytes.
     */
    memUsage?: number;
    /**
     * Number of computations which have been carried out for the model by the workers so far.
     */
    numcomp?: number;
    /**
     * Number of sessions which have been opened for the model so far.
     */
    numsessions?: number;
    /**
     * Cumulative time (msec) which has been spent for processing computation requests by the workers (computation time plus overheads).
     */
    requesttime?: number;
    /**
     * File size of the model file in bytes.
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
    TREE: 'tree',
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
     */
    value?: string;
    /**
     * 
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
     */
    minions?: ResMinionInfo;
    /**
     * System information about the Geometry Workers.
     */
    workers?: ResWorkerInfo;
    /**
     * Scale-in candidate information for worker instances.
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
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     */
    isCompilationDone: boolean;
    /**
     * 
     */
    ar: ResArCreditMetric;
    /**
     * 
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     */
    _default: ResDefaultCreditMetric;
    /**
     * Requested system.
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
     */
    name: string;
    /**
     * Title of the template, e.g. 'Template for model customization request'.
     */
    title: string;
    /**
     * Template for the request body.
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
     */
    modelId: string;
    /**
     * The texture ID.
     */
    textureId: string;
    /**
     * The original URL of the texture asset.
     */
    url?: string;
    /**
     * The width of the texture.
     */
    width?: number;
    /**
     * The height of the texture.
     */
    height?: number;
    /**
     * Is `true` when the texture has been cached, otherwise `false`.
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
     */
    file?: Array<ResFileInfo>;
    /**
     * A directory of sdTF objects.
     */
    sdtf?: Array<ResSdtfInfo>;
    /**
     * A directory of ShapeDiver models.
     */
    model?: Array<ResModel>;
    /**
     * A directory of Model-States.
     */
    modelState?: Array<ResModelStateInfo>;
    /**
     * A directory of output versions.
     */
    output?: Array<ResOutput>;
    /**
     * A directory of export versions.
     */
    export?: Array<ResExport>;
    /**
     * A directory of model textures.
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
     */
    accessdomains: Array<string>;
    /**
     * Should this ticket provide access to model authoring (allows to change configuration)?
     */
    author: boolean;
    /**
     * Should this ticket allow public access (ignore the model's `accessdomains` property)?
     */
    pub: boolean;
    /**
     * The timestamp until which the ticket should be valid.
     */
    until: string;
    /**
     * Does this ticket identify the model via its secondary ID (model property `id2`)?
     */
    use_id2: boolean;
    /**
     * 
     */
    type: ResTicketType;
    /**
     * Either the model's `id` or `id2` property, depending on the ticket property `use_id2`.
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
     */
    accessdomains: Array<string>;
    /**
     * Should backend access to the model be allowed.
     */
    backendaccess: boolean;
    /**
     * If this model allows public access (ignore `model.accessdomains`)?
     */
    pub: boolean;
}

/**
 * The type of the ticket.
 * @export
 */
export const ResTicketType = {
    BACKEND: 'backend',
    NONE: '',
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
     */
    auth_groups?: Array<string>;
    /**
     * Enforces iframe embedding instead of direct embedding.
     */
    require_iframe?: boolean;
    /**
     * Enforces token-based authentication for this model.
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
     */
    file: ResFile;
    /**
     * Contains urgent information about the system.
     */
    message?: string;
    /**
     * The definitions of a ShapeDiver model.
     */
    model: ResModel;
    /**
     * Various settings.
     */
    setting: ResSettings;
    /**
     * Statistics of a model.
     */
    statistic: ResStatistic;
    /**
     * Version of the Geometry Backend API.
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
     */
    message?: string;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * 
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
     */
    gltf: ResGltfUpload;
    /**
     * Version of the Geometry Backend API.
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
     */
    message?: string;
    /**
     * Version of the Geometry Backend API.
     */
    version: string;
    /**
     * 
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
     */
    timestamp: string;
    /**
     * Aggregation for this timestamp has finished.
     */
    isCompilationDone: boolean;
    /**
     * 
     */
    ar: ResArCreditMetric;
    /**
     * 
     */
    loading: ResLoadingCreditMetric;
    /**
     * 
     */
    limited: ResLimitedCreditMetric;
    /**
     * 
     */
    _default: ResDefaultCreditMetric;
    /**
     * This property is never set.
     * @deprecated
     */
    modelId?: boolean | null;
    /**
     * Requested user ID.
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
    TOGGLE: 'toggle',
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
     */
    component?: string;
    /**
     * Instance ID of component.
     */
    instance: string;
    /**
     * Name of component.
     */
    name: string;
    /**
     * Nickname of component.
     */
    nick_name: string;
    /**
     * Component Warnings descriptions.
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
     */
    grasshopperVersion: string;
    /**
     * Holds information of all installed and allowed Grasshopper plugins.
     */
    plugins: ResWorkerPlugins;
    /**
     * Version of the Rhino application.
     */
    rhinoVersion: string;
    /**
     * Version of the ShapeDiver worker plugin.
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
     */
    id: string;
    /**
     * Name of the plugin component.
     */
    name: string;
    /**
     * Indicates whether the component is a script component.
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
     */
    installed: Array<ResInstalledWorkerPlugin>;
    /**
     * Contains the model checking configuration for the Grasshopper plugins.
     */
    allowed: Array<ResAllowedWorkerPlugin>;
    /**
     * Contains information about plugin inconsistencies.
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
     */
    success: boolean;
    /**
     * EC2 instance ID of the recommended scale-in candidate.
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
     */
    minions?: ResMinionInfo;
    /**
     * System information about the Geometry Workers.
     */
    workers: ResWorkerInfo;
    /**
     * Scale-in candidate information for worker instances.
     */
    scaleInCandidate?: ResWorkerScaleInCandidate;
}

/**
 * 
 * @export
 */
export const SessionAnalyticsStatus = {
    OPEN: 'open',
    PENDING: 'pending',
    FINALIZED: 'finalized',
} as const;
export type SessionAnalyticsStatus = typeof SessionAnalyticsStatus[keyof typeof SessionAnalyticsStatus];

