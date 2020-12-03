// NOTE this should be replaces with a shared repository

/** supported file types for models */
export enum ShapeDiverModelFiletype {
    UNKNOWN = "unknown",
    GRASSHOPPER_BINARY = "gh",
    GRASSHOPPER_XML = "ghx"
}

/** level of trust granted for a model */
export enum ShapeDiverModelTrustlevel {
    UNDEFINED = "",
    NONE = "none",
    FULL = "full"
}

/** Body of a template request */
export interface ShapeDiverModelRequest {

    /** list of allowed domains for embedding */
    accessdomains?: string[],

    /** list of allowed auth-groups */
    auth_groups?: string[],

    /** should backend access to the model be allowed */
    backendaccess?: boolean,

    /** file type of the model */
    ftype: ShapeDiverModelFiletype,

    /** maximum number of milliseconds allowed for computations of this model */
    max_comp_time?: number,

    /** maximum number of bytes allowed to be exported from a model for a specific set of parameter values */
    max_export_size?: number,

    /** maximum number of bytes allowed to be output from a model for a specific set of parameter values */
    max_output_size?: number,

    /** name of the model */
    name?: string,

    /** minimum number of workers which should have the model loaded once a session to the model gets opened */
    num_loaded_min?: number,

    /** should public access (ignore accessdomains) */
    pub: boolean,

    /** can this model be trusted */
    trust?: ShapeDiverModelTrustlevel
}

/**
 * Type of ticket to a ShapeDiver model
 */
export enum ShapeDiverTicketType {
    BACKEND = "backend",
    NONE = ""
}

/** Body of a ticket request */
export interface ShapeDiverTicketRequest {

    /** which type should the ticket */
    type: ShapeDiverTicketType

    /** timestamp until which the ticket should be valid, must be 14 characters long, format YYYYMMDDhhmmss */
    until: string

    /** list of domains (origins) this ticket should be limited to, may be empty */
    accessdomains?: string[]

    /** Should this ticket allow public access (ignore accessdomains)? */
    pub: boolean

    /** Should this ticket provide access to model authoring (change configuration)? */
    author?: boolean

}
