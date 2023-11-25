class User {
    #name
    #email
    #password
    #id
    constructor(name, email, password) {
        this.#name = name
        this.#email = email
        this.#password = password
    }
    get name() {
        return this.#name
    }
    get email() {
        return this.#email
    }
    get password() {
        return this.#password
    }
    get id() {
        return this.#id
    }
    set id(id) {
        this.#id = id
    }
    set name(name) {
        this.#name = name
    }
    set email(email) {
        this.#email = email
    }
    set password(password) {
        this.#password = password
    }
    toString() {
        return `User: ${this.#name}, Email: ${this.#email}, Password: ${
            this.#password
        }`
    }
}
// const user = new User('John', '@212', 'parola')
// console.log(user.toString())
module.exports = User
