const apiResponse = {
    success: (res, data, message = "Request was successful") => {
        return res.status(200).json({
            status: "success",
            message: message,
            data: data
        });
    },

    created: (res, data, message = "Resource created successfully") => {
        return res.status(201).json({
            status: "success",
            message: message,
            data: data
        });
    },

    notFound: (res, message = "Resource not found") => {
        return res.status(404).json({
            status: "error",
            message: message
        });
    },

    badRequest: (res, message = "Bad request") => {
        return res.status(400).json({
            status: "error",
            message: message
        });
    },

    unauthorized: (res, message = "Unauthorized access") => {
        return res.status(401).json({
            status: "error",
            message: message
        });
    },

    serverError: (res, message = "Internal server error") => {
        return res.status(500).json({
            status: "error",
            message: message
        });
    }
};

module.exports = apiResponse;