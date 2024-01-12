
export class Command {
    constructor(name, descr, args = [], options = [], defaults = {}) {
        this.command = name
        this.help = descr
        this.arguments = args 
        this.options = options
        this.result = ""
        this.defaults = defaults
    }

    getResult() {
        return this.result
    }

    definition() {
        return {
            command: this.command,
            help: this.help,
            arguments: this.arguments,
            options: this.options,
            defaults: this.defaults
        }
    }

    action() {
        throw Error("This method needs to be implemented by each specific command")
    }
}
