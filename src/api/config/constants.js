export class Constants {
    static ERROR_CODES = {
        UNAUTHORIZED_CODE: 401, // for token expire
        NOT_FOUND_CODE: 404, // data not found
        SUCCESS_CODE: 200, // every success request
        FAIL_CODE: 400, // every failed request
        USER_EXISTS: 409,
        REQUIRE_PARAMETER: 422,
        CREATE_SUCCESS_CODE: 201,
    };
    static ERROR_MESSAGES = {
        USER_ID_NOT_FOUND: "Not Found - User id was not found",
        DATA_NOT_FOUND: "Not Found - Data",
        AUTHORIZATION_REQUIRED: "Authorization required",
        AUTHORIZATION_TOKEN_EXPIRED: "Authorization token expired",
        PERMISSION_ACCESS_CLIENT: "Permission is only granted to client, agent, admin, reseller, teamlead, voicelogger, campaignsupervisor, operator role",
        AUTHORIZATION_TOKEN_INVALID_WITH_USERID: "Authorization token not associated with this User Id",
        AUTHORIZATION_TOKEN_INVALID: "Authentication token invalid",
    };
    static SUCCESS_MESSAGE = {
        OK: "Ok",
        CREATED: "Created",
    };
    static BREAK_STATUE = {
        IN: 4,
        OUT: 1,
    };

    static LUNGUAGE_SORT = {
        EN: "en",
    };

    static FIELDS = {
        PAGE_NO: "page-no",
        PAGE_SIZE: "page-search-limit",
    };

    static VALIDATON_ERROR_MESSAGES = {
        NOT_VALID: "is not valid.",
        REQUIRED: "is require.",
    };

    static URLS = {
        APP_URL: "http://localhost:3000",
        GUI_URL: "/sme?sme_id=",
    };

    static ERROR_TYPES = {
        MISSING_REQUEST_PARAMETER: "MissingRequiredParameterError",
        ASSET_ID_AND_MESUREMENT_ITEM_SET_ID_EXIST: "AssetIdandItemsetIdAlreadyExistError",
        FIELD_NOT_VALID: "FieldValidationError",
        DATA_NOT_FOUND: "DataNotFoundError",
        USER_ID_EXIST: "UserIdAlreadyExistError",
    };

    static TABLES = {
        GUIDE_COUNTRY: "guide_countrys",
        GUIDE_RATING: "guide_ratings",
        GUIDE_LIKE: "guide_likes",
        GUIDE_COMMENT: "guide_comments",
        ORIGINAL_LIKE: "original_likes",
        ORIGINAL_COMMENT: "original_comments",
        TAGS: "tags",
        GUIDE_CITY: "guid_cities",
        GUIDE: "guide",
        GUIDE_CATEGORIES: "guide_categories",
        INTERESTS: "interests",
        ORIGINALS: "originals",
        ORIGINALS_SEASON: "original_seasons",
        ORIGINALS_SEASON_EPISODS: "original_season_episodes",
        ORIGINALS_COMMENT_REPORT_SPAM: "original_comment_report_spams",
        SOCIAL: "socials",
        SOCIAL_LIKE: "social_likes",
        SOCIAL_COMMENT: "social_comments",
    };
}
