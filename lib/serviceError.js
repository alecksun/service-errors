class ServiceError extends Error {
    constructor (catagory, code, message, innerError) {
        super(message);
        this._catagory = catagory;
        this._code = code;
        this._innerError = innerError;
        this.name = this.constructor.name;
    }

    get catagory() {
        return this._catagory;
    }

    get code() {
        return this._code;
    }

    get innerError() {
        return this._innerError;
    }

    toString() {
        let str = `${this.stack}\n` +
                  `catagory: ${this.catagory}\n` +
                  `code: ${this.code}\n`;
        if (this.innerError) {
            str += '--------------------------\n';
            if (this.innerError instanceof ServiceError)
                str += `Caused by ${this.innerError.toString()}`;
            else if (this.innerError instanceof Error)
                str += `Caused by ${this.innerError.stack}\n`;
            else
                str += `Caused by ${JSON.stringify(this.innerError)}\n`;
        }
        return str;
    }

    get headers() {
        return {};
    }
}

ServiceError.dumpError = err => {
    if (err instanceof ServiceError) {
        return err.toString();
    } else if (err instanceof Error) {
        return err.stack;
    } else {
        return err;
    }
}

module.exports = ServiceError;
