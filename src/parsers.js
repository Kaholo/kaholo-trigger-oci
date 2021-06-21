module.exports = {
    string: (value)=>{
        if (!value) return undefined;
        if (typeof(value) === "string") return value.trim();
        throw `Value ${value} is not a valid string`;
    },
    severity: (value)=>{
        if (typeof(value) === "number") return value;
        if (!value) return undefined;
        if (typeof(value) === "string") {
            switch(value.toLowerCase()){
                case "info":
                    return 1;
                case "warning":
                    return 2;
                case "error":
                    return 3;
                case "critical":
                    return 4;
            }
        }
        throw "unsupported severity format";
    }
}